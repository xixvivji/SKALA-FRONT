import { destinations } from "../data/destinations.js?v=2";

const grid = document.getElementById("destination-grid");

destinations.forEach((destination, index) => {
  const card = document.createElement("a");
  card.className = "destination-card";
  card.href = `destination.html?city=${destination.id}`;
  card.style.backgroundImage = `url("${destination.cardImage}")`;
  card.style.animationDelay = `${index * 90}ms`;

  const content = document.createElement("div");
  content.className = "destination-content";
  const category = document.createElement("span");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  category.textContent = `${String(index + 1).padStart(2, "0")} · ${destination.theme.toUpperCase()}`;
  title.textContent = destination.name;
  description.textContent = destination.summary;
  content.append(category, title, description);
  card.appendChild(content);
  grid.appendChild(card);
});
