import { SectionLabel } from "@/components/layout/SectionLabel";
import { Card } from "@/components/shared/Card";
import { CircleDecor } from "@/components/shared/CircleDecor";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { personal } from "@/data/personal";

const contactMethods = [
  {
    index: "01",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    cta: "Send a message →",
  },
  {
    index: "02",
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone}`,
    cta: "Give me a call →",
  },
  {
    index: "03",
    label: "Book a Call",
    value: "30-min intro via Calendly",
    href: personal.calendlyUrl,
    cta: "Schedule now →",
    external: true,
  },
];

const socialLinks = [
  { label: "GitHub",    href: personal.githubUrl },
  { label: "LinkedIn",  href: personal.linkedinUrl },
  { label: "Instagram", href: personal.instagramUrl },
  { label: "Facebook",  href: personal.facebookUrl },
];

export function Contact() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "8rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ParallaxLayer speed={50} className="absolute inset-0 pointer-events-none">
        <CircleDecor size={560} bottom="-160px" left="-200px" />
      </ParallaxLayer>

      <ZoomReveal>
        <SectionLabel>Contact</SectionLabel>
      </ZoomReveal>

      {/* Headline */}
      <ZoomReveal delay={0.08}>
        <p
          className="font-display font-medium uppercase leading-[1.05] tracking-tight mb-14 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)", color: "var(--off-white)" }}
        >
          Got a{" "}
          <em className="not-italic" style={{ color: "var(--mid-gray)" }}>
            project in mind?
          </em>{" "}
          Let's{" "}
          <em className="italic" style={{ color: "var(--off-white)" }}>
            build it together.
          </em>
        </p>
      </ZoomReveal>

      {/* Quick contact cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {contactMethods.map((method) => (
          <StaggerItem key={method.index}>
            <a
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="block group"
              style={{ textDecoration: "none" }}
            >
              <Card className="h-full flex flex-col gap-4 group-hover:border-[var(--step-4)] transition-colors">
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: "var(--step-5)" }}
                  >
                    {method.index}
                  </span>
                  <h3
                    className="font-display font-bold uppercase tracking-tight text-base"
                    style={{ color: "var(--off-white)" }}
                  >
                    {method.label}
                  </h3>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />

                <p className="font-body text-sm flex-1" style={{ color: "var(--step-6)" }}>
                  {method.value}
                </p>

                <div
                  className="font-mono text-[10px] tracking-widest mt-auto transition-colors"
                  style={{ color: "var(--step-5)" }}
                >
                  {method.cta}
                </div>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── OR message me ──────────────────────────────────────────── */}
      <ZoomReveal delay={0.12}>
        {/* Divider */}
        <div className="flex items-center gap-6 mb-10">
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--step-3)" }} />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--step-5)" }}
          >
            or message me
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--step-3)" }} />
        </div>

        <ContactForm />
      </ZoomReveal>

      {/* Availability strip */}
      <ZoomReveal delay={0.18}>
        <div
          className="flex flex-wrap items-center gap-6 py-5 mt-14 mb-10"
          style={{ borderTop: "1px solid var(--step-3)", borderBottom: "1px solid var(--step-3)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--off-white)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "var(--off-white)" }}
            >
              Available for work
            </span>
          </div>
          <div style={{ width: "1px", height: "14px", backgroundColor: "var(--step-3)" }} />
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "var(--step-5)" }}
          >
            {personal.location}
          </span>
          <div style={{ width: "1px", height: "14px", backgroundColor: "var(--step-3)" }} />
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "var(--step-5)" }}
          >
            Remote · On-site · Contract · Full-time
          </span>
        </div>
      </ZoomReveal>

      {/* Social links */}
      <ZoomReveal delay={0.22}>
        <div className="flex flex-wrap items-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </ZoomReveal>
    </div>
  );
}
