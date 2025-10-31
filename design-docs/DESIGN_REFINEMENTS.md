# Design Refinements & Proposals

**Last Updated:** 2025-10-31-1944 (GMT/UTC)

## Refinement Areas

This document contains concrete proposals for refining the design. We'll work through these systematically.

---

## 1. Contact Form - Availability Input

### Proposal: Calendar Picker with Multi-Selection

**Client Experience:**
- Calendar widget showing current month + next month
- Click dates to select/deselect
- For each selected date, time picker appears (e.g., "What times work on Dec 15?")
- Time slots shown (e.g., 10am, 11am, 2pm, 6pm, 7pm, 8pm)
- Can select multiple dates with multiple times each
- Shows selected dates/times in summary before submit

**Alternative Simpler Option:**
- Text-based: "Available dates/times" textarea
- Simple format: "Dec 15 - 6pm, 7pm, 8pm | Dec 16 - 2pm, 3pm"
- Less polished but easier to implement

**Recommendation:** Start with text-based for MVP, upgrade to calendar picker if needed.

**Data Storage:**
```json
{
  "preferred_times": [
    {"date": "2025-12-15", "times": ["18:00", "19:00", "20:00"]},
    {"date": "2025-12-16", "times": ["14:00", "15:00"]}
  ]
}
```

**Questions:**
- Should we validate times are in the future?
- Should we limit how far in advance clients can request?
- Should times be freeform or suggested slots?

---

## 2. Time Slot Blocking Logic

### Proposal: Duration-Based Blocking

**When a 60-minute package is booked at 6:00pm:**
- Block time slot: 6:00pm - 7:00pm
- Any package that would overlap is disabled
- Example conflicts:
  - Another 60-min at 6:30pm ❌ (overlaps 6:00-7:00)
  - 30-min at 6:30pm ❌ (overlaps)
  - 30-min at 5:30pm ✅ (ends at 6:00pm, no overlap)
  - 30-min at 7:00pm ✅ (starts when previous ends)

**Edge Cases:**
- Back-to-back sessions: 6:00-7:00pm and 7:00-8:00pm ✅ (no buffer needed)
- Buffer time? Optional setting for friend to add buffer between sessions

**Implementation:**
- When checking availability, calculate: `start_time + duration`
- Check all booked sessions for overlaps
- Overlap = `(start1 < end2) && (start2 < end1)`

**Questions:**
- Should friend be able to set buffer time between sessions? (e.g., 15 min break)
- What if client offers a time that would conflict with an existing booking?

---

## 3. Calendar Interface (Admin)

### Proposal: Modal Calendar View

**When friend clicks "Accept" on a request:**
1. Modal opens showing calendar
2. Calendar shows:
   - **Current month view** (can navigate forward/back)
   - **Client's offered times** = highlighted in green/blue
   - **Already booked times** = grayed out/disabled
   - **Unavailable times** = grayed out/disabled
3. Click on one of client's highlighted times
4. That time slot becomes selected (border highlight)
5. Click "Confirm" → generates payment link with that time

**Visual Design:**
- Time slots shown as clickable boxes or grid
- Color coding:
  - Green = Client's offered time, available
  - Red = Conflict (client offered but friend unavailable/booked)
  - Gray = Not offered by client or unavailable
- Package duration shown when hovering/selecting

**Navigation:**
- Previous/Next month buttons
- Maybe show 2-3 months at once if needed
- Default to current month + 1 month ahead

**Questions:**
- Should calendar show weeks or just individual days with time slots?
- How granular? 15-min increments? 30-min? Hour blocks?

---

## 4. Unavailable Times Management

### Proposal: Two-Level System

**Level 1: Recurring Unavailable Times**
- Simple interface: "I'm unavailable every Tuesday evening"
- Or: "I'm unavailable weekdays 9am-5pm"
- Stored as rules, not individual times

**Level 2: One-Time Unavailable**
- Simple calendar: "Mark Dec 20 as unavailable"
- Or: "Mark Dec 20, 2pm-4pm as unavailable"

**Admin Interface:**
- Separate section: "Manage Availability"
- Calendar view where she can:
  - Click dates/times to mark unavailable
  - Set recurring rules (simple form)
  - See all marked unavailable times

**Questions:**
- Should this be on the same page as requests, or separate?
- How simple can we make recurring rules? (e.g., "Every Tuesday" vs full cron-like rules)

---

## 5. Email Templates & Messages

### Email 1: Contact Form Confirmation (to Client)
**Subject:** "Thank you for your tarot reading request"

**Content:**
```
Hi [Client Name],

Thank you for reaching out! I've received your request for a [Package Name] reading.

I'll review your request and get back to you within [timeframe] with next steps.

Best,
[Friend's Name]
```

### Email 2: Payment Link (to Client)
**Subject:** "Your tarot reading - Payment link"

**Content (Acceptance):**
```
Hi [Client Name],

I'd love to do a [Package Name] reading for you!

I've scheduled your session for:
Date: [Date]
Time: [Time]
Duration: [X minutes]

Please complete your payment using the link below to confirm your booking:
[Payment Link]

This link will expire in 7 days.

Looking forward to our session!
[Friend's Name]

P.S. [Custom message if friend added one]
```

**Content (Default if no custom message):**
Same as above, just remove the P.S. line.

### Email 3: Rejection (to Client)
**Subject:** "Regarding your tarot reading request"

**Content:**
```
Hi [Client Name],

Thank you for your interest in a reading. Unfortunately, I'm not able to accommodate your request at this time.

[Custom message if friend added one, otherwise:]

I appreciate your understanding and wish you well on your journey.

Best,
[Friend's Name]
```

### Email 4: Payment Confirmation (to Both)
**To Client:**
```
Hi [Client Name],

Your payment has been received! Your tarot reading is confirmed:

Date: [Date]
Time: [Time]
Duration: [X minutes]
Package: [Package Name]

[Zoom link or session details if needed]

See you then!
[Friend's Name]
```

**To Friend (Admin Notification):**
```
New payment received!

Client: [Client Name]
Email: [Client Email]
Date: [Date]
Time: [Time]
Package: [Package Name]
Amount: $[X]
```

### Default Messages (Admin Interface)

**Default Accept Message:**
"I'd love to do a reading for you! Please use the link below to complete your payment."

**Default Reject Message:**
"Thank you for your interest. Unfortunately, I'm not able to accommodate your request at this time."

**Questions:**
- Should friend be able to edit email templates?
- Should we support variables like {client_name}, {date}, {time}?

---

## 6. Post-Payment Flow

### Proposal: Automatic Confirmations

**Immediate Actions:**
1. Mark request as "Paid"
2. Create `booked_session` record
3. Mark time slot as booked in calendar
4. Send confirmation emails to both parties
5. Payment link token marked as used (can't be reused)

**Confirmation Email Contains:**
- Date and time
- Package details
- Duration
- Zoom link (if applicable)
- Any preparation notes (if friend wants to add these)

**Optional Follow-ups:**
- 24-hour reminder email (friend can toggle this)
- Day-of reminder (friend can toggle this)
- Post-session follow-up (optional)

**Admin View After Payment:**
- Request moves to "Paid" status
- Shows "Confirmed" badge
- Can view booking details
- Can cancel/reschedule if needed (with refund logic if needed)

**Questions:**
- Should friend be able to add Zoom links or session details when accepting?
- Should we integrate with Zoom API to auto-generate links?
- What about refunds? Manual process or automated?

---

## 7. Admin Interface Layout

### Proposal: Single-Page Design with Expandable Cards

**Layout:**
```
[Header: "Tarot Reading Requests"]
[Filters: All | Pending | Accepted | Paid | Completed]

[Request Card 1 - Pending]
├─ Client: Jane Doe (janedoe@email.com)
├─ Package: Full Reading (60 min)
├─ Submitted: Dec 1, 2025
├─ Message: "I'm looking for guidance on..."
├─ Preferred Times: Dec 15 - 6pm, 7pm | Dec 16 - 2pm
├─ [Reply] [Accept] [Reject]

[Request Card 2 - Paid]
├─ Client: John Smith
├─ Package: Quick Reading (30 min)
├─ Scheduled: Dec 20, 2025 at 6:00pm
├─ Status: ✅ Paid
└─ [View Details] [Cancel]
```

**When clicking "Accept":**
- Modal opens
- Shows client details
- Shows calendar with client's offered times
- Friend selects time
- Optional: Customize message (or use default)
- Click "Generate Payment Link"
- Modal closes, request moves to "Accepted" status

**When clicking "Reject":**
- Small modal or inline form
- Optional message textarea
- Checkbox: "Use default message"
- Click "Send Rejection"
- Request moves to "Rejected" status

**Questions:**
- Should cards be collapsible/expandable to save space?
- How many requests per page? Pagination?
- Should there be search functionality?
- Should there be bulk actions?

---

## 8. Token Expiration & Security

### Proposal: 14-Day Expiration

**Token Lifecycle:**
- Generated when friend accepts request
- Valid for 14 days
- After expiration, payment link shows "This link has expired"
- Friend can regenerate new token if needed

**Security Measures:**
- Tokens are long, random strings (32+ characters)
- One-time use only (marked as used after payment)
- Tied to specific request and time (can't be altered)
- Rate limiting on payment page

**Questions:**
- Is 14 days reasonable? Too long? Too short?
- Should expiration date be shown to client in email?
- What if client contacts friend saying link expired?

---

## Next Steps

These proposals are starting points. We can refine each area based on:
- Technical feasibility
- UX simplicity (for technophobic friend)
- Portfolio value (showcasing good design decisions)
- Real-world practicality

**Which areas should we refine first?**

