import { NextResponse } from 'next/server'
import { generateSasUrl } from '../../../../lib/azure-storage'

export async function GET(
  request: Request,
  { params }: { params: { fileName: string } }
) {
  try {
    const sasUrl = await generateSasUrl(params.fileName)
    return NextResponse.json({ url: sasUrl })
  } catch (error) {
    console.error('Error generating video URL:', error)
    return NextResponse.json({ error: 'Failed to generate video URL' }, { status: 500 })
  }
}