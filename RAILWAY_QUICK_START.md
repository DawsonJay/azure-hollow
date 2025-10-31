# Railway Deployment - Quick Start

## ✅ Code is on GitHub!

Repository: https://github.com/DawsonJay/azure-hollow.git

## Step-by-Step Railway Deployment

### 1. Create Railway Account & Project

1. Go to [railway.app](https://railway.app)
2. Sign up or log in (GitHub login recommended)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Find and select **`DawsonJay/azure-hollow`**
6. Railway will start deploying automatically

### 2. Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway automatically:
   - Creates the database
   - Provides connection string
   - Injects `DATABASE_URL` to your web service
   - **No manual setup needed!**

### 3. Configure Environment Variables

1. Go to your **web service** (not the database)
2. Click **"Variables"** tab
3. Add these environment variables:

```
STRIPE_SECRET_KEY=sk_test_... (get from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_test_... (get from Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_... (get after setting up webhook)
RESEND_API_KEY=re_... (get from Resend Dashboard)
EMAIL_FROM=bookings@azhollow.com
ADMIN_EMAIL=jessica@example.com (Jessica's email)
ADMIN_MASTER_PASSWORD=your-secure-password-here
NEXT_PUBLIC_BASE_URL=https://your-app.up.railway.app (Railway will show this)
```

**Important:** 
- `DATABASE_URL` is **auto-provided** - don't add it manually!
- `NEXT_PUBLIC_BASE_URL` - Get this from Railway after first deploy

### 4. Wait for First Deploy

- Railway automatically builds and deploys
- Watch the build logs in Railway dashboard
- First deploy will fail until database is initialized (that's normal)

### 5. Initialize Database

After first successful deploy:

1. In Railway dashboard, go to your **web service**
2. Click **"View Logs"** or use Railway CLI
3. Or use Railway's "Run Command" feature

Run these commands:

```bash
# Create database tables
npx prisma db push

# Seed initial packages
npm run seed:packages
```

**Alternative:** Run locally pointing to Railway database:
- Copy `DATABASE_URL` from Railway → PostgreSQL → Variables
- Add to local `.env`
- Run commands locally

### 6. Verify Deployment

1. Check health endpoint: `https://your-app.up.railway.app/api/health`
   - Should return: `{"status":"healthy","database":"connected"}`

2. Check logs in Railway dashboard for any errors

### 7. Set Up Webhooks (After deployment)

**Stripe Webhook:**
1. Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://your-app.up.railway.app/api/payments/webhook`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret → Add to Railway variables as `STRIPE_WEBHOOK_SECRET`

**Resend Webhook:**
1. Resend Dashboard → Webhooks → Add endpoint  
2. URL: `https://your-app.up.railway.app/api/email/webhook`
3. Events: Inbound email events

## Troubleshooting

**Build fails:**
- Check Railway build logs
- Ensure all environment variables are set (except DATABASE_URL)
- Verify Prisma can generate client (should auto-run in build)

**Database connection fails:**
- Verify PostgreSQL service is added
- Check `DATABASE_URL` is auto-injected (don't set manually)
- Run `npx prisma db push` to create tables

**Health check fails:**
- Check database service is running
- Verify database is connected to web service
- Check Railway logs for connection errors

## What Railway Does Automatically

✅ Detects Next.js  
✅ Runs `npm install`  
✅ Runs `npm run build` (includes `prisma generate`)  
✅ Runs `npm start`  
✅ Monitors `/api/health` endpoint  
✅ Auto-injects `DATABASE_URL`  
✅ Provides HTTPS URL  
✅ Handles restarts on failure  

## Next Steps After Deployment

1. ✅ Database initialized
2. ✅ Health check working
3. ⏳ Set up Stripe account and get API keys
4. ⏳ Set up Resend account and get API key
5. ⏳ Configure webhooks
6. ⏳ Test API endpoints
7. ⏳ Build frontend (after Figma design)

## Railway Dashboard

Monitor everything in Railway:
- **Deployments** tab - Build history
- **Metrics** tab - CPU, memory, requests
- **Logs** tab - Application logs
- **Variables** tab - Environment variables
- **Settings** tab - Domain, scaling

Your app will be live at: `https://your-app.up.railway.app`

