# Azure Hollow - Tarot Reading Site

A full-stack web application for **Azure Hollow**, Jessica Rose's tarot reading side hustle. Designed to give the reader full control over their schedule while providing clients with a professional booking and payment experience.

**Business:** Azure Hollow  
**Reader:** Jessica Rose  
**Domain:** Owned (ready for deployment)

## Project Status

**Current Phase:** Backend Complete - Frontend Pending Figma Design

✅ **Backend:** Complete (API routes, database, business logic)
⏳ **Frontend:** Waiting for Figma design

See `IMPLEMENTATION_STATUS.md` for detailed progress.

## Tech Stack

- **Framework:** Next.js 14+ (React with App Router)
- **Styling:** Tailwind CSS (utility-first, no component library)
- **Database:** PostgreSQL (via Railway)
- **ORM:** Prisma
- **Payments:** Stripe
- **Email:** Resend
- **Hosting:** Railway (web service + PostgreSQL database)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Railway account (for hosting and PostgreSQL database)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Railway database (do this first for local dev):
   - Create Railway account
   - Create new project
   - Add PostgreSQL service (free tier included)
   - Get `DATABASE_URL` from Railway dashboard → PostgreSQL Service → Connect

3. Set up local environment:
   ```bash
   cp .env.example .env
   ```
   - Add your Railway `DATABASE_URL` to `.env`
   - This connects your local dev to Railway's database

4. Set up Railway web service:
   - In Railway project, add web service (connect GitHub repo or deploy)
   - Railway automatically provides `DATABASE_URL` to the web service
   - Add other environment variables in Railway dashboard

5. Set up database (using Railway database):
```bash
# Generate Prisma client
npm run db:generate

# Push schema to Railway database (connects via DATABASE_URL in .env)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

6. Run development server (uses Railway database):
```bash
npm run dev
```

See `RAILWAY_SETUP.md` for detailed Railway deployment instructions.  
See `DEVELOPMENT_WORKFLOW.md` for local development workflow using Railway database.

## Environment Variables

See `.env.example` for all required environment variables:

**Auto-provided by Railway:**
- `DATABASE_URL` - PostgreSQL connection string (auto-injected)

**Set in Railway Dashboard:**
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM` - Email address for sending emails
- `ADMIN_EMAIL` - Email address for admin notifications
- `NEXT_PUBLIC_BASE_URL` - Railway URL (e.g., `https://your-app.up.railway.app`)
- `ADMIN_MASTER_PASSWORD` - Master password for emergency account recovery

## API Routes

### Public Routes

- `POST /api/requests` - Create a contact request
- `GET /api/packages` - Get active packages
- `GET /api/availability` - Get available time slots
- `GET /api/pay/[token]` - Get payment page data
- `POST /api/payments/checkout` - Create Stripe checkout session

### Admin Routes (Authentication TODO)

- `GET /api/requests` - Get all requests
- `GET /api/requests/[id]` - Get specific request
- `PATCH /api/requests/[id]` - Update request status
- `POST /api/requests/[id]/accept` - Accept request and generate payment link
- `POST /api/requests/[id]/reject` - Reject request
- `POST /api/requests/[id]/clarify` - Send clarification message
- `POST /api/availability` - Create availability slot
- `DELETE /api/availability` - Delete availability slot
- `GET /api/bookings` - Get upcoming bookings

### Webhooks

- `POST /api/payments/webhook` - Stripe payment webhook
- `POST /api/email/webhook` - Email inbound webhook (Resend/Mailgun)

## Project Structure

```
tarot-site-project/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── requests/       # Request endpoints
│   │   ├── availability/   # Availability endpoints
│   │   ├── payments/       # Payment endpoints
│   │   ├── email/          # Email webhook
│   │   └── packages/       # Package endpoints
│   ├── (public)/           # Public routes (TODO: design)
│   └── admin/              # Admin routes (TODO: design)
├── lib/                    # Utilities
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Authentication
│   ├── email.ts           # Email service
│   ├── stripe.ts          # Stripe integration
│   ├── tokens.ts          # Token management
│   ├── calendar.ts         # Calendar utilities
│   └── expiration.ts       # Expiration logic
├── prisma/                 # Database schema
│   └── schema.prisma
└── design-docs/           # Design documentation
```

## Design Philosophy

The system is designed around the principle that the reader needs full control over when she works. Tarot can be draining, and she has a fluid work schedule, so automatic bookings are not appropriate. Instead:

- Clients propose available times
- Reader reviews and accepts requests on her own schedule
- Time is confirmed before payment
- Payment locks in the session

## Documentation

All design documentation is in the `design-docs/` folder:

- `design-docs/DESIGN_NOTES.md` - Detailed design decisions and workflow documentation
- `design-docs/MVP_PAGES.md` - Complete page structure and routes
- `design-docs/LANDING_PAGE_CONTENT.md` - Landing page content requirements
- `design-docs/VISUAL_DESIGN.md` - Visual design direction, card-based design system
- `design-docs/COLOR_PALETTE.md` - Complete color palette with hex codes and usage guidelines
- `design-docs/SEO_REQUIREMENTS.md` - SEO specifications and best practices
- `design-docs/CONTENT_PLACEHOLDERS.md` - Placeholder content for building
- `design-docs/PROJECT_DETAILS.md` - Confirmed project information
- `design-docs/DESIGN_REFINEMENTS.md` - Design refinement proposals
- `design-docs/DESIGN_EVALUATION.md` - Design plan evaluation and assessment

## Next Steps

- [ ] Complete Figma design
- [ ] Build frontend components (landing page, order page, admin pages)
- [ ] Implement authentication (admin login)
- [ ] Set up Railway account and project
- [ ] Deploy to Railway (web service + PostgreSQL)
- [ ] Configure email service (Resend)
- [ ] Set up Stripe account and webhooks
- [ ] Configure webhook URLs (Stripe, Resend) to Railway URL
