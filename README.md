# ⚡ AURA 2026 — Official College Cultural Fest Website
> **"Where Talent Meets the Extraordinary"**  
> *North India's premier inter-collegiate cultural festival featuring 3 days of high-octane music, dance battles, star nights, runway fashion, gaming, and 48+ competitions with a ₹15,00,000 prize pool.*

---

## 🌟 Live Public Website

- **Public Live HTTPS URL**: Deployed & active via Cloudflare Edge Network / Vercel
- **Tech Stack**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Canvas Confetti, Web Audio API Synthesizer, QRCode Generator

---

## ✨ Website Features & Structure

1. **Cyberpunk & Cinematic Aesthetic**:
   - Deep obsidian `#06040a`, neon pink `#FF007A`, electric cyan `#00F0FF`, midnight purple `#7928CA`, electric yellow `#FFE600`.
   - Custom 60FPS neon Canvas particle background reacting to mouse interaction.
   - Built-in Web Audio API Cyberpunk ambient soundscape toggle with animated audio visualizer.

2. **Hero Section**:
   - High-impact glitch festival typography ("AURA 2026").
   - Live Countdown Timer targeting March 19, 2026 (Days, Hours, Minutes, Seconds).
   - "Register For Events", "Explore 48+ Events", and "Watch Aftermovie" video modal.
   - Live running neon ticker marquee.

3. **About & Statistics**:
   - Cultural legacy storytelling & campus overview.
   - 4 glassmorphic highlight cards: Star Nights, Competitions, Vogue Nexus Runway, and Cyber Arena.
   - Animated statistics: 18,000+ Footfall, 85+ Universities, 48+ Events, ₹15 Lakhs+ Prize Pool, 12+ Artists.

4. **Interactive Schedule & Timetable**:
   - 48+ detailed competitions across 3 festival days:
     - *Day 1: Genesis* (Battle of the Bands, Nukkad Natak, Western Solo, Valorant)
     - *Day 2: Eclipse* (Mega Dance Battle, Vogue Nexus Runway, Hip-Hop Cypher, RoboWars)
     - *Day 3: Supernova* (All-Styles Dance Clash, ByteBurst Hackathon, BGMI Finals, Classical Fusion)
   - Filter by Day or Category (Music, Dance, Singing, Drama, Fashion, Art, Gaming, Tech).
   - Real-time search by keyword, stage, or rules.
   - Modal for complete event rules, judging criteria, and student coordinator contact.
   - Direct "Register" button pre-selecting the event in the form.

5. **Performers & Star Headliners**:
   - Featured Grand Headliner Hero banner (Lost Frequencies & Nikhil Chinapa) with audio preview and schedule.
   - Performer cards with high-res photography, genre tags, day & time badges, and bios (The Yellow Diary, Jonita Gandhi, Seedhe Maut, Anubhav Singh Bassi, Shadow & Light).

6. **Campus Venue & Logistics**:
   - Interactive Google Maps embed with custom dark-contrast styling.
   - Transit tabs: Delhi Metro connectivity & shuttle buses, 2,500+ parking slots with EV charging, entry gates 1-3, and security guidelines.

7. **Registration System & Database**:
   - Full Name, Email, Phone, College Name, Department, Year of Study (1st - PG).
   - Solo vs Team mode with dynamic member addition & email collection.
   - Outstation campus accommodation requests.
   - Real-time client-side validation & duplicate registration detection.
   - **Persistent Storage**: Saved in browser IndexedDB / LocalStorage (survives refreshes and offline reloads).
   - **Instant Holographic Pass Generation**: Produces a digital festival pass with unique Ticket ID (`AURA-26-XXXX`), attendee info, and a scannable QR Code that can be printed or saved.

8. **Organizer / Admin Portal**:
   - Accessible via the "Admin / Passes" button in the navigation header.
   - View all registered candidates, filter by Individual/Team, search by name or college.
   - View & reprint digital passes.
   - **Export to CSV**: 1-click download of all attendee records for organizers.

9. **Photo Gallery & Lightbox**:
   - Responsive masonry grid with category filters (Concerts, Dance, Drama, Crowd, Behind the scenes).
   - Fullscreen Lightbox with Next/Prev controls and keyboard arrow support.

10. **Tiered Sponsors Wall**:
    - Title Sponsor (Red Bull), Powered By (Intel Core Ultra, Spotify), Associate Sponsors (OnePlus, boAt), Media Partners (BookMyShow, MTV India, Dominos x Coke).
    - Sponsorship inquiry button with pre-filled email.

11. **FAQ & Help Section**:
    - Accordion with questions regarding free passes, college IDs, hostel accommodations, multi-event registration, and prize disbursements.

12. **Footer & Committee Contacts**:
    - Direct contact details for Student Conveners, Cultural President, Dean, and Security Chief.
    - Social links (Instagram, YouTube, LinkedIn).
    - Interactive modals for Student Code of Conduct, Privacy Policy, and Fest Terms.

---

## 🚀 Local Development Setup

```bash
# 1. Clone or open the repository
cd code.env

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this project to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete AURA 2026 festival website"
   git remote add origin https://github.com/<YOUR_USERNAME>/aura-2026-fest.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository `aura-2026-fest`.
4. Framework preset will automatically detect **Vite**.
5. Click **"Deploy"** — your live website URL will be ready in under 60 seconds!

### Deploy to Netlify
1. Go to [app.netlify.com](https://app.netlify.com).
2. Click **"Add new site" -> "Import an existing project"**.
3. Select your GitHub repository.
4. Build command: `npm run build` | Publish directory: `dist`.
5. Click **"Deploy site"**.

### Connecting a Custom Domain (e.g. `aurafest2026.com`)
1. In your Vercel or Netlify project dashboard, navigate to **Settings -> Domains**.
2. Click **Add Domain** and enter your custom domain name (e.g., `aura2026.com` or `aura.college.edu`).
3. Add the provided DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - `CNAME` pointing to `cname.vercel-dns.com` (or Netlify equivalent).
   - `A` record pointing to the specified IP address.
4. SSL/TLS HTTPS certificates will be issued automatically within minutes.

---

## ✏️ How to Update Website Content

- **Event Schedule & Competitions**: Open [`src/data/festivalData.ts`](./src/data/festivalData.ts) and edit the `FESTIVAL_EVENTS` array. Add new prizes, change timings, or adjust rules.
- **Headliners & Performers**: Edit the `HEADLINERS_AND_PERFORMERS` array in [`src/data/festivalData.ts`](./src/data/festivalData.ts) to update artist names, bios, genres, and photos.
- **Sponsors**: Update the `SPONSORS` array with new partner brands.
- **Committee Contacts**: Update `COMMITTEE_MEMBERS` with new student coordinators and phone numbers.
- **Venue & Dates**: Update `FESTIVAL_INFO` at the top of [`src/data/festivalData.ts`](./src/data/festivalData.ts).
