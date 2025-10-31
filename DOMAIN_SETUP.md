# Domain Setup Guide

This guide explains how to connect your domain to Railway after deployment.

## Prerequisites

1. Domain already purchased (you mentioned it's owned)
2. Railway project deployed and running
3. Access to your domain's DNS settings

## Step-by-Step Domain Setup

### 1. Get Your Railway Domain

After deploying to Railway, you'll get a default domain:
- Example: `https://azure-hollow-production.up.railway.app`

### 2. Add Custom Domain in Railway

1. Go to Railway Dashboard → Your Project → Web Service
2. Click on the **"Settings"** tab
3. Scroll to **"Domains"** section
4. Click **"Add Domain"**
5. Enter your domain (e.g., `azhollow.com` or `www.azhollow.com`)
6. Railway will show you DNS records to add

### 3. Configure DNS Records

Railway will provide you with DNS records. Typically you'll need:

**Option A: Root Domain (azhollow.com)**
```
Type: CNAME
Name: @
Value: [Railway-provided domain]
```

**Option B: Subdomain (www.azhollow.com)**
```
Type: CNAME
Name: www
Value: [Railway-provided domain]
```

**Option C: Using A Record (if your DNS provider doesn't support root CNAME)**
```
Type: A
Name: @
Value: [Railway-provided IP address]
```

### 4. Update DNS at Your Domain Provider

**Common DNS Providers:**

**Cloudflare:**
1. Log into Cloudflare Dashboard
2. Select your domain
3. Go to DNS → Records
4. Add the CNAME or A record Railway provided
5. Save changes

**Namecheap:**
1. Log into Namecheap
2. Domain List → Manage → Advanced DNS
3. Add new record (CNAME or A)
4. Enter the values Railway provided
5. Save

**GoDaddy:**
1. Log into GoDaddy
2. My Products → DNS
3. Add new record
4. Enter the values Railway provided
5. Save

**Other Providers:**
- Look for "DNS Management" or "DNS Settings"
- Add the records Railway provides
- Save changes

### 5. Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Usually works within a few hours
- Use a DNS checker tool to verify: https://dnschecker.org

### 6. Enable SSL (Automatic)

Railway automatically provisions SSL certificates via Let's Encrypt:
- SSL is enabled automatically when domain is verified
- Your site will be available at `https://yourdomain.com`
- Railway handles certificate renewal automatically

### 7. Verify Domain

Once DNS propagates:
1. Railway will verify your domain
2. Status will show as "Active" in Railway dashboard
3. Your site will be live at your custom domain

## Troubleshooting

**Domain not resolving:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct in your DNS provider
- Check DNS propagation: https://dnschecker.org
- Ensure TTL is low (300 seconds or less) for faster updates

**SSL certificate issues:**
- Railway handles SSL automatically
- If certificate fails, delete domain in Railway and re-add
- Ensure DNS is fully propagated before adding domain

**Both www and non-www:**
- Add both `azhollow.com` and `www.azhollow.com` as separate domains in Railway
- Set up DNS records for both:
  - Root domain: CNAME or A record
  - www subdomain: CNAME to Railway domain
- Or redirect one to the other (set up redirect in Railway or DNS)

**Railway domain showing instead of custom:**
- Check DNS records are correct
- Wait for DNS propagation
- Clear browser cache
- Try incognito/private browsing

## Recommended Setup

**Best Practice:**
1. Add both root and www domains in Railway
2. Set up CNAME for www → Railway domain
3. Set up redirect: root domain → www (or vice versa)
4. Use www as primary domain (easier DNS setup)

**DNS Configuration Example:**
```
Type: CNAME
Name: www
Value: azure-hollow-production.up.railway.app

Type: A (or use redirect)
Name: @
Value: [Railway IP or redirect to www]
```

## After Domain Setup

1. Update `NEXT_PUBLIC_BASE_URL` in Railway environment variables to your custom domain
2. Update any hardcoded URLs in the codebase
3. Test the site at your custom domain
4. Verify SSL certificate is active (lock icon in browser)

## Notes

- Railway provides free SSL certificates automatically
- Domain setup is free (you only pay for your domain registration)
- DNS propagation time varies by provider (usually 1-24 hours)
- You can check DNS propagation status in Railway dashboard
- Railway handles all SSL certificate renewal automatically

## Support

If you encounter issues:
- Check Railway documentation: https://docs.railway.app/guides/custom-domains
- Check your DNS provider's documentation
- Verify DNS records match exactly what Railway provides
- Contact Railway support if domain verification fails

