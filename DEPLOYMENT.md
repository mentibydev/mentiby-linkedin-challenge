# Vercel Deployment Guide

## Environment Variables Required

You need to set up the following environment variables in your Vercel project:

### Required Variables:
- `DATABASE_URL` - Your PostgreSQL database connection string
- `NODE_ENV` - Set to `production`

### Optional Variables:
- `PORT` - Server port (defaults to 3000)

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add the required variables listed above

5. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

## Database Setup

Make sure your PostgreSQL database is accessible from Vercel. You can use:
- Neon (recommended for serverless)
- Supabase
- Railway
- Any PostgreSQL provider that supports external connections

## Project Structure

This project is configured as:
- **Frontend**: React app built with Vite
- **Backend**: Express.js API server
- **Database**: PostgreSQL with Drizzle ORM

The `vercel.json` configuration handles:
- API routes (`/api/*`) → Express server
- Static files → React frontend
- Build process for both frontend and backend
