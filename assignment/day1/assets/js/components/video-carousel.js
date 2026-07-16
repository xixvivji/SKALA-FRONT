const carouselVideo = document.getElementById("carousel-video");
const carouselSource = document.getElementById("carousel-source");
const carouselTitle = document.getElementById("carousel-title");
const carouselDescription = document.getElementById("carousel-description");
const carouselCount = document.getElementById("carousel-count");
const previousVideo = document.getElementById("previous-video");
const nextVideo = document.getElementById("next-video");

const videos = [
  { src: "assets/videos/common/travel.mp4", poster: "assets/images/common/travel-img.png", title: "세 도시 여행 필름", description: "서울, 광주, 울산의 여행지를 한 번에 만나보세요." },
  { src: "assets/videos/seoul/seoul1.mp4", poster: "assets/images/seoul/seoul1.jpg", title: "서울 여행 필름", description: "도시의 오래된 시간과 새로운 활기를 느껴보세요." },
  { src: "assets/videos/gwangju/gwangju1.mp4", poster: "assets/images/gwangju/gwangju1.jpg", title: "광주 여행 필름", description: "예술과 여유가 흐르는 광주의 순간을 담았습니다." },
  { src: "assets/videos/ulsan/ulsan1.mp4", poster: "assets/images/ulsan/ulsan1.jpg", title: "울산 여행 필름", description: "바다와 자연의 에너지를 영상으로 만나보세요." }
];
let videoIndex = 0;

function showVideo(index) {
  videoIndex = (index + videos.length) % videos.length;
  const current = videos[videoIndex];
  carouselVideo.pause();
  carouselSource.src = current.src;
  carouselVideo.poster = current.poster;
  carouselVideo.load();
  carouselTitle.textContent = current.title;
  carouselDescription.textContent = current.description;
  carouselCount.textContent = `${String(videoIndex + 1).padStart(2, "0")} / ${String(videos.length).padStart(2, "0")}`;
}

previousVideo.addEventListener("click", () => showVideo(videoIndex - 1));
nextVideo.addEventListener("click", () => showVideo(videoIndex + 1));
