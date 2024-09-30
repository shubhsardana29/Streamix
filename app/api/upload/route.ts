import { NextResponse } from 'next/server';
import { uploadVideoToBlob, queueVideoUpload } from '../../../lib/azure-storage';
import { createVideo } from '../../../lib/database';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const permanent = formData.get('permanent') === 'true';

  // Validate file
  if (!(file && typeof file === 'object' && file instanceof Blob)) {
    return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
  }

  // Set the max file size to 50 MB
  const maxFileSize = 50 * 1024 * 1024; // 50 MB limit
  const allowedMimeTypes = ['video/mp4', 'video/x-msvideo', 'video/x-matroska']; // Adjust as needed

  if (file.size > maxFileSize) {
    return NextResponse.json({ error: 'File is too large. Maximum allowed size is 50 MB.' }, { status: 400 });
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed types are: MP4, AVI, MKV.' }, { status: 400 });
  }

  try {
    console.log('Uploading file:', file.name, 'Permanent:', permanent);

    const blobName = await uploadVideoToBlob(file);
    const video = await createVideo(blobName, file.name, permanent);

    // Queue the video upload details
    await queueVideoUpload({
      blobName: blobName,
      originalName: file.name,
      shareableId: video.shareableId,
      isPermanent: permanent
    });

    return NextResponse.json({ 
      success: true, 
      shareableLink: `${process.env.NEXT_PUBLIC_BASE_URL}/video/${video.shareableId}`,
      expiresAt: video.expiresAt 
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
