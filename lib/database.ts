import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createVideo(fileName: string, originalName: string, permanent: boolean) {
  const expiresAt = permanent ? null : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
  const video = await prisma.video.create({
    data: {
      fileName,
      originalName,
      shareableId: generateShareableId(),
      expiresAt,
      processed: false,
    },
  })
  return video
}

export async function getVideoByShareableId(shareableId: string) {
  const video = await prisma.video.findUnique({
    where: {
      shareableId,
    },
  })
  
  if (video && video.expiresAt && video.expiresAt < new Date()) {
    return null // Video has expired
  }
  
  return video
}

export async function updateVideoMetadata(shareableId: string, data: { processed?: boolean }) {
  return prisma.video.update({
    where: { shareableId },
    data,
  })
}

export async function incrementViewCount(shareableId: string) {
  const video = await prisma.video.update({
    where: {
      shareableId,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  })
  return video
}

export async function deleteExpiredVideos() {
  const expiredVideos = await prisma.video.findMany({
    where: {
      expiresAt: {
        lt: new Date(),
        not: null,
      },
    },
  })

  for (const video of expiredVideos) {
    await prisma.video.delete({
      where: {
        id: video.id,
      },
    })
  }

  return expiredVideos
}

function generateShareableId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}