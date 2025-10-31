# Railway Setup Guide

## Quick Start

Railway makes PostgreSQL setup simple - the database is included and automatically configured.

## Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up (GitHub login recommended)
3. You get $5 free credit/month (usually enough for low traffic)

## Step 2: Create Project

1. Click "New Project"
2. Choose "Deploy from GitHub repo" (if repo is connected) or "Empty Project"

## Step 3: Add PostgreSQL Database

1. In your project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway automatically:
   - Creates the database
   - Provides connection string
   - Injects `DATABASE_URL` environment variable

**Note:** The database connection string is automatically available to your web service via the `DATABASE_URL` environment variable. No manual configuration needed!

## Step 4: Add Web Service

1. In your project, click "+ New"
2. Select "GitHub Repo" or "Empty Service"
3. If using GitHub:
   - Select your repository
   - Railway auto-detects Next.js
   - Build command: `npm run build` (auto-detected)
   - Start command: `npm start` (auto-detected)

4. Railway automatically connects to your PostgreSQL database via `DATABASE_URL`

## Step 5: Configure Environment Variables

In Railway dashboard → Your Web Service → Variables tab:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
EMAIL_FROM=bookings@azhollow.com
ADMIN_EMAIL=jessica@example.com
ADMIN_MASTER_PASSWORD=your-secure-master-password
NEXT_PUBLIC_BASE_URL=https://your-app.up.railway.app
```

**Note:** `DATABASE_URL` is automatically provided - don't set it manually!

## Step 6: Deploy

1. Railway automatically builds and deploys on push to main branch
2. Or trigger manual deploy from dashboard
3. Your app will be live at `https://your-app.up.railway.app`

## Step 7: Run Database Migration

Once deployed, you can run migrations via Railway's shell:

1. Go to your web service
2. Click "View Logs" or use Railway CLI
3. Or use Railway's one-click "Run Command" feature

```bash
npx prisma migrate deploy
# or for development:
npx prisma db push
```

Alternatively, add a migration script to your build process or run it locally pointing to Railway's database:

```bash
# Get DATABASE_URL from Railway dashboard → PostgreSQL service → Connect → Connection string
DATABASE_URL="your-railway-connection-string" npx prisma migrate deploy
```

## Step 8: Seed Initial Data

```bash
npm run seed:packages
```

Run this locally with Railway's `DATABASE_URL` or via Railway's shell.

## Webhook Configuration

### Stripe Webhooks

1. In Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-app.up.railway.app/api/payments/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET` in Railway

### Resend Webhooks

1. In Resend Dashboard → Webhooks
2. Add endpoint: `https://your-app.up.railway.app/api/email/webhook`
3. Select events: Inbound email events
4. Railway automatically handles the webhook

## Local Development

**Recommended: Use Railway database for local development**

This way you're working with the same database as production from day one:

1. **Create Railway database first:**
   - Create Railway project
   - Add PostgreSQL service
   - Copy the `DATABASE_URL` from Railway dashboard

2. **Set up local environment:**
   ```bash
   cp .env.example .env
   ```

3. **Add Railway DATABASE_URL to `.env`:**
   ```bash
   DATABASE_URL="postgresql://postgres:password@host:port/database"
   ```
   (Get this from Railway Dashboard → PostgreSQL Service → Connect → Connection string)

4. **Run database migration:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start local development:**
   ```bash
   npm run dev
   ```

**Benefits:**
- Same database for dev and production
- No local PostgreSQL needed
- Test migrations against real database
- Share test data across team
- Railway handles all database management

**Alternative (not recommended):**
You could run PostgreSQL locally, but using Railway's database ensures consistency.

## Railway Pricing

- **Free tier:** $5 credit/month (usually enough for low traffic)
- **Starter plan:** $5/month (after free credits)
- **Database included:** No separate database cost
- **Pay-as-you-go:** Scales automatically

## Advantages of Railway

✅ Database and hosting in one place  
✅ Automatic `DATABASE_URL` injection  
✅ Simple deployment (GitHub integration)  
✅ No separate database setup  
✅ Automatic SSL certificates  
✅ Built-in logging and monitoring  
✅ Easy environment variable management  
✅ Supports webhooks out of the box

## Troubleshooting

**Database connection issues:**
- Verify `DATABASE_URL` is auto-provided (don't set manually)
- Check PostgreSQL service is running
- Verify database credentials in Railway dashboard

**Build failures:**
- Check build logs in Railway dashboard
- Ensure `package.json` has correct build scripts
- Verify Node.js version compatibility

**Environment variables:**
- Variables are service-specific in Railway
- Web service needs access to database (automatic via Railway)
- Use Railway's Variables tab for all secrets

