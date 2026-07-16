import { getCurrentUser, logout } from "./auth.js";

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
if (menuToggle && siteNav) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    siteNav.querySelectorAll('a[href="login.html"], a[href="signup.html"]').forEach((link) => link.remove());
    const userLabel = document.createElement("span");
    userLabel.className = "nav-user";
    userLabel.textContent = `${currentUser.username}님`;
    const logoutButton = document.createElement("button");
    logoutButton.className = "nav-logout";
    logoutButton.type = "button";
    logoutButton.textContent = "로그아웃";
    logoutButton.addEventListener("click", () => {
      logout();
      location.href = "index.html";
    });
    siteNav.append(userLabel, logoutButton);
  } else if (!siteNav.querySelector('a[href="login.html"]')) {
    const loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.textContent = "로그인";
    siteNav.appendChild(loginLink);
  }

  const themeButton = document.createElement("button");
  themeButton.className = "theme-toggle";
  themeButton.type = "button";
  siteNav.appendChild(themeButton);

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeButton.textContent = isDark ? "☀️ 라이트" : "🌙 다크";
    themeButton.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
    themeButton.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem("travel-theme", isDark ? "dark" : "light");
  }

  const savedTheme = localStorage.getItem("travel-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);
  themeButton.addEventListener("click", () => applyTheme(!document.body.classList.contains("dark")));

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
  const images = ["assets/images/seoul1.jpg", "assets/images/gwangju1.jpg", "assets/images/ulsan1.jpg"];
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url("${images[index]}")`;
  }, 5000);
}
