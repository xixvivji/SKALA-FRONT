document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

const topButton = document.createElement("button");
topButton.className = "floating-top";
topButton.type = "button";
topButton.setAttribute("aria-label", "페이지 맨 위로 이동");
topButton.textContent = "↑";
document.body.appendChild(topButton);

function updateTopButton() {
  topButton.classList.toggle("is-visible", window.scrollY > 450);
}
window.addEventListener("scroll", updateTopButton, { passive: true });
topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
updateTopButton();

const hero = document.querySelector("[data-hero]");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const images = ["img/seoul1.jpg", "img/gwangju1.jpg", "img/ulsan1.jpg"];
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url("${images[index]}")`;
  }, 5000);
}
