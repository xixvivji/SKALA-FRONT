document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const hero = document.querySelector("[data-hero]");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const images = ["img/seoul1.jpg", "img/gwangju1.jpg", "img/ulsan1.jpg"];
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url("${images[index]}")`;
  }, 5000);
}
