import { findDestination } from "../data/destinations.js?v=2";

const params = new URLSearchParams(location.search);
const destination = findDestination(params.get("city"));
const root = document.getElementById("destination-root");
const error = document.getElementById("destination-error");

if (!destination) {
  error.hidden = false;
} else {
  document.title = `${destination.name} — 여행의 발견`;
  document.querySelector('meta[name="description"]').content = destination.description;
  document.getElementById("city-eyebrow").textContent = `${destination.englishName} · Korea`;
  document.getElementById("city-title").textContent = destination.title;
  document.getElementById("city-description").textContent = destination.description;
  document.getElementById("landmark-title").textContent = `${destination.name}의 명소`;
  document.getElementById("food-title").textContent = `${destination.name}에서 맛보는 한 끼`;
  document.getElementById("food-eyebrow").textContent = `${destination.englishName} Table`;
  document.getElementById("food-name").textContent = destination.food.name;
  document.getElementById("food-description").textContent = destination.food.description;
  document.getElementById("plan-city").href = `planner.html?city=${destination.id}`;

  const foodImage = document.getElementById("food-image");
  foodImage.src = destination.food.image;
  foodImage.alt = `${destination.name}의 대표 음식`;

  const landmarkList = document.getElementById("landmark-list");
  destination.landmarks.forEach((landmark) => {
    const card = document.createElement("figure");
    card.className = "landmark-card reveal-card";
    const image = document.createElement("img");
    image.src = landmark.image;
    image.alt = landmark.title;
    image.loading = "lazy";
    const caption = document.createElement("figcaption");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    title.textContent = landmark.title;
    description.textContent = landmark.description;
    caption.append(title, description);
    card.append(image, caption);
    landmarkList.appendChild(card);
  });

  const videoList = document.getElementById("video-list");
  destination.videos.forEach((item) => {
    const card = document.createElement("figure");
    card.className = "landmark-card reveal-card";
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.poster = item.poster;
    const source = document.createElement("source");
    source.src = item.src;
    source.type = "video/mp4";
    video.appendChild(source);
    const caption = document.createElement("figcaption");
    const title = document.createElement("strong");
    title.textContent = item.title;
    caption.appendChild(title);
    card.append(video, caption);
    videoList.appendChild(card);
  });

  const tipList = document.getElementById("food-tip-list");
  destination.tips.forEach((tip) => {
    const item = document.createElement("li");
    item.textContent = tip;
    tipList.appendChild(item);
  });

  root.hidden = false;
}
