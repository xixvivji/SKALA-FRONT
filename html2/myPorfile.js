const revealTargets = document.querySelectorAll(
  '.section-heading, .statement-card, .profile-list, .card, .strength-list article, .tag-list, .goal-content'
);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
} else {
  revealTargets.forEach((target) => target.classList.add('reveal-item'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -70px 0px'
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}
