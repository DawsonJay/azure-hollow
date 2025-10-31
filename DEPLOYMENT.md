# Deployment Guide

## Railway Deployment

This project is configured to deploy automatically on Railway.

### Prerequisites

1. Railway account created
2. GitHub repository (push this repo to GitHub)
3. Stripe account (get API keys)
4. Resend account (get API key)

### Setup Steps

1. **Create Railway Project:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

2. **Add PostgreSQL Database:**
   - In Railway project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically provides `DATABASE_URL`

3. **Configure Environment Variables:**
   - Go to your web service → Variables tab
   - Add all variables from `.env.example`:
     - `STRIPE_SECRET_KEY`
     - `STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `RESEND_API_KEY`
     - `EMAIL_FROM`
     - `ADMIN_EMAIL`
     - `ADMIN_MASTER_PASSWORD`
     - `NEXT_PUBLIC_BASE_URL` (set to Railway URL: `https://your-app.up.railway.app`)
   - **Note:** `DATABASE_URL` is auto-injected, don't set it manually

4. **Deploy:**
   - Railway automatically builds and deploys on push to main branch
   - Or trigger manual deploy from dashboard

5. **Initialize Database:**
   - After first deploy, run migrations:
   - Use Railway's "Run Command" feature or CLI:
     ```bash
     npx prisma migrate deploy
     # or for development:
     npx prisma db push
     ```
   - Seed initial packages:
     ```bash
     npm run seed:packages
     ```

### Health Check

Railway automatically monitors `/api/health` endpoint:
- **Healthy:** Returns 200 with database connection status
- **Unhealthy:** Returns 503 if database is disconnected

### Build Configuration

Railway uses `railway.json` configuration:
- **Build command:** `npm run build` (includes Prisma generate)
- **Start command:** `npm start`
- **Health check:** `/api/health`
- **Post-install:** Automatically runs `prisma generate`

### Webhooks

After deployment, configure webhooks:

1. **Stripe Webhook:**
   - Dashboard → Webhooks → Add endpoint
   - URL: `https://your-app.up.railway.app/api/payments/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

2. **Resend Webhook:**
   - Dashboard → Webhooks → Add endpoint
   - URL: `https://your-app.up.railway.app/api/email/webhook`
   - Events: Inbound email events

### Monitoring

- View logs in Railway dashboard
- Health check status visible in service overview
- Database metrics in PostgreSQL service tab

### Troubleshooting

**Build fails:**
- Check Railway build logs
- Verify all environment variables are set
- Ensure `DATABASE_URL` is auto-provided (don't set manually)

**Health check fails:**
- Check database connection in Railway
- Verify `DATABASE_URL` is correct
- Check PostgreSQL service is running

**Database connection issues:**
- Verify PostgreSQL service is added to project
- Check `DATABASE_URL` in Railway (auto-provided)
- Run `npx prisma db push` to verify connection

## Local Development

See `DEVELOPMENT_WORKFLOW.md` for local development setup using Railway database.

