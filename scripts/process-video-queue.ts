import { QueueServiceClient } from '@azure/storage-queue'
import { updateVideoMetadata } from '../lib/database'

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
const queueName = 'video-uploads'

const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString)
const queueClient = queueServiceClient.getQueueClient(queueName)

async function processVideoQueue() {
  while (true) {
    const messages = await queueClient.receiveMessages();
    
    if (messages.receivedMessageItems.length === 0) {
      console.log('No more messages in queue. Exiting.');
      break;
    }

    for (const message of messages.receivedMessageItems) {
      try {
        const videoDetails = JSON.parse(Buffer.from(message.messageText, 'base64').toString());
        
        // Here you would typically do any additional processing
        // For now, we'll just update the video metadata to mark it as processed
        await updateVideoMetadata(videoDetails.shareableId, { processed: true });

        // Delete the message from the queue after successful processing
        await queueClient.deleteMessage(message.messageId, message.popReceipt);
        
        console.log(`Processed video: ${videoDetails.originalName}`);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  }
}

processVideoQueue().catch(console.error);