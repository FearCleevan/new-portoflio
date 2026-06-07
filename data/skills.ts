import type { Skills } from "@/types/content";

export const skills: Skills = {
  technical: {
    languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SQL", "SCSS", "CSS Modules"],
    frontend: ["Next.js", "React.js", "React Native", "Expo", "Responsive Web Design", "State Management"],
    backend: ["Node.js", "Express.js", "REST APIs", "API Integration", "Authentication"],
    databases: ["MySQL", "Firebase (Firestore)", "Supabase", "PostgreSQL", "ChromaDB"],
    cloudAndDeployment: [
      "Firebase",
      "Vercel",
      "Hostinger",
      "GoDaddy",
      "Supabase",
      "Expo EAS",
      "Apple App Store Connect",
      "Google Play Console",
    ],
    toolsAndPlatforms: [
      "Git",
      "GitHub",
      "Google Apps Script",
      "Cloudinary",
      "SSH",
      "Postman",
      "Chrome DevTools",
      "Plane.so",
      "PayMongo",
      "Stripe",
      "Figma",
      "Expo",
      "Outlook",
      "Gmail",
    ],
  },
  professional: [
    "Full-Stack Web Development",
    "Mobile App Deployment (iOS/Android)",
    "App Store & Play Store Release Management",
    "DevOps Pipeline Management",
    "IT Support & Troubleshooting",
    "Network Administration & Setup",
    "Server Management & Security",
    "Database Management & Design",
    "DNS & Domain Management (MX, SPF, DKIM, DMARC)",
    "ETL & Data Pipeline Automation",
    "Credential & Access Management (RBAC, 2FA/MFA)",
    "SaaS Subscription & License Management",
    "Project Management & Sprint Planning",
    "System Maintenance & Security Audits",
    "Technical Documentation",
  ],
  soft: [
    "Effective Communicator & Team Collaborator",
    "Strong Problem-Solving & Analytical Skills",
    "Detail-Oriented & Self-Motivated",
    "Adaptable & Quick Learner",
    "Time Management & Multitasking",
    "Highly Trustworthy & Security-Conscious",
  ],
};

// Curated display subset for the Skills section UI (avoids overwhelming card layout)
export const technicalDisplay = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Next.js",
  "React Native",
  "Node.js",
  "Express.js",
  "Supabase",
  "PostgreSQL",
  "Firebase",
  "Python",
  "REST APIs",
  "Tailwind CSS",
  "Git",
  "Vercel",
  "Expo",
];

export const technicalCore = new Set([
  "TypeScript",
  "React.js",
  "Next.js",
  "React Native",
  "Supabase",
]);

export const professionalCore = new Set([
  "Full-Stack Web Development",
  "Mobile App Deployment (iOS/Android)",
  "DevOps Pipeline Management",
]);

export const softCore = new Set([
  "Strong Problem-Solving & Analytical Skills",
  "Adaptable & Quick Learner",
  "Highly Trustworthy & Security-Conscious",
]);
