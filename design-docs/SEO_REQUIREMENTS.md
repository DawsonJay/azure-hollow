# SEO Requirements - Making Azure Hollow Easy to Find

**Last Updated:** 2025-10-31-2132 (GMT/UTC)

## Goal
Make Azure Hollow easily discoverable through search engines for people looking for tarot readings.

---

## Essential SEO Elements

### 1. Meta Tags (Page Head)
**Required for every page:**
- `<title>` - Unique, descriptive title (50-60 characters)
- `<meta name="description">` - Compelling description (150-160 characters)
- `<meta name="keywords">` - Relevant keywords (optional but helpful)

**Landing Page Example:**
```html
<title>Azure Hollow - Personal Tarot Readings with Jessica Rose</title>
<meta name="description" content="Professional tarot readings via Zoom. Book a 30, 60, or 90-minute session with Jessica Rose. Get guidance on relationships, career, and life questions.">
```

**Other Pages:**
- Order page: Include package name and duration
- Payment pages: Keep concise but descriptive
- Admin pages: Can be simpler (not public-facing SEO critical)

---

### 2. Semantic HTML Structure
**Use proper heading hierarchy:**
- `<h1>` - One per page (main heading)
- `<h2>` - Section headings (Packages, How It Works, About)
- `<h3>` - Subsections

**Landing Page Structure:**
```html
<h1>Azure Hollow</h1>
<h2>Tarot Readings with Jessica Rose</h2>
<h2>Packages</h2>
<h3>Quick Reading - 30 Minutes</h3>
<h2>How It Works</h2>
<h2>About Jessica</h2>
```

---

### 3. Alt Text for Images
**All images need descriptive alt text:**
- Hero image: Alt text describing the image
- Package icons: "Quick Reading - 30 minute tarot session"
- About section photos: Descriptive alt text

---

### 4. URL Structure
**Clean, descriptive URLs:**
- `/` - Landing page
- `/order/quick-reading` - Order pages with package slugs
- `/pay/[token]` - Payment (token-based, not SEO critical)
- `/order-confirmed` - Confirmation page

**Use slugs instead of IDs where possible:**
- `/order/quick-reading` not `/order/1`
- Makes URLs shareable and descriptive

---

### 5. Structured Data (Schema.org)
**Add JSON-LD structured data for:**
- Business/LocalBusiness schema
- Service schema (tarot readings)
- Review/Rating schema (when testimonials added)
- Event/Appointment schema

**Example Business Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Azure Hollow",
  "provider": {
    "@type": "Person",
    "name": "Jessica Rose"
  },
  "description": "Personal tarot readings via Zoom",
  "serviceType": "Tarot Reading"
}
```

---

## Content SEO Best Practices

### 1. Keyword Targeting
**Primary Keywords:**
- tarot reading
- online tarot reading
- tarot reading [city/region] (if relevant)
- tarot reader
- virtual tarot reading
- Zoom tarot reading

**Long-tail Keywords:**
- 30 minute tarot reading
- relationship tarot reading
- career tarot reading
- personal tarot reading online

**Content Strategy:**
- Use keywords naturally in headings and content
- Include in package descriptions
- Use in About section
- Don't keyword stuff - write naturally

---

### 2. Content Depth
**Landing Page Should Include:**
- Service description (what tarot readings are)
- Packages clearly explained
- Process explanation
- About section (builds trust, includes keywords naturally)
- FAQ section (adds content, targets question-based searches)

---

### 3. Internal Linking
**Link structure:**
- Packages link to order pages
- Order pages link back to landing
- Consistent navigation

---

### 4. Mobile Optimization
**Already planned (mobile-first design):**
- Fast loading
- Responsive design
- Touch-friendly
- Google prioritizes mobile-friendly sites

---

## Technical SEO

### 1. Page Speed
**Optimize for speed:**
- Compress images
- Minimize CSS/JS
- Use CDN if needed
- Fast hosting

---

### 2. Sitemap.xml
**Create and submit:**
- List all public pages
- Update when new content added
- Submit to Google Search Console

---

### 3. Robots.txt
**Configure:**
- Allow search engines to crawl public pages
- Block admin pages (`/admin/*`)
- Block payment token pages

**Example:**
```
User-agent: *
Allow: /
Allow: /order/*
Disallow: /admin/
Disallow: /pay/
```

---

### 4. SSL/HTTPS
**Required:**
- All pages must be HTTPS
- Required for payment processing anyway
- Google ranking factor

---

## Local SEO (If Applicable)

**If Jessica wants to target local clients:**
- Add location in business schema
- Mention service area in About section
- Google Business Profile (if applicable)

**For now:** Focus on online/remote readings (Zoom-based)

---

## Content Strategy for SEO

### Landing Page Content Checklist:
- ✅ Descriptive title and meta description
- ✅ H1 with business name
- ✅ H2 sections with keywords naturally included
- ✅ Package descriptions (include "tarot reading", duration, etc.)
- ✅ About section (mentions service, experience)
- ✅ How It Works (includes "online", "Zoom", etc.)
- ✅ FAQ section (targets question searches)

### Order Page Content:
- ✅ Package-specific title and description
- ✅ Clear service description
- ✅ Call-to-action

---

## Tools & Setup

### 1. Google Search Console
**Set up after launch:**
- Verify site ownership
- Submit sitemap
- Monitor search performance
- Fix any crawl errors

### 2. Google Analytics
**Track:**
- How people find the site
- Which pages perform best
- User behavior
- Conversion tracking (bookings)

### 3. Meta Tags Generator
**Tool to ensure proper lengths:**
- Title: 50-60 characters
- Description: 150-160 characters
- Preview how it looks in search results

---

## Ongoing SEO

### 1. Content Updates
- Add testimonials (fresh content, builds trust)
- Expand FAQ based on real questions
- Blog posts (optional): Tarot tips, reading guides, etc.

### 2. Backlinks (Long-term)
- Social media sharing
- Directory listings (tarot directories, if any)
- Client testimonials on external sites

### 3. Monitor & Adjust
- Track which keywords bring traffic
- Adjust content based on search performance
- Update meta descriptions if needed

---

## MVP SEO Checklist

**Must Have for Launch:**
- [ ] Unique title tags on all pages
- [ ] Meta descriptions on all pages
- [ ] Proper heading hierarchy (H1, H2, H3)
- [ ] Alt text on all images
- [ ] Clean URL structure
- [ ] SSL/HTTPS enabled
- [ ] Mobile-responsive design
- [ ] Fast page load times
- [ ] Robots.txt configured
- [ ] Sitemap.xml created

**Nice to Have:**
- [ ] Structured data (Schema.org)
- [ ] Google Search Console setup
- [ ] Google Analytics setup
- [ ] FAQ section (adds content)

---

## Keywords to Naturally Include

**In package descriptions:**
- "tarot reading"
- "online tarot reading"
- "personal tarot reading"
- Duration (30, 60, 90 minutes)

**In About section:**
- "tarot reader"
- "tarot readings"
- Years of experience
- Areas of focus (relationships, career, etc.)

**In How It Works:**
- "Zoom tarot reading"
- "virtual tarot session"
- "online booking"

---

## Notes

- **Don't sacrifice UX for SEO** - Write for humans first
- **Natural keyword usage** - No keyword stuffing
- **Quality content** - Better than trying to game the system
- **Mobile-first** - Already planned, good for SEO
- **Fast loading** - Important ranking factor
- **Secure (HTTPS)** - Required for payments anyway

**Focus:** Make it easy for people searching "tarot reading" or "online tarot reading" to find Azure Hollow.

