export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  year: string;
  status: "Shipped" | "WIP";
  heroImage: string;
  stack: string[];
  github: string;
  live: string | null;
  /** GitHub repo for live code preview. Null = no code preview. */
  repo: { owner: string; name: string } | null;
  description: string; // Markdown
}

export const projects: Project[] = [
  {
    id: "hris-saas",
    index: "01",
    title: "HRIS SaaS Platform",
    tagline:
      "A comprehensive HR platform handling employee management, payroll tracking, and attendance — built for multi-role access with responsive web and mobile interfaces.",
    year: "2025",
    status: "WIP",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1600&h=800&q=80",
    stack: ["Next.js", "React", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/FearCleevan/hris-saas-platform",
    live: "https://hrisph.vercel.app/",
    repo: { owner: "FearCleevan", name: "hris-saas-platform" },
    description: `## Overview

HRIS SaaS is a production-ready Human Resource Information System handling the full employee lifecycle — onboarding, payroll, attendance, and multi-role access — built as a cross-platform product spanning web and mobile.

## The Problem

Small-to-medium businesses in the Philippines manage HR through spreadsheets and manual processes. HRIS SaaS centralises these into a single platform that non-technical HR staff can operate independently.

## Technical Stack

| Layer | Technology |
|---|---|
| Web Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Mobile | React Native, Expo |
| Admin Dashboard | React, Vite, TypeScript |
| Backend & Auth | Supabase (PostgreSQL, Row-Level Security) |
| Deployment | Vercel |

## Key Features

- Employee management with complete profile and document tracking
- Payroll computation with deductions, allowances, and payslip generation
- Attendance tracking with clock-in/clock-out and leave management
- Multi-role access: HR Admin, Manager, Employee self-service
- Landing page with Supabase-powered waitlist integration

## Architecture Decisions

### Row-Level Security

Supabase RLS policies enforce access at the database level — an employee can only read their own payslip rows, a manager can only see their direct reports. No application-level permission checks required.

### Shared Backend

Both the web app (Next.js) and mobile app (React Native/Expo) hit the same Supabase project. Schema changes propagate to both platforms without duplicating business logic.

## Current Status

Core payroll and attendance modules are complete. Leave management and advanced analytics are in progress.
`,
  },

  {
    id: "hris-admin",
    index: "02",
    title: "HRIS Admin Dashboard",
    tagline:
      "Admin dashboard for the HRIS platform — manage employees, payroll, attendance, and analytics. Integrated with the same Supabase backend for real-time data.",
    year: "2025",
    status: "WIP",
    heroImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?fit=crop&w=1600&h=800&q=80",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/FearCleevan/hris-saas-platform",
    live: "https://adminhrisph.vercel.app/",
    repo: { owner: "FearCleevan", name: "hris-saas-platform" },
    description: `## Overview

The HRIS Admin Dashboard is the back-office control panel for the HRIS SaaS platform. It gives HR administrators and managers a centralised view of the entire workforce — employees, payroll runs, attendance records, and analytics — all updated in real time via Supabase.

## Separation of Concerns

The admin dashboard is intentionally shipped as a separate Vite/React app rather than a Next.js route. This keeps the admin bundle out of the employee-facing app and allows independent deploy cycles — critical when rolling out sensitive HR features without touching the public-facing app.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS, CSS Modules |
| Backend | Supabase (shared with main HRIS app) |
| Deployment | Vercel (separate project) |

## Key Features

- Real-time employee table with search, filter, and pagination
- Payroll run management — configure, compute, and approve payslip batches
- Attendance monitoring with daily/weekly/monthly views
- Analytics cards: headcount, payroll totals, leave balances
- Role-gated views: Super Admin vs HR Manager access levels

## Current Status

Core employee management and payroll run screens are complete. Analytics module and leave approval workflows are in progress.
`,
  },

  {
    id: "ai-assistant",
    index: "03",
    title: "My AI Assistant",
    tagline:
      "A fully offline AI assistant that reads private documents and answers questions with context — no API keys, no cloud. Built with Ollama, ChromaDB, and FastAPI.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?fit=crop&w=1600&h=800&q=80",
    stack: ["Python", "Ollama", "ChromaDB", "FastAPI", "sentence-transformers", "PyQt6"],
    github: "https://github.com/FearCleevan/My-AI-Assistant",
    live: null,
    repo: { owner: "FearCleevan", name: "My-AI-Assistant" },
    description: `## Overview

A fully offline, privacy-first AI assistant built on a local RAG (Retrieval-Augmented Generation) pipeline. It ingests private documents — PDFs, web pages, plain text — and answers natural language questions with source context. No API keys, no cloud, no data leaving the machine.

## The Problem

Most AI assistants send your data to cloud APIs. For sensitive documents — contracts, internal specs, personal notes — this is a non-starter. This project proves you can run a capable QA system entirely on local hardware.

## Architecture

\`\`\`
Documents (PDF/Web/Text)
    → Parser (pypdf / BeautifulSoup)
    → Embedder (sentence-transformers)
    → Vector Store (ChromaDB)
         ↓
User Query → Similarity Search → Context Chunks
    → Ollama (local LLM: llama3 / mistral)
    → Answer with cited sources
\`\`\`

## Technical Stack

| Layer | Technology |
|---|---|
| LLM Runtime | Ollama (llama3, mistral) |
| Embeddings | sentence-transformers (all-MiniLM) |
| Vector DB | ChromaDB (persistent local store) |
| API Layer | FastAPI |
| GUI | PyQt6 desktop app, Textual TUI |
| Parsers | pypdf, BeautifulSoup |

## Key Features

- Ingest PDFs, web pages, and plain text files
- Local vector embeddings — no external embedding API
- Source citation — every answer shows which document chunk was used
- Both a desktop GUI (PyQt6) and a terminal TUI (Textual)
- Swap models with one config change (llama3, mistral, phi-3, etc.)

## Lessons Learned

ChromaDB's persistent mode writes embeddings to disk, so re-ingesting the same document is idempotent — it deduplicates by content hash. This made incremental document updates trivial.
`,
  },

  {
    id: "payup",
    index: "04",
    title: "PayUp — Late Payment Escalator",
    tagline:
      "A mobile app that automates payment reminders and escalation workflows for businesses — reducing manual follow-ups with push notifications and payment tracking.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?fit=crop&w=1600&h=800&q=80",
    stack: ["React Native", "Expo Router", "TypeScript", "NativeWind", "Supabase"],
    github: "https://github.com/FearCleevan/Payup",
    live: null,
    repo: { owner: "FearCleevan", name: "Payup" },
    description: `## Overview

PayUp automates the awkward process of chasing late payments. Instead of manually drafting reminder emails or messages, businesses configure escalation rules — send a gentle reminder on day 3, a firmer notice on day 7, escalate to management on day 14. PayUp handles it automatically.

## The Problem

Small businesses and freelancers lose significant time on payment follow-ups. The manual cycle of "draft email → check if paid → repeat" is inefficient and emotionally draining. PayUp turns it into a configurable, hands-off workflow.

## Technical Stack

| Layer | Technology |
|---|---|
| Mobile | React Native, Expo Router |
| Styling | NativeWind (Tailwind for RN) |
| Language | TypeScript |
| Backend | Supabase (database + auth + realtime) |

## Key Features

- Client and invoice management
- Configurable escalation rules per client tier
- Push notification reminders at scheduled intervals
- Payment status tracking (unpaid → reminded → paid → overdue)
- Dashboard showing outstanding amounts by aging bucket

## Architecture

Supabase Edge Functions handle the scheduled reminder dispatch — they query overdue invoices, evaluate escalation rules, and trigger push notifications via Expo's notification service. The mobile app is the management interface; the logic runs server-side on a cron schedule.
`,
  },

  {
    id: "vyralyx",
    index: "05",
    title: "Vyralyx — AI-Powered Fitness",
    tagline:
      "An AI-powered fitness mobile app that generates personalised workout plans, tracks progress, and provides real-time coaching feedback.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?fit=crop&w=1600&h=800&q=80",
    stack: ["React Native", "Expo Router", "TypeScript", "NativeWind", "Supabase"],
    github: "https://github.com/FearCleevan/vyralyx-fitness-app",
    live: null,
    repo: { owner: "FearCleevan", name: "vyralyx-fitness-app" },
    description: `## Overview

Vyralyx is an AI-powered fitness companion that generates personalised workout plans based on goals, experience level, and available equipment — then adapts those plans based on logged performance over time. Built entirely in React Native for cross-platform iOS and Android delivery.

## Key Features

- AI-generated workout plans personalised to goals and fitness level
- Exercise library with step-by-step instructions and sets/reps tracking
- Progress tracking with charts showing strength and volume trends over time
- Real-time coaching feedback during workouts
- Supabase-powered sync — workouts persist across device reinstalls

## Technical Stack

| Layer | Technology |
|---|---|
| Mobile | React Native, Expo Router |
| Styling | NativeWind (Tailwind for RN) |
| Language | TypeScript |
| Backend | Supabase (PostgreSQL, Auth, Storage) |

## Architecture Decisions

### Expo Router

File-based routing in React Native brings the same DX as Next.js App Router to mobile — no manual navigator configuration, deep links work out of the box, and tab/stack navigation is expressed as a directory structure.

### Adaptive Plans

Workout plans are stored as JSON structures in Supabase. A lightweight recommendation layer compares the user's logged RPE (rate of perceived exertion) against targets and adjusts the next session's load accordingly — no full AI call required for each adaptation.

## Lessons Learned

NativeWind's responsive utilities don't translate 1:1 from the web — breakpoints are meaningless on a 390px wide phone. Design for mobile-first with explicit platform checks (\`Platform.OS\`) for layout edge cases.
`,
  },

  {
    id: "gooey-toast",
    index: "06",
    title: "Gooey-Toast (React Native UI Library)",
    tagline:
      "A React Native UI component library featuring animated toast notifications with a gooey morphing effect. Built as a Turborepo monorepo with CLI tooling for easy integration.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?fit=crop&w=1600&h=800&q=80",
    stack: ["React Native", "Expo", "TypeScript", "Reanimated", "React Native SVG", "Turborepo", "pnpm"],
    github: "https://github.com/FearCleevan/rentapp",
    live: null,
    repo: null,
    description: `## Overview

Gooey-Toast is an open-source React Native UI library that brings a distinctive gooey, morphing animation to toast notification components. Packaged as a Turborepo monorepo with a CLI generator for quick project integration.

## The Animation Effect

The "gooey" effect is achieved by combining React Native Reanimated with SVG filters — a technique common in web CSS but rarely seen in React Native. The toast notification morphs between shapes using SVG feGaussianBlur and feColorMatrix to create the liquid-merge appearance.

## Monorepo Structure

\`\`\`
packages/
  core/          — the actual component library
  cli/           — npx gooey-toast add <component>
apps/
  example/       — Expo app demonstrating all variants
\`\`\`

Turborepo handles build caching and task orchestration across packages. pnpm workspaces manage the dependency graph.

## Technical Stack

| Layer | Technology |
|---|---|
| Components | React Native, TypeScript |
| Animation | React Native Reanimated 3 |
| SVG Effects | React Native SVG |
| Gestures | React Native Gesture Handler |
| Monorepo | Turborepo, pnpm |

## Key Features

- Plug-and-play toast component with gooey morphing animation
- Multiple variants: success, error, warning, info
- Configurable duration, position, and swipe-to-dismiss
- CLI generator for dropping components directly into existing projects
`,
  },

  {
    id: "rent-app",
    index: "07",
    title: "Rent App",
    tagline:
      "A mobile app for managing rental properties — listing units, tracking payments, generating receipts, and managing tenant records with real-time Supabase sync.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fit=crop&w=1600&h=800&q=80",
    stack: ["React Native", "TypeScript", "Supabase", "JavaScript"],
    github: "https://github.com/FearCleevan/rentapp",
    live: null,
    repo: { owner: "FearCleevan", name: "rentapp" },
    description: `## Overview

A mobile property management app built for landlords managing multiple rental units. Covers the full rental lifecycle: unit listings, tenant onboarding, monthly payment tracking, receipt generation, and maintenance request logging.

## Technical Stack

| Layer | Technology |
|---|---|
| Mobile | React Native, TypeScript |
| Backend | Supabase (PostgreSQL, Auth, Storage) |

## Key Features

- Property and unit management (multiple buildings, floor layouts)
- Tenant profile management with document storage
- Monthly payment tracking with overdue detection
- Digital receipt generation
- Maintenance request logging and status tracking
- Supabase real-time subscriptions for instant payment status updates

## Design Philosophy

Built for landlords who are not technically sophisticated — the UX prioritises large touch targets, minimal steps per action, and plain-language labels over technical terminology.
`,
  },

  {
    id: "project-management",
    index: "08",
    title: "Internal Project Management",
    tagline:
      "A web-based project management tool for internal team use. Features Kanban boards, sprint planning, task assignments, and progress tracking inspired by Plane.so and Jira.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?fit=crop&w=1600&h=800&q=80",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/FearCleevan/projectmanagement",
    live: "https://projectmanagement-smoky.vercel.app/login",
    repo: { owner: "FearCleevan", name: "projectmanagement" },
    description: `## Overview

An internal project management tool built to replace ad-hoc task tracking in spreadsheets. Inspired by Plane.so and Jira, it gives small teams a structured workflow without the complexity overhead of enterprise tools.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Deployment | Vercel |

## Key Features

- Kanban board with drag-and-drop task cards
- Sprint planning with backlog and active sprint views
- Task assignments with user avatars and due dates
- Priority levels: Urgent, High, Medium, Low
- Project-level progress tracking and burn-down indicators
- Comment threads on individual tasks

## Context

Built during the role at Poseidon Distribution OPC as a learning exercise after working with Plane.so for sprint management — the goal was to understand how modern project management UIs are constructed under the hood.
`,
  },

  {
    id: "launchpad",
    index: "09",
    title: "The Launchpad Inc — Landing Page",
    tagline:
      "Official company website for The Launchpad Inc with automated lead capture. Form submissions are routed to Google Sheets via Google Apps Script for CRM pipeline integration.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Google Apps Script", "Google Sheets"],
    github: "https://github.com/FearCleevan/prospect",
    live: "https://www.thelaunchpadteam.com/",
    repo: { owner: "FearCleevan", name: "prospect" },
    description: `## Overview

The official marketing website for The Launchpad Inc — a company landing page built to generate and capture leads. The standout feature is the automated lead capture pipeline: contact form submissions are processed by Google Apps Script and pushed directly into a Google Sheets CRM without any backend server.

## Serverless Lead Capture

\`\`\`
Contact Form (React) → Google Apps Script Web App → Google Sheets (CRM)
                                    ↓
                          Email notification to sales team
\`\`\`

Using Google Apps Script as a serverless function endpoint eliminates hosting costs and backend maintenance. The script validates the submission, appends a timestamped row to the leads sheet, and triggers a notification email — all within Google's infrastructure.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Automation | Google Apps Script |
| CRM | Google Sheets |
| Hosting | The Launchpad's existing hosting |

## Key Features

- Service sections, team profiles, and client testimonials
- Contact form with real-time validation
- Automated lead routing to Google Sheets pipeline
- Email notifications on new submissions
- Mobile-responsive design
`,
  },

  {
    id: "chat-system",
    index: "10",
    title: "Chat System — Company Internal Chat",
    tagline:
      "A real-time internal chat system with role-based access control, file and image sharing via Cloudinary, and read receipts — deployed for a live company.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Firebase", "Firestore", "Authentication", "Cloudinary"],
    github: "#",
    live: null,
    repo: null,
    description: `## Overview

A real-time internal messaging system built and deployed for The Launchpad Inc — replacing informal WhatsApp groups with a structured, role-controlled communication platform. Features direct messages, group channels, file sharing, and read receipts.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Real-time | Firebase Firestore (live listeners) |
| Auth | Firebase Authentication |
| File Storage | Cloudinary |
| RBAC | Custom role claims in Firebase Auth |

## Key Features

- Real-time messaging with Firestore live snapshots
- Role-based access control — admins can see all channels, users see only permitted ones
- File and image sharing via Cloudinary with automatic thumbnail generation
- Read receipts: per-message read status tracking
- User presence indicators (online/offline/away)
- Message history with paginated infinite scroll

## Architecture Note

Firestore's real-time listeners update the UI within milliseconds of a message being written — no polling required. Read receipts are stored as a subcollection per message, updated when a user's Firestore listener first receives the message document.

> Repository is private — deployed for a live company.
`,
  },

  {
    id: "lp-crm",
    index: "11",
    title: "LP CRM — Customer Relationship Management",
    tagline:
      "A full-stack CRM for a real sales team — managing leads, pipeline stages, customer profiles, and activity logs across the organisation.",
    year: "2025",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    github: "#",
    live: null,
    repo: null,
    description: `## Overview

A custom CRM built and deployed for The Launchpad Inc's sales team. Manages the full lead lifecycle: capture, qualification, pipeline stages, follow-up scheduling, and deal tracking — replacing a patchwork of spreadsheets and sticky-note reminders.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Hosting | Hostinger VPS (SSH deployment) |

## Key Features

- Lead management with source tracking and contact timeline
- Kanban-style pipeline with drag-and-drop stage transitions
- Customer profiles with full activity log
- Follow-up reminders and task scheduling
- Sales rep performance dashboard
- Role-based access: Admin, Manager, Sales Rep

## Data Model

The core data model centres on three entities: **Lead** (the prospect), **Activity** (every touchpoint — call, email, meeting), and **Deal** (a qualified opportunity with monetary value and close probability). This normalised structure supports the full sales workflow without schema changes as the team's process evolves.

> Repository is private — deployed for a live company.
`,
  },

  {
    id: "technobuild",
    index: "12",
    title: "TechnoBuild V2 — E-Commerce with AI",
    tagline:
      "E-commerce platform for PC components with an intelligent PC builder tool and an AI assistant (Gemini API) that recommends compatible parts based on budget and use case.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Firebase", "Gemini API", "Cloudinary"],
    github: "#",
    live: null,
    repo: null,
    description: `## Overview

TechnoBuild V2 is an e-commerce platform for PC components that goes beyond a standard product catalogue. The standout feature is an intelligent PC Builder: users select parts and the system validates compatibility in real time. An integrated AI assistant (Google Gemini) recommends configurations based on stated budget and use case — gaming, workstation, budget office, etc.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend & Auth | Firebase (Firestore + Authentication) |
| AI | Google Gemini API |
| Media | Cloudinary |

## Key Features

- Full product catalogue with search, filter, and category browsing
- Interactive PC Builder with real-time compatibility validation (socket, TDP, RAM type)
- Gemini-powered AI assistant for budget-based build recommendations
- Cart, checkout, and order management
- Cloudinary image optimisation for product photos
- Admin panel for product and inventory management

## AI Integration

The Gemini API receives a structured prompt containing the user's budget, primary use case, and parts already in the builder. It returns a recommended configuration with justifications. The response is parsed and pre-filled into the PC Builder, which the user can then modify.
`,
  },

  {
    id: "school-management",
    index: "13",
    title: "School Management System",
    tagline:
      "Comprehensive school management system with student enrollment, grade management, attendance tracking, and teacher and parent portals. Built with React.js and Firebase Firestore.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Firebase", "Firestore", "Authentication", "Cloudinary"],
    github: "#",
    live: null,
    repo: null,
    description: `## Overview

A full-featured school management system covering the key administrative workflows of a school: student enrollment, grade recording, attendance tracking, and communication between teachers and parents.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend & Auth | Firebase (Firestore + Authentication) |
| Media | Cloudinary |

## Key Features

- Student enrollment and profile management with document uploads
- Grade management: subject grades, quarterly averages, report card generation
- Daily attendance recording with absent/late/present tracking
- Teacher portal: class roster, grade entry, attendance submission
- Parent portal: view grades, attendance, and school announcements
- Admin dashboard: enrolment numbers, performance summaries, system settings
- Multi-role authentication: Admin, Teacher, Parent

## Data Architecture

Firestore collections mirror the school's hierarchy: School → Department → Section → Student. Grade and attendance documents are sub-collections under each student, making per-student history queries efficient without full collection scans.
`,
  },

  {
    id: "scapedbm",
    index: "14",
    title: "ScapeDBM — Landscaping Services Landing Page",
    tagline:
      "Professional landing page for a landscaping services company. Features service catalogue, portfolio gallery, contact form, and quote request system with responsive design.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "CSS3", "Cloudinary"],
    github: "#",
    live: null,
    repo: null,
    description: `## Overview

A marketing and lead-generation landing page for ScapeDBM, a landscaping services company. The site showcases services, displays a portfolio of past work, and converts visitors into quote requests.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | CSS3 (custom, no framework) |
| Media | Cloudinary (portfolio gallery images) |

## Key Features

- Hero section with value proposition and primary CTA
- Service catalogue with descriptions and pricing tiers
- Portfolio gallery with Cloudinary-optimised images and lightbox
- Contact form with validation and quote request fields
- Mobile-responsive layout built with pure CSS Grid and Flexbox
- Smooth scroll navigation between sections

## Design Approach

Built without a CSS framework to keep the bundle minimal for a small business site. Custom CSS properties (variables) handle the brand colour palette, and a utility-class layer handles spacing and typography — a hand-rolled micro-framework appropriate for a single-page marketing site.
`,
  },

  {
    id: "personal-portfolio",
    index: "15",
    title: "Personal Portfolio (v1)",
    tagline:
      "My previous developer portfolio showcasing projects and experience, with a built-in AI chatbot powered by Google Gemini. Built with React.js and Tailwind CSS.",
    year: "2024",
    status: "Shipped",
    heroImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?fit=crop&w=1600&h=800&q=80",
    stack: ["React.js", "Tailwind CSS", "Google Gemini API"],
    github: "#",
    live: "https://lazandev.vercel.app",
    repo: null,
    description: `## Overview

The first version of my personal developer portfolio — a React.js single-page application showcasing projects, skills, and work history. The signature feature is "Chat with Peter", an AI chatbot powered by the Google Gemini API that answers questions about my background, skills, and experience on behalf of me.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| AI | Google Gemini API |
| Deployment | Vercel |

## Key Features

- Project showcase with screenshots and tech stacks
- Work experience and skills sections
- "Chat with Peter" — a Gemini-powered chatbot pre-loaded with context about my background
- Responsive layout for mobile and desktop

## The AI Chatbot

The chatbot uses Gemini's chat API with a system prompt containing detailed context about my work history, skills, and personality. Visitors ask questions in natural language and get accurate, contextualised responses. It served as both a portfolio differentiator and a practical experiment with LLM integration.

---

*This is version 1. You're currently looking at version 2 — rebuilt from scratch with Next.js 15, TypeScript, Three.js, and Framer Motion.*
`,
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
