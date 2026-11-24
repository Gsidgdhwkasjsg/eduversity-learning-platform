# EDUVERSITY — Next-Generation Online Learning Platform

> *"Learn Skills. Build Your Future."*

![EDUVERSITY Platform Banner](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)

**EDUVERSITY** is a modern, responsive, full-stack online learning platform engineered with a premium EdTech SaaS aesthetic (inspired by Coursera, Udemy, Skillshare, and Linear). It provides end-to-end capabilities for discovering, enrolling, learning, rating, and managing educational courses with verifiable certificates and comprehensive administrative oversight.

### 🌐 Live Production Deployments
- **Vercel Production (Live)**: **[https://codeenv-theta.vercel.app](https://codeenv-theta.vercel.app)**
- **GitHub Pages (Live)**: **[https://gsidgdhwkasjsg.github.io/eduversity-learning-platform/](https://gsidgdhwkasjsg.github.io/eduversity-learning-platform/)**
- **GitHub Repository**: **[https://github.com/Gsidgdhwkasjsg/eduversity-learning-platform](https://github.com/Gsidgdhwkasjsg/eduversity-learning-platform)**

---

## 🌟 Key Features

### 1. Brand Identity & Design System
- **Palette**: Deep Navy (`#0B132B`, `#0F172A`), Electric Purple (`#7C3AED`, `#8B5CF6`), Crisp White and Soft Grey backgrounds (`#F8FAFC`).
- **Typography**: Clean, geometric typography via *Plus Jakarta Sans* and *Inter*.
- **Micro-Interactions**: Smooth card elevations, responsive hover transitions, subtle shadows, and celebratory confetti animations.

### 2. High-Converting Homepage
- **Navigation Bar**: Sticky glassmorphic top bar with live autocomplete search, wishlist counter badge, user avatar profile menu, and responsive mobile drawer.
- **Hero Section**: Headline *"Unlock Your Potential Through Learning"*, real-time platform statistics (120,000+ Enrolled Students, 450+ Instructors, 98% Completion Rate, 4.9★ Average Rating), floating credentials, and interactive course video teaser.
- **Trusted By Section**: Institutional partner badges (Google, Microsoft, Amazon, Meta, Netflix, Spotify, Stripe).
- **Interactive Course Categories**: Grid of all 10 core technical and creative disciplines.
- **Popular Courses Showcase**: Filterable tabs (All Trending, AI & Agents, Full-Stack Dev, 100% Free).
- **Value Pillars**: Pragmatic curriculum, production codebases, AI-assisted learning, and lifetime access.
- **Faculty Spotlight & Student Testimonials**: Verified outcome reviews from real students.
- **Newsletter Engine**: Weekly curated tech roadmap with instant confirmation.

### 3. 10 Interactive Disciplines & Course Catalog
1. **Programming & Development** (Full-Stack TypeScript, Next.js, Node.js, Python, PostgreSQL)
2. **Artificial Intelligence** (Autonomous AI Agents, Multi-Agent Swarms, RAG, PyTorch)
3. **Data Science** (Predictive ML, Pandas, Scikit-Learn, SQL Analytics)
4. **Business & Entrepreneurship** (Venture Capital, Scaling, Product-Market Fit)
5. **UI/UX Design** (Enterprise Design Systems in Figma, Tokens, Micro-Interactions)
6. **Graphic Design** (Brand Identity Guidelines, Vector Illustration, Photoshop Mockups)
7. **Digital Marketing** (Growth Loops, Programmatic SEO, Paid Acquisition)
8. **Cybersecurity** (Ethical Hacking, OWASP Top 10, Kali Linux Labs)
9. **Finance** (Wall Street DCF Valuation, LBO Models, Corporate M&A)
10. **Personal Development** (Executive Presence, Public Speaking, Negotiation)

### 4. Course Details & Learning Experience
- **Dedicated Course Pages**: Breadcrumbs, prerequisites, 6-8 key outcomes checklist, syllabus breakdown by module, instructor bio, and 5-star rating breakdown bars.
- **Dedicated Learning Classroom (`/learn/:courseId`)**:
  - Distraction-free full-screen layout.
  - Video player with play/pause, seek, volume, speed controls, and fullscreen.
  - Collapsible curriculum sidebar with completion checkmarks.
  - *"Mark as Completed"* toggle with live progress percentage calculation.
  - Tabbed lesson workspace: Overview & Notes, Downloadable Resources (PDFs, templates, code zip), Community Q&A forum, and Certificate status.
  - **Celebratory Confetti & Automatic Certificate Unlocking** at 100% completion!

### 5. Verifiable Certificates System
- Automated credential generation with unique serial codes (e.g. `CERT-EDU-2026-PY501`).
- Gold foil aesthetic with official seal, recipient name, course title, faculty signatures, and grade.
- Printable / Save to PDF mode and sharable verification links.

### 6. Authentication & Roles
- Student and Instructor registration, login, logout, and password reset.
- **1-Click Demo Logins** for instantaneous evaluation:
  - **Demo Student**: `student@eduversity.com`
  - **Demo Admin**: `admin@eduversity.com`
- User profile management with avatar, title, and bio customization.

### 7. Enrollment & Payments Engine
- **Free Courses**: 1-click instant enrollment.
- **Paid Courses**:
  - Checkout modal with itemized pricing, taxes, and discounts.
  - Coupon Code support (Use **`EDU2026`** for an instant 20% discount).
  - Stripe & Razorpay test-mode gateway simulation with credit card form validation.
  - Instant synchronization with Student Dashboard.

### 8. Student Reviews & Ratings
- Interactive 1–5 star rating picker and written feedback submission.
- Enrolled student verification guard (only enrolled students can post reviews).
- Author edit/delete permissions.
- Dynamic recalculation of course average rating and review counts.

### 9. Faculty & Instructor Profiles
- Comprehensive directory of instructors with search and domain filtering.
- Dedicated instructor profile pages detailing bios, expertise tags, student counts, average ratings, social links, and all courses taught.

### 10. Executive Admin Control Center
- Role-based server-side / client-side authorization.
- Real-time business intelligence metrics: Total Students, Total Courses, Total Faculty, Total Revenue ($412,950+), and active enrollments.
- Interactive monthly revenue bar chart visualization.
- **Course CRUD**: Modal forms to create new courses, edit pricing/content, or delete programs.
- **Student Accounts & Payments**: Live ledger of transactions (Stripe/Razorpay) and student status.
- **Review Moderation**: Approve or delete flagged student reviews.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Animations & Icons** | Framer Motion, Lucide React, Canvas Confetti |
| **State & Persistence** | Reactive LocalStorage Engine (`EduversityDatabase`) with event-driven cross-tab sync |
| **Backend & Database** | PostgreSQL schema (`schema.sql`), Supabase JavaScript SDK (`@supabase/supabase-js`) |
| **Payments Integration**| Stripe & Razorpay Test Sandboxes with Coupon Code Engine |
| **Routing & Architecture**| Declarative View Router with History & Deep-Linking Support |
| **Deployment** | Vercel (`vercel.json`), GitHub Actions |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Gsidgdhwkasjsg/eduversity-learning-platform.git
cd eduversity-learning-platform

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env

# 4. Start the local development server
npm run dev
```

Visit `http://localhost:5173` to explore the platform.

### Production Build

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🗄️ Database Architecture (`schema.sql`)

The repository includes a production-grade PostgreSQL / Supabase schema in `schema.sql` covering:
- `profiles`: User accounts, avatars, roles (`student`, `instructor`, `admin`).
- `categories`: 10 core technical and creative disciplines.
- `instructors`: Faculty bios, company credentials, social handles, ratings.
- `courses`: Pricing, difficulty levels, duration, what-you-will-learn bullet points, requirements.
- `modules` & `lessons`: Multi-tiered curriculums with video URLs and resource files.
- `enrollments`: Student enrollments and percentage progress tracking.
- `lesson_progress`: Individual lesson completion states.
- `reviews`: Student 1-5 star ratings and reviews with unique constraint per student.
- `wishlist`: Student bookmarked courses.
- `payments`: Transaction ledger with Stripe / Razorpay transaction IDs.
- `certificates`: Unique certificate serial numbers, grades, and verification URLs.
- **Row Level Security (RLS)** policies ensuring private data isolation.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** | `student@eduversity.com` | Any (or click 1-Click Demo) | Browse, enroll, watch lessons, mark progress, submit reviews, view certificates |
| **Admin** | `admin@eduversity.com` | Any (or click 1-Click Demo) | All student features + Admin Dashboard, Course CRUD, Revenue metrics, Review moderation |

*Note: The platform features instant 1-click demo login buttons inside the login modal and user menu.*

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with passion by the **EDUVERSITY Global Education Team**.
