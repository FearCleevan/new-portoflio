import { Hero } from "@/sections/Hero";
import { Profile } from "@/sections/Profile";
import { Summary } from "@/sections/Summary";
import { Experience } from "@/sections/Experience";
import { Process } from "@/sections/Process";
import { Services } from "@/sections/Services";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";
import { faqs } from "@/data/faq";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section id="home">
        <Hero />
      </section>
      <section id="profile">
        <Profile />
      </section>
      <section id="summary">
        <Summary />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="process">
        <Process />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
