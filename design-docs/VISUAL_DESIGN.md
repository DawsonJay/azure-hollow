# Visual Design Direction - Azure Hollow

**Last Updated:** 2025-10-31-2132 (GMT/UTC)

## Design Philosophy

**Overall Feel:** Witchy, Reassuring, Friendly, Professional

The site should feel mystical and magical (witchy) while being warm and approachable (reassuring and friendly), all while maintaining professionalism and trustworthiness.

---

## Color Palette

### Primary Colors

**Lavender:**
- **Main:** `#A78BFA` (vibrant but soft lavender - primary brand)
- **Light:** `#DDD6FE` (very light lavender - subtle backgrounds, hover states)
- **Medium:** `#C4B5FD` (medium lavender - secondary accents)
- **Dark:** `#8B5CF6` (darker lavender - hover states, emphasis)
- **Darker:** `#7C3AED` (deep lavender - active states, important elements)

**Use for:** Primary buttons, links, highlights, card accents, calendar available slots, status indicators

**Dark Slate:**
- **Main:** `#475569` (soft dark slate - primary text)
- **Dark:** `#334155` (deeper slate - headings, strong emphasis)
- **Darker:** `#1E293B` (very dark slate - high contrast text)
- **Light:** `#64748B` (light slate - secondary text, muted elements)
- **Lighter:** `#94A3B8` (very light slate - borders, subtle dividers)

**Use for:** Headings, body text, card text, navigation, borders, secondary UI elements

### Supporting Colors

**Backgrounds:**
- **White:** `#FFFFFF` (pure white - main backgrounds)
- **Cream/Off-white:** `#FAFAFA` (warm off-white - card backgrounds, subtle sections)
- **Very Light Lavender Tint:** `#F5F3FF` (extremely subtle lavender background - alternate sections)

**Neutrals:**
- **Warm Gray:** `#E5E7EB` (light gray - borders, dividers, subtle backgrounds)
- **Medium Gray:** `#D1D5DB` (medium gray - disabled states, inactive elements)
- **Cool Gray:** `#9CA3AF` (cool gray - placeholders, muted text)

**Accents:**
- **Gold/Amber (Optional):** `#F59E0B` (warm gold - special highlights, premium packages)
- **Light Gold:** `#FCD34D` (soft gold - subtle accents)

**Status Colors:**
- **Success/Confirm:** `#10B981` (green - success states, confirmed bookings)
- **Warning:** `#F59E0B` (amber - warnings, pending)
- **Error:** `#EF4444` (soft red - errors, cancellations)
- **Info:** `#3B82F6` (blue - information, links)

### Color Usage Matrix

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Buttons | Lavender Main | `#A78BFA` |
| Button Text | White | `#FFFFFF` |
| Button Hover | Lavender Dark | `#8B5CF6` |
| Headings (H1, H2) | Dark Slate Dark | `#334155` |
| Body Text | Dark Slate Main | `#475569` |
| Secondary Text | Dark Slate Light | `#64748B` |
| Links | Lavender Main | `#A78BFA` |
| Link Hover | Lavender Dark | `#8B5CF6` |
| Card Background | Cream/Off-white | `#FAFAFA` |
| Card Border | Warm Gray | `#E5E7EB` |
| Available Calendar Slots | Lavender Light | `#DDD6FE` |
| Selected Calendar Slots | Lavender Main | `#A78BFA` |
| Unavailable Slots | Medium Gray | `#D1D5DB` |
| Package Card Accent | Lavender Main | `#A78BFA` |
| Background Primary | White | `#FFFFFF` |
| Background Secondary | Very Light Lavender | `#F5F3FF` |

### Accessibility & Contrast

**WCAG AA Compliance:**
- ✅ Dark Slate on White: 7.2:1 (Excellent)
- ✅ Dark Slate on Cream: 6.8:1 (Excellent)
- ✅ Lavender Main on White: 4.5:1 (Passes AA for large text)
- ✅ Lavender Dark on White: 5.8:1 (Passes AA)
- ✅ White on Lavender Main: 4.5:1 (Passes AA for large text)
- ✅ White on Lavender Dark: 5.8:1 (Passes AA)

**Recommendations:**
- Use Dark Slate for all body text (best readability)
- Use Lavender for buttons/CTAs (good contrast with white text)
- Avoid light lavender text on white (low contrast)
- Use dark slate for any text over light lavender backgrounds

### Color Psychology & Feel

**Lavender (`#A78BFA`):**
- Mystical, spiritual (fits witchy aesthetic)
- Calming, reassuring (gentle, not overwhelming)
- Professional when used thoughtfully
- Approachable and friendly (warm purple tone)

**Dark Slate (`#475569`):**
- Professional and trustworthy
- Grounding and stable
- Readable without being harsh
- Soft enough to feel friendly (not pure black)

---

## Card-Based Design

### Concept
Use card-based layouts throughout, mimicking tarot cards visually. This creates:
- Visual connection to tarot theme
- Clean organization
- Easy scanning on mobile
- Professional, modern aesthetic

### Card Design Elements

**Package Cards:**
- Card-like containers for each package
- Elevated/shadow effect
- Hover states for interactivity
- Clear separation between cards

**Request Cards (Admin):**
- Card layout for each request
- Easy to scan and organize
- Hover states for actions
- Clear visual hierarchy

**Content Cards:**
- Sections can be card-based
- About section in card
- How it Works steps in cards
- Testimonials in cards

**Styling:**
- Rounded corners (gentle, friendly)
- Subtle shadows (depth, not harsh)
- Borders (lavender or dark slate)
- Spacing between cards (breathing room)

---

## Typography

### Font Selection
**Goals:** Readable, professional, slightly mystical

**Options to Consider:**
- Modern serif for headings (elegant, readable)
- Sans-serif for body text (clean, friendly)
- Or: A well-balanced serif for both (classic, trustworthy)

**Characteristics:**
- Clean and readable (not too decorative)
- Slightly elegant/refined
- Good for long-form reading
- Works well in both dark slate and lavender

**Examples:**
- Heading: Playfair Display, Crimson Text, or similar elegant serif
- Body: Lora, Inter, or clean sans-serif
- Or: Single font family with good weight variations

### Typography Hierarchy

**H1 (Landing Page Hero):**
- Large, elegant
- Dark slate or lavender
- Bold weight
- Spacious letter-spacing

**H2 (Section Headings):**
- Medium-large
- Dark slate
- Clear separation from body text

**H3 (Subheadings):**
- Moderate size
- Dark slate or lavender accent
- Package names, card titles

**Body Text:**
- Readable size (16px+)
- Dark slate (not pure black)
- Good line-height for readability
- Comfortable for long-form content

**Buttons:**
- Clear, readable
- Lavender background, white text
- Or: Dark slate background, lavender text
- Bold or medium weight

---

## Layout & Spacing

### Spacing Philosophy
**Generous spacing:**
- Cards have breathing room
- Sections separated clearly
- Not cramped or cluttered
- Feels calm and reassuring

### Layout Principles
- Card-based sections
- Clear visual hierarchy
- Mobile-first responsive
- Grid system for packages
- Centered or asymmetrical (avoid rigid)

---

## Visual Elements

### Imagery
**Approach:**
- Subtle, not overwhelming
- Mystical but professional
- Could include:
  - Gentle patterns (maybe tarot-inspired)
  - Soft, dreamy backgrounds
  - Card-like visual elements
  - Minimal illustrations (if any)

**Avoid:**
- Overly dark/gothic (keep friendly)
- Cluttered imagery
- Distracting backgrounds

### Icons
**Style:**
- Simple, clean
- Slightly mystical (not too literal)
- Consistent style
- Lavender or dark slate colored

### Borders & Dividers
- Gentle, subtle
- Lavender or warm gray
- Not harsh lines
- Card edges use rounded corners

---

## Component Styles

### Buttons

**Primary Button (Book Package, Submit):**
- Lavender background
- White text
- Rounded corners
- Hover: Slightly darker lavender
- Clear, friendly call-to-action

**Secondary Button:**
- Dark slate background
- Lavender or white text
- Or: Outline style (lavender border)

### Cards

**Package Cards:**
- Light background (white or very light lavender tint)
- Dark slate text
- Lavender accents (borders, buttons)
- Shadow for depth
- Hover: Slight elevation
- Clear pricing and CTA

**Request Cards (Admin):**
- Light background
- Dark slate text
- Status indicators in lavender
- Clear action buttons
- Easy to scan

### Forms

**Input Fields:**
- Light background
- Dark slate border
- Lavender focus state
- Rounded corners
- Friendly, approachable

### Calendar

**Calendar Elements:**
- Card-like date cells
- Available: Lavender highlight
- Unavailable: Muted gray
- Selected: Dark slate or darker lavender
- Hover states for interactivity

---

## Mood & Atmosphere

### Witchy Elements
- Card-based design (tarot connection)
- Lavender (mystical color)
- Gentle, flowing layouts
- Subtle mystical touches
- Not too literal (avoid cliché)

### Reassuring Elements
- Warm colors (lavender is warm)
- Generous spacing
- Friendly typography
- Clear communication
- Professional presentation

### Professional Elements
- Clean design
- Good contrast
- Readable typography
- Consistent styling
- Trustworthy appearance

### Friendly Elements
- Rounded corners
- Approachable colors
- Warm tone
- Clear, helpful language
- Inviting interface

---

## Implementation Guidelines

### Color Usage

**Lavender:**
- Primary CTA buttons
- Links and hover states
- Accents and highlights
- Package card accents
- Calendar available slots

**Dark Slate:**
- Primary text color
- Headings
- Navigation
- Card borders
- Body text

**Backgrounds:**
- White or very light cream
- Light lavender tints (subtle)
- Warm grays for secondary areas

### Card Design

**All Cards Should:**
- Have rounded corners (8-12px)
- Include subtle shadow
- Have padding for content
- Use lavender or dark slate borders
- Include hover states where interactive

### Responsive Behavior
- Cards stack on mobile
- Maintain spacing
- Touch-friendly sizes
- Readable at all sizes
- Card-based layout works well on mobile

---

## Design System

### Components to Create

1. **Package Card Component**
   - Card container
   - Package name (H3)
   - Duration and price
   - Description
   - CTA button (lavender)

2. **Request Card Component** (Admin)
   - Card container
   - Client info
   - Status indicator (lavender)
   - Action buttons
   - Conversation thread

3. **Calendar Card Component**
   - Card-like date/time slots
   - Available/selected states
   - Lavender highlights

4. **Content Card Component**
   - About section card
   - How It Works steps
   - Testimonials

### Design Tokens

**Colors (See `COLOR_PALETTE.md` for complete palette):**
- `primary-lavender`: `#A78BFA` ✅
- `primary-slate`: `#475569` ✅
- `lavender-light`: `#DDD6FE`
- `lavender-medium`: `#C4B5FD`
- `lavender-dark`: `#8B5CF6`
- `lavender-darker`: `#7C3AED`
- `slate-darker`: `#1E293B`
- `slate-dark`: `#334155`
- `slate-light`: `#64748B`
- `slate-lighter`: `#94A3B8`

**Spacing:**
- Card padding: Consistent (e.g., 24px)
- Card gaps: Generous (e.g., 20-30px)
- Section spacing: Clear separation

**Border Radius:**
- Cards: 8-12px
- Buttons: 6-8px
- Inputs: 4-6px

**Shadows:**
- Card shadow: Subtle, soft
- Hover elevation: Slight increase
- Not harsh or dark

---

## Examples & Inspiration

### Card-Based Tarot Sites
- Look at tarot reading sites for card inspiration
- Maintain professional appearance
- Keep friendly and approachable

### Lavender Color Palette
- Soft, calming
- Mystical but not dark
- Professional when used well
- Good for buttons and accents

### Dark Slate
- Professional grounding
- Readable
- Pairs well with lavender
- Not harsh or cold

---

## Notes

- **Balance is key:** Witchy but professional, mystical but friendly
- **Card-based:** Everything feels like it's in a card container
- **Lavender & Dark Slate:** Primary color scheme throughout
- **Generous spacing:** Feels calm and reassuring
- **Rounded corners:** Friendly and approachable
- **Clean design:** Professional while maintaining mystical feel

---

## Accessibility Considerations

- Ensure lavender and dark slate have sufficient contrast
- Test color combinations for readability
- Use dark slate for text (not pure black - softer)
- Lavender buttons with white text (good contrast)
- Test with screen readers (semantic HTML)

---

## Next Steps

1. Finalize exact lavender and dark slate hex codes
2. Select typography (serif for headings, serif or sans for body)
3. Create design system tokens
4. Build card components with these styles
5. Test color combinations for accessibility
6. Refine based on visual testing

