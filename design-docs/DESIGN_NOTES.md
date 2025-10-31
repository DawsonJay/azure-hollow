# Tarot Site Project - Design Notes

**Last Updated:** 2025-10-31-2132 (GMT/UTC)

## Project Overview

Building a tarot reading website as a side hustle platform for a friend. The system respects the reader's boundaries by giving her full control over when she accepts bookings, since tarot can be draining and she has a fluid work schedule.

**Key Constraint:** No automatic bookings - she reviews and accepts requests manually on her own schedule.

## Core Workflow

### Client Side Flow
1. Client fills out contact form with:
   - Name, email, message/question
   - Package selection (determines session length)
   - Available times/dates (their preferences - multiple selections)
2. Client receives confirmation email: "Thanks, we'll review and get back to you"
3. (Later) Client receives email with payment link
4. Client clicks payment link → sees confirmed date/time, package, price
5. Client pays via Stripe → receives confirmation with session details

### Admin Side Flow (Friend's Experience)
1. Logs into single admin page
2. Sees all requests in one view (filterable: All | Pending | Accepted | Paid | Completed)
3. Clicks on a request → sees:
   - Client details (name, email, message)
   - Client's preferred available times
   - Calendar view showing:
     - Client's offered times (highlighted/selectable)
     - Already booked times (disabled/grayed out)
     - Friend's marked unavailable times (disabled)
     - Time slots automatically arranged by package length (30-min slots for 30-min package, etc.)
4. Clicks one of the client's available times that also works for her
5. Time is locked in → system generates payment link with that specific time
6. Optional: Customize email message or use default
7. After client pays → Request moves to "Confirmed" status

**Key UX Principle:** Aggressively technophobic user - everything must be on the easiest possible single page.

## Design Flexibility Philosophy

**Principle:** Design the system to be flexible for things the friend will have opinions on, while keeping technical workflows completely hidden from her.

### What Friend Will Control (Design for Flexibility)
- **Package offerings:** Add/edit/remove packages, names, durations, prices
- **Site appearance:** Colors (lavender & dark slate confirmed), fonts, styling, layout preferences
- **Content:** About page text, practice description, bio, any site copy
- **Package details:** Descriptions, what's included, etc.

**Note:** Visual design direction confirmed - witchy, reassuring, friendly, professional with card-based design. See `VISUAL_DESIGN.md` for complete design specifications.

### What Friend Shouldn't Have to Think About (Keep Hidden)
- Payment workflows (handled automatically)
- Token generation (automatic)
- Email sending (automatic)
- Technical configuration

**Implementation Approach:**
- Make packages editable through admin interface (simple forms)
- Design system that supports easy theme/styling changes
- Separate content management for all user-facing text
- Keep technical complexity in backend, expose only simple admin controls

## Key Design Decisions

### 1. Contact Form → Manual Review → Payment Link
- **Rationale:** Gives friend control over when she works, respects that tarot is draining
- **Alternative Considered:** Direct booking system (rejected - doesn't fit constraints)

### 2. One-Time-Use Payment Tokens
- **Rationale:** Prevents link sharing, ensures payment security
- **Features:**
  - Token expiration: 7 days
  - Linked to specific request and confirmed time
  - Prevents payment link abuse
  - One-time use only (marked as used after payment)

### 3. Calendar-Based Time Selection
- **Implementation:** Friend clicks dates and times on calendar
- **Auto-arrangement:** Time slots automatically arranged by package length required
- **Visual Feedback:** 
  - Client's offered times highlighted/selectable
  - Already booked times disabled/grayed out
  - Unavailable times disabled
- **Workflow:** Client proposes times → Friend chooses from those proposals → Time confirmed before payment

### 4. Payment Timing & Slot Reservation

**Time Confirmation:**
- Time is confirmed BEFORE payment (friend selects from client's proposals)
- Payment link generated with specific time locked in

**Slot Reservation System:**
- Slot is reserved for 24 hours after friend accepts/confirms time
- After 24 hours, if client hasn't paid, slot becomes available again for other requests
- Token remains valid for 7 days (client can still attempt payment)
- If client tries to pay after 24 hours and slot is taken by someone else → failure page

**Failure Handling:**
- Payment page checks if slot is still available
- If slot was taken by another request (after 24-hour reservation expired):
  - Show failure page explaining what happened
  - Suggest contacting friend or selecting a new time
- If token expired (>7 days): Show token expiration message

**Payment Page:**
- Shows confirmed date, time, package, price (read-only)
- Validates slot availability before processing payment
- After Payment: Both parties get confirmation emails with Zoom link

### 5. Stripe Integration
- **Rationale:** Protects friend from people who try to get out of paying
- **Payment Flow:** Client pays upfront, friend protected

### 6. Single-Page Admin Interface
- **Rationale:** Friend is aggressively technophobic
- **Features:**
  - All requests visible on one page
  - Filter/view options: All | Pending | In Conversation | Accepted | Paid | Completed | Rejected
  - Each request shows: Name, email, message, date submitted, status, conversation thread
  - Action buttons: Clarify | Accept | Reject
  - Badges/alerts for new activity (unread messages, new requests)
  - Expandable request cards showing conversation history (chat bubbles)
  - Modal or inline forms for actions
  - Email notifications to separate address for activity

### 7. Accept/Reject/Clarify Actions

**Accept:**
- Select time from client's proposals (calendar view)
- Optional custom message or default message
- Generates payment link automatically
- Status changes to "Accepted"

**Reject:**
- Optional custom message or default message
- Client notified
- Status changes to "Rejected"

**Clarify:**
- Send a free-form message to client (neither confirming nor denying)
- Allows back-and-forth conversation
- Always free-form (no templates)
- Status changes to "In Conversation"
- Enables email conversation threading

### 8. Email Conversation System

**Core Philosophy:**
- Site reflects email conversations (bidirectional sync)
- Friend can use regular email client OR site interface
- All messages from either source appear on the site
- Site is a mirror of the email conversation, not a separate system

**Requirements:**
- Site needs connected email address (e.g., bookings@site.com)
- Inbound email handling (webhook or polling)
- Outbound email sending capability
- Conversation threading to link emails to requests
- Admin interface shows full conversation history

**Workflow (Site Interface):**
1. Friend clicks "Clarify" → types free-form message → sends
2. System sends email to client (from bookings@site.com)
3. Email includes request ID in subject
4. Message appears in admin conversation view

**Workflow (Friend's Email Client):**
1. Friend opens her regular email
2. Replies directly to client's email (or sends new email)
3. Email goes through bookings@site.com (or uses reply-to)
4. System captures outbound email via email service API
5. Message appears on site conversation view
6. Client receives email normally

**Workflow (Client Replies):**
1. Client replies to any email from bookings@site.com
2. Reply captured via inbound email webhook
3. Request ID parsed from subject line
4. Message stored and linked to request
5. Friend gets notification + badge on site
6. Message appears in conversation view

**Email Threading:**
- Request ID included in email subject: "Your Tarot Reading Request [#12345]"
- Replies automatically include request ID in subject line (via Reply-To or thread detection)
- Inbound emails matched by parsing request ID from subject
- Outbound emails (from site or friend's email) captured and stored
- Conversations organized by client email address
- Bidirectional sync: email ↔ site

**Admin Display:**
- Chat bubble interface (all messages from both sources, alternating)
- Organized by client email address
- Expandable conversation thread within request card
- Shows timestamps and source (site interface or email)
- "New message" badge/indicator when unread
- Messages appear regardless of source (site or email)

**Expiration Logic (Updated):**
- Active requests expire after 7 days of **no activity**
- Any new message (from friend OR client) resets expiration timer
- Any clarification message resets expiration timer
- Reject action immediately expires/clears the request (no 7-day wait)
- Timer resets on: client reply, friend's clarification, friend's accept/reject confirmation

**Notifications:**
- Friend receives email notifications to separate email address for:
  - New contact form requests
  - Client replies to any message
- Admin page shows:
  - Badges/alert indicators for new activity
  - Unread message counts
  - Activity indicators on relevant requests

**Technical Implementation:**
- Email service provider (SendGrid, Mailgun, AWS SES, etc.)
- Outbound email: Include request ID in subject line
- Inbound email webhook handler (captures client replies)
- Outbound email tracking (captures friend's direct emails via API or sent folder monitoring)
- Message parsing: Extract request ID from subject line (format: [#12345])
- Store messages in database linked to request and client email
- Display conversation thread in chat bubble format
- Bidirectional sync ensures site always reflects email state

### 9. Request Expiration & Activity Tracking

**Expiration Rules:**
- Requests expire after 7 days of **inactivity** (no messages from either side)
- **Activity resets timer:**
  - Client sends any message/reply
  - Friend sends clarification message
  - Friend confirms accept/reject action
- **Reject action:**
  - Immediately expires/clears request (no 7-day wait)
  - Sends rejection email to client
  - Request moves to "Rejected" status immediately

**Status Flow:**
- New → Active (first message or clarification)
- Active → Expired (7 days with no activity) → Auto-reject with default message
- Active → Rejected (friend clicks reject) → Immediate expiration
- Active → Accepted (friend accepts and generates payment link)
- Accepted → Paid (client completes payment)

### 10. Master Password (Emergency Only)
- **Purpose:** Password reset for friend's account if she gets locked out
- **Important:** This is ONLY for account recovery, NOT for ongoing business control
- **Implementation:** Master password validates → shows password reset form → friend sets new password → no session access granted

## SEO Requirements

**Goal:** Make Azure Hollow easily discoverable through search engines

**Essential Elements:**
- Meta tags (title, description) on all pages
- Semantic HTML structure (H1, H2, H3 hierarchy)
- Alt text on all images
- Clean, descriptive URLs
- Structured data (Schema.org) for business/service
- Sitemap.xml and robots.txt
- Mobile-optimized (already planned)
- Fast page load times
- HTTPS/SSL (required for payments)

**Content Strategy:**
- Natural keyword usage in headings and content
- Target: "tarot reading", "online tarot reading", "virtual tarot reading"
- Include keywords in package descriptions, About section
- FAQ section (adds content, targets question-based searches)

**Technical Implementation:**
- SEO meta tags component/library
- Generate sitemap dynamically or static
- Configure robots.txt to allow public pages, block admin
- Submit to Google Search Console after launch
- Set up Google Analytics for tracking

**See:** `SEO_REQUIREMENTS.md` for detailed SEO specifications

## Technical Features (Portfolio Value)

### Security & Token System
- One-time-use token generation
- Token expiration: 7 days
- Slot reservation: 24 hours (held for payment after friend accepts)
- Secure payment link tied to token
- Prevents link sharing/abuse
- Slot availability validation on payment attempt
- Failure page for expired reservations
- Master password for emergency account recovery

### Admin Dashboard
- View pending requests
- Calendar interface for time selection
- Approve/decline requests with optional messages
- Generate payment links
- View completed bookings
- Filter by status

### Workflow Automation
- Email notifications for new requests (to friend)
- Automated payment link emails (to client)
- Payment confirmation emails (to both)
- Email conversation system (bidirectional)
- Optional session reminders

### Database Design (Initial Thoughts)
- `contact_requests` table (submission data, status, preferred_times array)
- `messages` table (email conversations, linked to requests, sender, timestamp, content)
- `booked_sessions` table (confirmed paid sessions with dates/times)
- `availability_slots` table (friend's marked available times - date, start_time)
- `tokens` table (one-time payment links, expiration [7 days], linked to request and confirmed time, created_at for 24-hour reservation calculation)
- `reserved_slots` table (temporary reservations - slot, expiration time [24 hours], linked to token)
- `payments` table (Stripe payment records, linked to token)
- `packages` table (30-min, 60-min, etc. with durations/prices)
- `users` table (friend's account + master password hash)

## Calendar & Availability System Design

### Core Principle: Opt-In Availability
- **Everything unavailable by default** - friend must mark times as available
- If friend stops using site, nothing is bookable (secure default)
- Friend marks individual time slots, not entire days typically

### Availability Management (Admin)

**Interface:**
- Calendar grid: Days × 30-minute time slots
- Shows current month + 3 months ahead (fixed range)
- Click individual slots to toggle available/unavailable
- Visual feedback: Available = highlighted/green, Unavailable = gray/unmarked
- Simple toggle interface - no bulk selection initially (can add later if needed)

**Data Model:**
- Friend marks specific date + time slot combinations
- Each slot is 30 minutes (e.g., 6:00-6:30, 6:30-7:00)
- Stored as availability records (date, start_time)

### Contact Form Calendar (Client Side)

**Flow:**
1. Client selects package first (determines slot duration)
2. Calendar appears showing only dates where friend has marked availability
3. Client clicks a date → time slot buttons appear for that package length
   - 30-min package → buttons: "6:00-6:30", "6:30-7:00", etc.
   - 60-min package → buttons: "6:00-7:00", "7:00-8:00", etc.
4. Client clicks time slot buttons to select (multiple selections allowed)
5. Can select slots across multiple dates
6. Selected slots visually highlighted
7. Summary shown before submit

**Key Features:**
- Only shows dates/times friend has marked as available
- No grayed-out dates - if it appears, it's bookable
- If no availability marked, calendar shows empty state
- Time slots automatically sized to package duration

### Admin Request Review Calendar

**When friend clicks "Accept" on a request:**
- Modal opens with calendar view
- Shows full calendar (current month + 3 months)
- Client's selected time slots highlighted/clickable (green)
- Already booked slots grayed out/disabled
- Friend clicks one of client's highlighted slots → confirms that time
- Time is locked in for payment link

### Time Slot Logic

**Slot Duration:**
- All slots based on 30-minute increments
- Package duration determines how many slots client can book
- Example: 60-min package = client books two 30-min slots (e.g., 6:00-6:30 + 6:30-7:00)

**Conflict Prevention:**
- When 60-min package booked at 6:00pm → blocks 6:00-7:00pm
- Any overlapping slots automatically disabled
- Overlap calculation: `(start1 < end2) && (start2 < end1)`
- Back-to-back sessions allowed (no buffer required by default)

### Calendar Component Reuse

**Same calendar component used for:**
- Client contact form (read-only, shows availability)
- Admin availability management (toggle to mark available)
- Admin request review (shows client selections, click to accept)

## Open Questions / Decisions Needed

1. **Package Structure:**
   - **Status:** Durations confirmed, names/prices/descriptions TBD
   - **Confirmed Durations:** 30 minutes, 60 minutes, 90 minutes (1.5 hours)
   - **Design Requirement:** System must be flexible for friend to add/edit/remove packages easily
   - **What we need:** Package management interface in admin (simple CRUD)
   - **What friend will decide:** Package names, prices, descriptions for each duration

2. **Availability Configuration:**
   - **Status:** DECIDED - Friend marks individual slots, opt-in model
   - **Range:** 3 months ahead from current month (configurable if needed)
   - **Future Enhancement:** Bulk selection features if needed

3. **Token & Slot Reservation:**
   - **Status:** DECIDED
   - Token expiration: 7 days
   - Slot reservation: 24 hours (held after friend accepts)
   - Failure page for expired reservations (slot taken by someone else)

4. **Default Messages:**
   - What should default accept message say?
   - What should default reject message say?

5. **Post-Payment:**
   - What information is sent in confirmation emails?
   - Is there any follow-up automation needed?

6. **Site Content & Styling:**
   - About page content (to be provided by friend)
   - Practice description (to be provided by friend)
   - Styling preferences (colors, aesthetic - to be discussed with friend)
   - **Design Requirement:** Make content easily editable through admin or config files

## Content Management Strategy

**Friend's Input Needed:**
- About page: Her story, background, how she got into tarot
- Practice description: What she offers, her approach, specialties
- Site copy: Any messaging, taglines, descriptions
- Styling preferences: Colors, mood, aesthetic direction

**Design Approach:**
- Separate content files or admin content editor for easy updates
- Theme system that supports styling changes without code modifications
- Make it easy for friend to update text without touching technical systems

## Portfolio Positioning

This project demonstrates:
- **Understanding Real User Needs:** Not just technical features, but respecting boundaries and work style
- **Design Flexibility:** Configurable system for business decisions (packages, content, styling) while hiding technical complexity
- **Separation of Concerns:** Business logic editable by client, technical workflows automated
- **Security Planning:** Token system, payment protection, emergency recovery
- **UX Design:** Simplifying complex workflows for technophobic users
- **Business Logic:** Workflow design, conflict prevention, edge case handling
- **Problem-Solving:** Client proposes → friend chooses → they confirm → payment locks it
- **Content Management Strategy:** Making the right things editable while protecting the wrong things from user error

Aligns with portfolio narrative of "Self-Directed Achiever" who solves business problems, not just technical ones.

## Project Context

- **Timeline:** Flexible - building before showing friend (surprise gift)
- **Availability:** Flexible - working on projects based on interest
- **Goal:** Portfolio-worthy piece + real business solution

