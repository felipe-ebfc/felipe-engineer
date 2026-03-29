# PRD: felipe.engineer

## Overview
Personal brand website for Felipe Engineer-Manriquez. Hub for professional identity, RSM training, testimonials, and EBFC ecosystem links.

**Live URL:** https://felipe.engineer
**Repo:** github.com/felipe-ebfc/felipe-engineer-site
**Hosting:** Vercel (free tier) + Cloudflare DNS
**Supabase:** RSM waitlist backend (rsm_waitlist table)

## Pages

### 1. Homepage (`index.html`)
- Personal landing page — bio, roles, links
- Design: Copper/sand dark theme (Cormorant Garamond display + Jost UI)
- Links to EBFC Show, LinkedIn, RSM training, testimonials, Scrum for Teens

### 2. RSM Training (`rsm.html` → `/rsm`)
- Registered Scrum Master™ course waitlist page
- Design: EBFC dark theme (blue/gold, system-ui)
- Sections: Hero → Course Details → Curriculum → Instructor quote → Registration form
- Form submits to `/api/waitlist` → Supabase `rsm_waitlist`
- Price: $949/person, 2 days live virtual (Zoom), RSM credential signed by Dr. Jeff Sutherland
- Schedule: 7-10 AM + 12-3 PM PST, both days
- Curriculum: Scrum Framework, LPS + Scrum, Production Control, Team Facilitation
- Next class: May 7-8, 2026 (Jeremy's team of 5 + EBFC Scrum community winners)

### 3. Testimonials (`testimonials.html` → `/testimonials`)
- RSM training testimonials (179 responses, 4.8 avg rating)

### 4. API (`api/waitlist.js`)
- Vercel serverless function (Node.js)
- POST: validates name + email, inserts to Supabase `rsm_waitlist`
- CORS locked to `https://felipe.engineer`
- Duplicate emails return 409

## Tech Stack
- Static HTML/CSS/JS (no framework)
- Vercel for hosting + serverless functions
- Supabase for waitlist storage
- Cloudflare for DNS
- `cleanUrls: true` in vercel.json (no .html extensions)

## Design Systems (2 distinct themes)
| Token | Homepage | RSM Page |
|-------|----------|----------|
| BG | #0C0B09 | #0A0A0C |
| Accent 1 | Copper #C17F3E | Blue #1A6FE0 |
| Accent 2 | Sand #F0E4CC | Gold #D4A827 |
| Display font | Cormorant Garamond | system-ui |
| UI font | Jost | system-ui |
| Border style | Copper-tinted | Blue-tinted |

## Infrastructure
- **Vercel project:** `felipe-engineer-site`
- **Custom domain:** `felipe.engineer`
- **Environment vars (Vercel):** `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- **Git:** 10 commits, latest = removed .env.production.local from tracking

## Open Items
- [ ] GPT Sara's RSM page feedback (pending)
- [ ] RSM page and homepage have different design languages — consider unifying
- [ ] May 7-8 class: update page once dates confirmed (remove "waitlist" → direct registration)
- [ ] EBFC Scrum community winners: send promo codes + class invites
- [ ] Waitlist → registration flow (Stripe or invoice once class confirmed)
