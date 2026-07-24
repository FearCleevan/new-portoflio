export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
