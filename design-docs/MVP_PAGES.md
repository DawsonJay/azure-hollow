# MVP Pages & Routes

**Last Updated:** 2025-10-31-2132 (GMT/UTC)

## Public-Facing Pages (Client Side)

### 1. Landing Page
**Purpose:** Long scrollable page introducing friend, service, and packages
**Design:** Mobile-first, long scrolling page

**Content Sections (Top to Bottom):**
- Hero section (friend's name, tagline)
- Packages section (prominently displayed, immediately after hero)
  - Each package clearly shown (name, duration, price, description)
  - Link/button on each package → leads to order page with package pre-selected
- How it works (brief explanation of the process)
- About section (friend's story, practice description, how she got into tarot)
- Footer with contact info

**Key Features:**
- Packages are the main call-to-action
- Mobile-optimized scrolling
- Clear, readable sections
- Packages lead directly to order page

**Routes:** `/` or `/home`

### 2. Order/Booking Page
**Purpose:** Client selects times and submits request for a specific package
**Flow:**
1. Package already selected (from landing page link)
   - Shows package details at top (name, duration, price)
2. Calendar appears showing available dates (only dates friend marked available)
3. Client clicks date → time slot buttons appear for that package duration
   - 30-min package → buttons: "6:00-6:30", "6:30-7:00", etc.
   - 60-min package → buttons: "6:00-7:00", "7:00-8:00", etc.
4. Client selects multiple time slots across dates
5. Fill in form:
   - Name (required)
   - Email (required)
   - Optional Message/Question (textarea)
6. Submit request

**Routes:** `/order/[package-id]` or `/book/[package-id]`

### 3. Order Confirmation Page
**Purpose:** Confirm request received
**Content:**
- "Thank you! We've received your request"
- "We'll review and get back to you within [timeframe]"
- Next steps info

**Routes:** `/order-confirmed` or `/thank-you`

### 4. Payment Page
**Purpose:** Client pays for confirmed reading (if friend accepted)
**Content:**
- Shows confirmed: Date, Time, Package, Price (read-only)
- Stripe checkout integration
- Validates slot still available (checks 24-hour reservation)

**Routes:** `/pay/[token]` (one-time-use token in URL)

### 5. Payment Success Page
**Purpose:** Confirm payment completed
**Content:**
- "Payment successful!"
- Booking confirmation (date, time, package)
- Zoom link displayed (also sent via email)
- Preparation notes (if any)
- "Check your email for confirmation"

**Routes:** `/payment-success`

### 6. Payment Error Pages

**a) Token Failure Page**
**Purpose:** Handle expired or invalid token
**Content:**
- "This payment link has expired"
- Clear explanation
- Action: Contact friend or request new time

**Routes:** `/payment-failed?error=token-expired`

**b) Slot Filled Page**
**Purpose:** Slot was taken after 24-hour reservation expired
**Content:**
- "This time slot is no longer available"
- Explanation: "The slot was held for 24 hours but has been booked by someone else"
- Action: Contact friend or request new time

**Routes:** `/payment-failed?error=slot-filled`

**c) General Payment Error Page**
**Purpose:** Handle other payment errors
**Content:**
- Clear explanation of what happened
- Action items (contact friend, try again, etc.)

**Routes:** `/payment-failed` (with error code/message)

## Admin Pages (Friend's Side)

**Design Philosophy:** Multiple simple pages, each with one clear purpose. Easy navigation between pages.

### 7. Admin Login Page
**Purpose:** Friend logs into admin
**Features:**
- Username/password form
- Remember me option
- Master password link (emergency password reset)

**Routes:** `/admin/login`

### 8. Admin Main/Gateway Page
**Purpose:** Simple navigation hub to all admin functions
**Content:**
- Simple menu/links to:
  - Messages (with badge showing new requests/unread count)
  - Set Availability
  - Current Bookings
- Maybe quick stats: "3 new requests", "5 upcoming sessions"

**Routes:** `/admin` or `/admin/home`

### 9. Messages Page
**Purpose:** View and manage all reading requests and conversations
**Content:**
- List of all requests (new + active conversations)
- Filter buttons: All | New | In Conversation | Accepted | Rejected
- Badges/alerts for new activity (unread messages, new requests)
- Each request card shows:
  - Client name, email, message
  - Package selected
  - Preferred times (client's selections)
  - Status
  - Date submitted
  - Time until expiration (if active)
  - Conversation thread (chat bubbles showing all messages - from site OR email)
  - Action buttons: Clarify | Accept | Reject
- **Note:** Messages from friend's direct emails also appear in conversation thread

**Request Actions (On this page):**
- **Clarify:** Form/textarea for message, send button
- **Accept:** 
  - Calendar view showing client's selected times
  - Click one of client's highlighted slots
  - Optional custom message or use default
  - Generate payment link button
- **Reject:**
  - Optional custom message or use default
  - Send rejection button

**Auto-Expiration:**
- Active requests expire after 7 days of **inactivity** (no messages)
- **Activity resets timer:** Any message from friend or client extends expiration
- **Reject action:** Immediately expires request (no 7-day wait)
- If expired: System automatically sends default rejection message

**Routes:** `/admin/messages`

### 10. Set Availability Page
**Purpose:** Mark times as available/unavailable
**Content:**
- Calendar grid (current month + 3 months ahead)
- Days down left, time slots across top (30-minute increments)
- Click slots to toggle available/unavailable
- Visual feedback:
  - Available = highlighted/green
  - Unavailable = gray/unmarked
- Simple instructions: "Click slots to mark available"

**Routes:** `/admin/availability`

### 11. Current Bookings Page
**Purpose:** View all confirmed upcoming bookings in calendar view
**Content:**
- Calendar view showing future bookings
- Shows date, time, client name, package for each booking
- Visual calendar (month view, can navigate)
- Booked slots clearly marked/colored
- Shows upcoming sessions in an easy-to-see format

**Routes:** `/admin/bookings`

## Additional Pages (Nice to Have but Not MVP)

### Error Pages
- 404 Not Found
- 500 Server Error
- Routes: Standard error handling

## Routes Summary

### Public Routes
- `/` - Landing page (long scrollable, packages lead to order)
- `/order/[package-id]` - Order/Booking page (package pre-selected)
- `/order-confirmed` - Order submission confirmation
- `/pay/[token]` - Payment page (if friend accepts)
- `/payment-success` - Payment success
- `/payment-failed` - Payment errors (token expired, slot filled, general)

### Admin Routes
- `/admin/login` - Login
- `/admin` or `/admin/home` - Main gateway/navigation hub
- `/admin/messages` - Messages and requests management
- `/admin/availability` - Set availability
- `/admin/bookings` - Current bookings calendar view

## MVP Priority

**Must Have:**
1. Landing page (long scrollable, mobile-first, packages prominently displayed)
2. Order/Booking page (package pre-selected from landing, pick times, optional message)
3. Order confirmation page
4. Payment page (if friend accepts)
5. Payment success page
6. Payment error pages (token expired, slot filled, general errors)
7. Admin login
8. Admin main/gateway page
9. Admin messages page (requests + conversations, auto-expire after 7 days)
10. Admin availability page
11. Admin bookings page (calendar view of future bookings)

**Optional MVP (Can add later or use config):**
- Package management (could manage via config file initially)

## SEO Considerations

**All pages need:**
- Unique title tags and meta descriptions
- Proper heading hierarchy (H1, H2, H3)
- Alt text on images
- Clean, descriptive URLs
- Mobile-optimized (already planned)

**Landing page specifically:**
- Target keywords: "tarot reading", "online tarot reading", "virtual tarot reading"
- Include keywords naturally in content
- FAQ section recommended for SEO content

**See:** `SEO_REQUIREMENTS.md` for complete SEO specifications

---

## Notes

**Client-Side Flow:**
1. Landing page → Click package → Order page (package pre-selected)
2. Order page → Pick times, add message → Submit
3. Order confirmed → (Wait for friend to accept)
4. If accepted → Payment link sent → Payment page
5. Payment success or error pages

**Design Philosophy:**
- **Landing:** Long scrollable, mobile-first, packages are main CTAs
- **Order page:** Package already selected, focus on time selection
- **Payment/Error pages:** Simple, clear messaging

**Admin:**
- **Multi-page admin philosophy:** Simple, focused pages - one purpose per page. Easier for technophobic user to navigate.
- **Admin navigation:** Gateway page with simple menu/links. Badges/indicators show where attention is needed.
- **Auto-expiration:** Active requests auto-reject after 7 days with default message (prevents buildup of old requests)

**Technical:**
- **Calendar component:** Reusable across order page, admin request review, and availability management
- **Email handling:** Not pages, but email templates and inbound email webhook handler needed

