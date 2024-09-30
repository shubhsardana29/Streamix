# Streamix - Anonymous Video Hosting Platform

This project is a video hosting platform built with Next.js, Azure Blob Storage, Azure Queue Storage, and Azure Functions. It allows users to upload videos anonymously and share them via temporary or permanent links.

## Features

- Anonymous video upload
- Temporary (10 days) and permanent video links
- Secure video playback
- Automatic cleanup of expired videos

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your Azure resources (Blob Storage, Queue Storage)
4. Create a PostgreSQL database
5. Configure your environment variables in `.env`
6. Run database migrations:
   ```
   npx prisma migrate dev
   ```
7. Run the development server:
   ```
   npm run dev
   ```

## Deployment

1. Deploy the Next.js app to your preferred hosting platform (e.g., Vercel)
2. Set up a cron job or scheduled task to run the `scripts/cleanup-expired-videos.ts` script daily

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.