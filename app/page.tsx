import VideoUploader from '../components/VideoUploader'
import { BackgroundGradient } from '../components/ui/background-gradient'

export default function Home() {
  return (
    <main className="max-w-full mx-auto px-4 py-8 md:py-16">
      <BackgroundGradient className="rounded-[22px] max-w-xl mx-auto p-4 sm:p-10 bg-white bg-opacity-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Anonymous Video Hosting</h2>
        <p className="mb-6 text-center">
          Upload your video and get a shareable link. Choose between a temporary (10 days) or permanent link.
        </p>
        <VideoUploader />
      </BackgroundGradient>
      {/* <div className="mt-12 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">How It Works</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select your video file</li>
          <li>Choose between temporary (10 days) or permanent storage</li>
          <li>Upload your video</li>
          <li>Get a unique, shareable link</li>
          <li>Share your video anonymously!</li>
        </ol>
      </div> */}
    </main>
  )
}
