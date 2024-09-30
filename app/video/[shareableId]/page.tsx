import { getVideoByShareableId } from "../../../lib/database"
import VideoPlayer from '../../../components/VideoPlayer'
import { BackgroundGradient } from "../../../components/ui/background-gradient"

export default async function VideoPage({ params }: { params: { shareableId: string } }) {
  const video = await getVideoByShareableId(params.shareableId)

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackgroundGradient className="p-4 rounded-lg">
          <p>Video not found or has expired</p>
        </BackgroundGradient>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundGradient className="p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Anonymous Video</h1>
        <VideoPlayer fileName={video.fileName} shareableId={video.shareableId} />
        {video.expiresAt ? (
          <p className="mt-4 text-sm text-gray-600">
            This video will expire on: {video.expiresAt.toLocaleString()}
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-600">
            This is a permanent video and will not expire.
          </p>
        )}
      </BackgroundGradient>
    </div>
  )
}