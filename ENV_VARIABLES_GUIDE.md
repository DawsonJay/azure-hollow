# Environment Variables - Where to Get Each Value

This guide explains where to find every environment variable value you need.

## 🔵 Database (Auto-Provided by Railway)

**`DATABASE_URL`** - **YOU DON'T SET THIS!**
- Railway automatically provides this when you add PostgreSQL service
- It's auto-injected into your web service
- **Don't add it manually** in Railway variables
- For local development: Copy from Railway Dashboard → PostgreSQL → Variables → `DATABASE_URL`

## 💳 Stripe Keys

### Where to Get Stripe Keys

1. **Create Stripe Account** (if you don't have one):
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a free account
   - Verify your email

2. **Get API Keys:**
   - Log into [Stripe Dashboard](https://dashboard.stripe.com)
   - Click **"Developers"** in left sidebar
   - Click **"API keys"**
   - You'll see two keys:

**`STRIPE_SECRET_KEY`**
- Starts with `sk_test_` (test mode) or `sk_live_` (production)
- Use test mode (`sk_test_...`) for development
- Click **"Reveal test key"** to see it
- Copy the entire key starting with `sk_test_`

**`STRIPE_PUBLISHABLE_KEY`**
- Starts with `pk_test_` (test mode) or `pk_live_` (production)
- Use test mode (`pk_test_...`) for development
- Visible on the same page
- Copy the entire key starting with `pk_test_`

**`STRIPE_WEBHOOK_SECRET`** (Get AFTER setting up webhook)
- After deploying to Railway, you'll set up a webhook
- Go to Stripe Dashboard → **"Developers"** → **"Webhooks"**
- Click **"Add endpoint"**
- URL: `https://your-app.up.railway.app/api/payments/webhook`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`
- After creating, click the webhook → **"Signing secret"** → **"Reveal"**
- Copy the secret (starts with `whsec_`)

### Stripe Test Cards

For testing payments, use Stripe's test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date, any CVC

## 📧 Resend (Email Service)

### Where to Get Resend API Key

1. **Create Resend Account:**
   - Go to [resend.com](https://resend.com)
   - Sign up for free account
   - Verify your email

2. **Get API Key:**
   - Log into [Resend Dashboard](https://resend.com/api-keys)
   - Click **"Create API Key"**
   - Give it a name (e.g., "Azure Hollow Production")
   - Copy the key (starts with `re_...`)
   - **Save it immediately** - you can't see it again!

3. **Verify Domain (Optional but Recommended):**
   - For production, verify `azhollow.com` domain
   - Go to **"Domains"** in Resend dashboard
   - Add your domain and follow DNS setup instructions

**`RESEND_API_KEY`**
- Copy from Resend dashboard → API Keys
- Starts with `re_...`
- Paste entire key

**`EMAIL_FROM`**
- Use: `bookings@azhollow.com` (or your verified domain email)
- Must match a verified domain in Resend (or use Resend's default for testing)

## 👤 Admin Configuration

**`ADMIN_EMAIL`**
- Jessica's email address (where she'll receive notifications)
- Example: `jessica@example.com` (replace with her real email)

**`ADMIN_MASTER_PASSWORD`**
- A secure password you choose for emergency account recovery
- Should be strong (not used elsewhere)
- Store securely - you'll use this if Jessica's password is compromised
- Example: Generate a strong random password

## 🌐 Application URL

**`NEXT_PUBLIC_BASE_URL`**
- **Get this AFTER first Railway deploy:**
  1. Deploy to Railway
  2. Railway provides a URL like: `https://azure-hollow-production.up.railway.app`
  3. Copy that exact URL
  4. Add it to Railway variables as `NEXT_PUBLIC_BASE_URL`
- **For local development:** Use `http://localhost:3000`

## 📋 Quick Checklist

**Before Railway Deployment:**
- [ ] Stripe account created
- [ ] Stripe test API keys copied (`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`)
- [ ] Resend account created
- [ ] Resend API key copied (`RESEND_API_KEY`)
- [ ] Jessica's email confirmed (`ADMIN_EMAIL`)
- [ ] Master password chosen (`ADMIN_MASTER_PASSWORD`)
- [ ] Email from address set (`EMAIL_FROM`)

**After Railway Deployment:**
- [ ] Railway URL copied (`NEXT_PUBLIC_BASE_URL`)
- [ ] Stripe webhook created and secret copied (`STRIPE_WEBHOOK_SECRET`)
- [ ] Resend webhook created (if needed for inbound emails)

## 🚨 Important Notes

1. **Test vs Production Keys:**
   - Start with **test keys** for Stripe (they start with `test_`)
   - Switch to **live keys** when ready for real payments
   - Update both secret and publishable keys together

2. **Security:**
   - Never commit `.env` file to git (it's in `.gitignore`)
   - Never share API keys publicly
   - Rotate keys if exposed

3. **Railway Setup:**
   - Add all variables in Railway Dashboard → Your Service → Variables tab
   - `DATABASE_URL` is automatically provided - don't add it
   - Variables are service-specific (web service vs database service)

4. **Local Development:**
   - Copy `.env.example` to `.env`
   - Fill in values (you can use Railway's `DATABASE_URL` for local dev)
   - Never commit `.env`

## 🔗 Quick Links

- **Stripe Dashboard:** https://dashboard.stripe.com/test/apikeys
- **Stripe Webhooks:** https://dashboard.stripe.com/test/webhooks
- **Resend Dashboard:** https://resend.com/api-keys
- **Resend Domains:** https://resend.com/domains
- **Railway Dashboard:** https://railway.app

## Need Help?

If you get stuck:
- **Stripe:** Check their [documentation](https://stripe.com/docs) or support
- **Resend:** Check their [docs](https://resend.com/docs) or Discord
- **Railway:** Check their [docs](https://docs.railway.app) or Discord

