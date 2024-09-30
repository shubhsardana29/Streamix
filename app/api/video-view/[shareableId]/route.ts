import { NextResponse } from 'next/server'
import { incrementViewCount } from '../../../../lib/database'

export async function POST(
  request: Request,
  { params }: { params: { shareableId: string } }
) {
  try {
    const video = await incrementViewCount(params.shareableId)
    return NextResponse.json({ success: true, viewCount: video.viewCount })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 })
  }
}