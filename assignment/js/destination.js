const stageImage = document.getElementById("slide-image");
const description = document.getElementById("image-description");
const indicator = document.getElementById("page-indicator");
const progress = document.getElementById("progress-bar");
const previous = document.getElementById("previous-slide");
const next = document.getElementById("next-slide");
const images = JSON.parse(document.getElementById("gallery-data").textContent);
let currentIndex = 0;
let timer;

function render(index) {
  currentIndex = (index + images.length) % images.length;
  const current = images[currentIndex];
  stageImage.src = current.src;
  stageImage.alt = current.alt;
  description.textContent = current.description;
  indicator.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  progress.style.width = `${((currentIndex + 1) / images.length) * 100}%`;
}

function restartTimer() {
  window.clearInterval(timer);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timer = window.setInterval(() => render(currentIndex + 1), 5000);
  }
}

previous.addEventListener("click", () => { render(currentIndex - 1); restartTimer(); });
next.addEventListener("click", () => { render(currentIndex + 1); restartTimer(); });
render(0);
restartTimer();
