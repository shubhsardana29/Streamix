'use client'

import { useState } from 'react'
import { BackgroundBeams } from './ui/background-beams'
import { HoverEffect, Card, CardTitle, CardDescription } from './ui/card-hover-effect'

export default function VideoUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [shareableLink, setShareableLink] = useState<string | null>(null)
    const [expirationDate, setExpirationDate] = useState<Date | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setError(null)
        }
    }

    const handleUpload = async (permanent: boolean) => {
        if (!file) {
            setError("Please select a file to upload.")
            return
        }
        setUploading(true)
        setError(null)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('permanent', permanent.toString())
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            if (response.ok) {
                setShareableLink(data.shareableLink)
                setExpirationDate(data.expiresAt ? new Date(data.expiresAt) : null)
            } else {
                throw new Error(data.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            setError("Upload failed. Please try again.")
        } finally {
            setUploading(false)
        }
    }

    const uploaderContent = [{
        title: "Upload Your Video",
        description: "Choose a video file and select whether you want a temporary or permanent link.",
    }];

    return (
        <div className="w-full">
            <BackgroundBeams />
            <HoverEffect items={uploaderContent} className="grid-cols-1">
                <Card className="w-full p-6">
                    <CardTitle>{uploaderContent[0].title}</CardTitle>
                    <CardDescription>{uploaderContent[0].description}</CardDescription>
                    <div className="space-y-4 mt-6">
                        <label htmlFor="video-file" className="block text-zinc-400">
                            Select video file
                        </label>
                        <input
                            id="video-file"
                            type="file"
                            onChange={handleFileChange}
                            accept="video/*"
                            className="w-full p-2 border border-zinc-700 rounded bg-black bg-opacity-50 text-white"
                        />
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                            <button
                                onClick={() => handleUpload(false)}
                                disabled={!file || uploading}
                                className="w-full sm:w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Upload Temporary (10 days)'}
                            </button>
                            <button
                                onClick={() => handleUpload(true)}
                                disabled={!file || uploading}
                                className="w-full sm:w-1/2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Upload Permanent'}
                            </button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        {shareableLink && (
                            <div className="mt-4">
                                <p className="text-zinc-400 mb-2">
                                    Your video has been uploaded. Here`s your shareable link:
                                </p>
                                <input
                                    value={shareableLink}
                                    readOnly
                                    onClick={(e) => e.currentTarget.select()}
                                    className="w-full p-2 border border-zinc-700 rounded bg-black bg-opacity-50 text-white mb-2"
                                />
                                <p className="text-sm text-zinc-500">
                                    {expirationDate
                                        ? `This link will expire on: ${expirationDate.toLocaleString()}`
                                        : "This is a permanent link and will not expire."}
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            </HoverEffect>
        </div>
    );
}
