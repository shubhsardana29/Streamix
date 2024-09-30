'use client'

import { useState, useEffect } from 'react'
import { CardSpotlight } from './ui/card-spotlight'

export default function VideoPlayer({ fileName, shareableId }: { fileName: string, shareableId: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function getVideoUrl() {
      const response = await fetch(`/api/video-url/${fileName}`)
      const data = await response.json()
      setVideoUrl(data.url)
    }
    getVideoUrl()
  }, [fileName])

  const handlePlay = async () => {
    try {
      await fetch(`/api/video-view/${shareableId}`, { method: 'POST' })
    } catch (error) {
      console.error('Error recording view:', error)
    }
  }

  if (!videoUrl) {
    return <div>Loading video...</div>
  }

  return (
    <CardSpotlight className="w-full">
      <video controls width="100%" onPlay={handlePlay} className="rounded-lg shadow-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </CardSpotlight>
  )
}
