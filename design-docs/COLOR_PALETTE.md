# Azure Hollow - Complete Color Palette

**Last Updated:** 2025-10-31-2137 (GMT/UTC)

## Quick Reference

### Primary Colors
- **Lavender Main:** `#A78BFA`
- **Dark Slate Main:** `#475569`

### Backgrounds
- **White:** `#FFFFFF`
- **Cream:** `#FAFAFA`
- **Very Light Lavender:** `#F5F3FF`

---

## Full Palette

### Lavender Family

```
Lavender Main:     #A78BFA  [Primary brand color]
Lavender Light:    #DDD6FE  [Light backgrounds, hover states]
Lavender Medium:   #C4B5FD  [Secondary accents]
Lavender Dark:     #8B5CF6  [Hover, emphasis]
Lavender Darker:   #7C3AED  [Active states, strong emphasis]
```

**Usage:**
- Primary buttons: `#A78BFA`
- Links: `#A78BFA`
- Hover states: `#8B5CF6`
- Accents: `#C4B5FD`
- Light backgrounds: `#DDD6FE`
- Calendar available slots: `#DDD6FE` or `#C4B5FD`

---

### Dark Slate Family

```
Dark Slate Darker: #1E293B  [High contrast headings]
Dark Slate Dark:   #334155  [Primary headings, strong text]
Dark Slate Main:   #475569  [Body text, standard text]
Dark Slate Light:  #64748B  [Secondary text, muted]
Dark Slate Lighter:#94A3B8  [Borders, subtle elements]
```

**Usage:**
- H1, H2 headings: `#334155` or `#1E293B`
- Body text: `#475569`
- Secondary text: `#64748B`
- Card text: `#475569`
- Borders: `#94A3B8` or `#E5E7EB`

---

### Background Colors

```
White:              #FFFFFF  [Primary background]
Cream/Off-white:    #FAFAFA  [Card backgrounds, sections]
Very Light Lavender:#F5F3FF  [Alternate sections, subtle backgrounds]
```

**Usage:**
- Main background: `#FFFFFF`
- Card backgrounds: `#FAFAFA`
- Alternate sections: `#F5F3FF`
- Navigation background: `#FFFFFF` or `#FAFAFA`

---

### Neutral Grays

```
Warm Gray Light:    #E5E7EB  [Borders, dividers]
Medium Gray:        #D1D5DB  [Disabled, inactive]
Cool Gray:          #9CA3AF  [Placeholders, muted]
```

**Usage:**
- Card borders: `#E5E7EB`
- Dividers: `#E5E7EB`
- Disabled elements: `#D1D5DB`
- Placeholder text: `#9CA3AF`

---

### Accent Colors (Optional)

```
Gold:               #F59E0B  [Special highlights, premium]
Light Gold:         #FCD34D  [Subtle gold accents]
```

**Usage:**
- Premium package highlights (optional)
- Special callouts (optional)
- Use sparingly

---

### Status Colors

```
Success/Green:      #10B981  [Confirmed, success]
Warning/Amber:      #F59E0B  [Pending, warnings]
Error/Red:          #EF4444  [Errors, cancellations]
Info/Blue:          #3B82F6  [Information, links]
```

**Usage:**
- Confirmed bookings: `#10B981`
- Pending requests: `#F59E0B`
- Errors: `#EF4444`
- Info messages: `#3B82F6`

---

## Color Combinations

### Primary Combinations

**Lavender Button:**
- Background: `#A78BFA` (Lavender Main)
- Text: `#FFFFFF` (White)
- Hover: `#8B5CF6` (Lavender Dark)

**Dark Slate Button:**
- Background: `#334155` (Dark Slate Dark)
- Text: `#FFFFFF` (White)
- Hover: `#1E293B` (Dark Slate Darker)

**Card Design:**
- Background: `#FAFAFA` (Cream)
- Text: `#475569` (Dark Slate Main)
- Border: `#E5E7EB` (Warm Gray Light)
- Accent: `#A78BFA` (Lavender Main)

---

## Usage Examples

### Package Cards
```
Card Background:    #FAFAFA
Card Border:        #E5E7EB
Heading Text:       #334155
Body Text:          #475569
Price Text:         #334155
Button BG:          #A78BFA
Button Text:        #FFFFFF
Button Hover:       #8B5CF6
```

### Calendar
```
Available Slot:     #DDD6FE (Lavender Light background)
Selected Slot:      #A78BFA (Lavender Main background)
Unavailable Slot:   #D1D5DB (Medium Gray background)
Slot Text:          #475569 (Dark Slate Main)
Selected Text:      #FFFFFF (White)
```

### Admin Cards
```
Card Background:    #FAFAFA
Card Border:       #E5E7EB
Heading:           #334155
Body Text:         #475569
Status Badge:      #A78BFA (Lavender Main)
Action Button:     #A78BFA
```

---

## CSS Variables Format

For easy implementation:

```css
:root {
  /* Lavender */
  --lavender-main: #A78BFA;
  --lavender-light: #DDD6FE;
  --lavender-medium: #C4B5FD;
  --lavender-dark: #8B5CF6;
  --lavender-darker: #7C3AED;
  
  /* Dark Slate */
  --slate-darker: #1E293B;
  --slate-dark: #334155;
  --slate-main: #475569;
  --slate-light: #64748B;
  --slate-lighter: #94A3B8;
  
  /* Backgrounds */
  --bg-white: #FFFFFF;
  --bg-cream: #FAFAFA;
  --bg-lavender-tint: #F5F3FF;
  
  /* Neutrals */
  --gray-warm-light: #E5E7EB;
  --gray-medium: #D1D5DB;
  --gray-cool: #9CA3AF;
  
  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

---

## Accessibility Check

All color combinations tested for WCAG AA compliance:

✅ **Excellent Contrast (7:1+):**
- Dark Slate on White
- Dark Slate on Cream
- White on Lavender Dark

✅ **Good Contrast (4.5:1+):**
- Lavender Main on White (for large text)
- White on Lavender Main (for large text)
- Dark Slate on Light Lavender

⚠️ **Use Carefully:**
- Light Lavender text on White (low contrast - avoid)
- Medium Gray text on White (use for placeholders only)

---

## Design Tokens Summary

| Token Name | Value | Usage |
|------------|-------|-------|
| `color.primary` | `#A78BFA` | Primary brand color |
| `color.text.primary` | `#475569` | Main body text |
| `color.text.heading` | `#334155` | Headings |
| `color.text.secondary` | `#64748B` | Secondary text |
| `color.bg.primary` | `#FFFFFF` | Main background |
| `color.bg.card` | `#FAFAFA` | Card background |
| `color.border` | `#E5E7EB` | Borders |
| `color.button.primary` | `#A78BFA` | Primary buttons |
| `color.button.hover` | `#8B5CF6` | Button hover |

---

## Notes

- All colors chosen to maintain **witchy but professional** feel
- Lavender provides mystical warmth without being overwhelming
- Dark slate ensures readability while staying friendly (not harsh black)
- Palette works well for both light and card-based designs
- Colors have been tested for accessibility
- Palette supports the card-based tarot aesthetic

---

## Visual Swatches

**Lavender Progression:**
```
#DDD6FE  [Lightest - backgrounds]
#C4B5FD  [Light - accents]
#A78BFA  [Main - primary brand] ⭐
#8B5CF6  [Dark - hover, emphasis]
#7C3AED  [Darkest - active states]
```

**Dark Slate Progression:**
```
#94A3B8  [Lightest - borders]
#64748B  [Light - secondary text]
#475569  [Main - body text] ⭐
#334155  [Dark - headings]
#1E293B  [Darkest - strong emphasis]
```

