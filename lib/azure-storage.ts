import { BlobServiceClient } from '@azure/storage-blob'
import { QueueServiceClient } from '@azure/storage-queue'
import { BlobSASPermissions } from '@azure/storage-blob'

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
const containerName = 'videos'
const queueName = 'video-uploads'

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
const containerClient = blobServiceClient.getContainerClient(containerName)
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString)
const queueClient = queueServiceClient.getQueueClient(queueName)

export async function uploadVideoToBlob(file: File): Promise<string> {
  const blobName = `${Date.now()}-${file.name}`
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  await blockBlobClient.uploadData(await file.arrayBuffer())
  return blobName
}

export async function queueVideoUpload(videoDetails: {
  blobName: string,
  originalName: string,
  shareableId: string,
  isPermanent: boolean
}) {
  await queueClient.sendMessage(Buffer.from(JSON.stringify(videoDetails)).toString('base64'))
}

export async function generateSasUrl(blobName: string): Promise<string> {
  const blobClient = containerClient.getBlobClient(blobName)
  const sasToken = await blobClient.generateSasUrl({
    permissions: new BlobSASPermissions(), // Updated to use BlobSASPermissions
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000),
  })
  return sasToken
}

export async function deleteBlob(blobName: string) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  await blockBlobClient.delete()
}