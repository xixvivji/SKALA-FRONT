export const destinations = [
  {
    id: "seoul", name: "서울", englishName: "Seoul", theme: "History & City",
    title: "서울의 시간과 나란히 걷기", summary: "오래된 시간과 새로운 감각이 나란히 걷는 도시",
    description: "오래된 궁궐과 물길, 반짝이는 야경까지. 익숙하면서도 매번 새로운 서울의 장면을 만나보세요.",
    cardImage: "assets/images/seoul/seoul2.jpg",
    landmarks: [
      { image: "assets/images/seoul/seoul1.jpg", title: "청계천", description: "도심 한가운데서 물길을 따라 걷는 여유로운 산책" },
      { image: "assets/images/seoul/seoul2.jpg", title: "서울의 밤", description: "도시의 불빛이 만들어내는 활기찬 야경" },
      { image: "assets/images/seoul/seoul3.jpg", title: "남산", description: "서울의 풍경을 한눈에 담는 도심 속 쉼터" }
    ],
    videos: [
      { src: "assets/videos/seoul/seoul1.mp4", poster: "assets/images/seoul/seoul1.jpg", title: "서울 필름 01" },
      { src: "assets/videos/seoul/seoul2.mp4", poster: "assets/images/seoul/seoul2.jpg", title: "서울 필름 02" },
      { src: "assets/videos/seoul/seoul3.mp4", poster: "assets/images/seoul/seoul3.jpg", title: "서울 필름 03" }
    ],
    food: { image: "assets/images/seoul/seoulfood1.jpg", name: "따뜻한 찌개와 푸짐한 한식 한 상", description: "골목마다 개성 있는 식당이 자리한 서울에서 찌개부터 구이와 반찬까지 다양한 한식을 즐겨보세요." },
    tips: ["점심 인기 식당은 11시 30분 전에 방문해 보세요.", "시장과 오래된 골목에서 지역의 생활 맛을 느껴보세요.", "매운 정도나 알레르기 재료는 주문 전에 확인하세요."],
    checklist: ["교통카드 준비하기", "궁궐 관람 시간 확인하기", "걷기 편한 신발 챙기기"]
  },
  {
    id: "gwangju", name: "광주", englishName: "Gwangju", theme: "Art & Taste",
    title: "예술과 맛이 머무는 광주", summary: "예술과 문화, 풍성한 미식이 머무는 도시",
    description: "도시 곳곳에 스며든 문화와 따뜻한 미식, 여유로운 풍경이 광주만의 여행을 완성합니다.",
    cardImage: "assets/images/gwangju/gwangju1.jpg",
    landmarks: [
      { image: "assets/images/gwangju/gwangju1.jpg", title: "광주의 낮", description: "도심 속에서도 자연과 여유를 만나는 풍경" },
      { image: "assets/images/gwangju/gwangju2.jpg", title: "광주의 밤", description: "해가 진 뒤 새로운 분위기로 빛나는 도시" }
    ],
    videos: [{ src: "assets/videos/gwangju/gwangju1.mp4", poster: "assets/images/gwangju/gwangju1.jpg", title: "광주 여행 필름" }],
    food: { image: "assets/images/gwangju/gwangjufood1.jpg", name: "달큰하고 든든한 불고기 한 상", description: "푸짐한 인심으로 유명한 광주에서 잘 구운 고기와 다채로운 반찬을 곁들인 한 끼를 즐겨보세요." },
    tips: ["여럿이 방문하면 다양한 메뉴를 나누기 좋아요.", "전통시장 주변에서 광주의 식문화를 만나보세요.", "식사 후에는 근처 문화 공간을 둘러보세요."],
    checklist: ["미술관 휴관일 확인하기", "시장 먹거리 목록 만들기", "편한 가방 준비하기"]
  },
  {
    id: "ulsan", name: "울산", englishName: "Ulsan", theme: "Ocean & Nature",
    title: "바다와 자연의 에너지를 만나다", summary: "푸른 바다와 자연의 에너지를 품은 도시",
    description: "탁 트인 풍경과 도시의 활기가 조화를 이루는 울산에서 시원한 여행의 순간을 발견해 보세요.",
    cardImage: "assets/images/ulsan/ulsan2.jpg",
    landmarks: [
      { image: "assets/images/ulsan/ulsan1.jpg", title: "울산의 풍경", description: "도시와 자연이 나란히 이어지는 시원한 장면" },
      { image: "assets/images/ulsan/ulsan2.jpg", title: "울산의 밤", description: "해가 진 뒤 더욱 선명해지는 도시의 활기" }
    ],
    videos: [{ src: "assets/videos/ulsan/ulsan1.mp4", poster: "assets/images/ulsan/ulsan1.jpg", title: "울산 여행 필름" }],
    food: { image: "assets/images/ulsan/ulsanfood1.jpg", name: "여행의 속을 채우는 순두부찌개", description: "부드러운 순두부와 얼큰한 국물이 어우러진 따뜻한 한 끼로 여행의 피로를 달래보세요." },
    tips: ["바다를 둘러본 뒤 따뜻한 국물 메뉴를 즐겨보세요.", "매운맛은 주문할 때 조절 가능한지 물어보세요.", "해안가 주변의 신선한 해산물도 찾아보세요."],
    checklist: ["일출 시간 확인하기", "바람막이 챙기기", "해안 산책 코스 저장하기"]
  },
  {
    id: "busan", name: "부산", englishName: "Busan", theme: "Wave & Market",
    title: "파도와 골목 사이를 여행하다", summary: "푸른 바다와 활기찬 시장이 이어지는 항구 도시",
    description: "바다를 따라 걷고 오래된 골목과 시장을 누비며 부산만의 힘찬 리듬을 만나보세요.",
    cardImage: "assets/images/busan/busan1.jpg",
    landmarks: [
      { image: "assets/images/busan/busan1.jpg", title: "해안 산책", description: "수평선을 바라보며 걷는 시원한 바닷길" },
      { image: "assets/images/busan/busan2.jpg", title: "부산의 밤", description: "해변과 도심의 불빛이 만나는 야경" },
      { image: "assets/images/busan/busan3.jpg", title: "항구의 풍경", description: "도시와 바다가 맞닿아 만들어내는 부산의 장면" }
    ],
    videos: [{ src: "assets/videos/common/travel.mp4", poster: "assets/images/busan/busan2.jpg", title: "부산 여행 무드" }],
    food: { image: "assets/images/busan/busan3.jpg", name: "시장 골목의 따뜻한 한 끼", description: "활기찬 시장 골목에서 따뜻한 국물과 지역 먹거리를 천천히 즐겨보세요." },
    tips: ["해안 이동 시간을 여유롭게 잡으세요.", "시장에서는 현금을 조금 준비하면 편리해요.", "밤바다를 볼 때 얇은 겉옷을 챙기세요."],
    checklist: ["해변 날씨 확인하기", "시장 먹거리 지도 저장하기", "야경 촬영 장비 챙기기"]
  },
  {
    id: "jeju", name: "제주", englishName: "Jeju", theme: "Island & Rest",
    title: "바람이 쉬어 가는 섬, 제주", summary: "오름과 바다 사이에서 천천히 쉬어 가는 섬",
    description: "바람과 돌, 푸른 바다가 만든 제주에서 서두르지 않는 여행의 감각을 발견해 보세요.",
    cardImage: "assets/images/jeju/jeju1.jpg",
    landmarks: [
      { image: "assets/images/jeju/jeju1.jpg", title: "제주의 바람", description: "넓은 풍경을 따라 천천히 이어지는 섬의 길" },
      { image: "assets/images/jeju/jeju2.jpg", title: "푸른 해안", description: "바람과 파도가 만든 여유로운 해안 풍경" },
      { image: "assets/images/jeju/jeju3.jpg", title: "섬의 하루", description: "천천히 머물며 발견하는 제주의 빛과 색" }
    ],
    videos: [{ src: "assets/videos/common/travel.mp4", poster: "assets/images/jeju/jeju4.jpg", title: "제주 여행 무드" }],
    food: { image: "assets/images/jeju/jeju4.jpg", name: "섬의 재료로 차린 든든한 밥상", description: "제철 재료와 신선한 식재료로 차린 제주다운 한 끼를 맛보세요." },
    tips: ["동서 이동 시간을 넉넉하게 계산하세요.", "오름 방문 전 날씨를 확인하세요.", "일회용품을 줄일 개인 물병을 챙겨보세요."],
    checklist: ["렌터카 예약 확인하기", "오름 날씨 확인하기", "선크림과 모자 챙기기"]
  },
  {
    id: "gyeongju", name: "경주", englishName: "Gyeongju", theme: "Heritage & Walk",
    title: "천년의 시간을 따라 걷는 경주", summary: "고요한 유적과 골목에 오래된 시간이 흐르는 도시",
    description: "유적과 능, 고즈넉한 골목을 걸으며 천년의 이야기가 오늘과 만나는 순간을 느껴보세요.",
    cardImage: "assets/images/gyeongju/gyeongju1.jpg",
    landmarks: [
      { image: "assets/images/gyeongju/gyeongju1.jpg", title: "고요한 산책", description: "역사의 흔적을 따라 천천히 걷는 길" },
      { image: "assets/images/gyeongju/gyeongju2.jpg", title: "도시의 시간", description: "오래된 풍경과 오늘의 일상이 만나는 장면" },
      { image: "assets/images/gyeongju/gyeongju3.jpg", title: "천년의 밤", description: "은은한 빛 아래 다시 만나는 경주의 역사" }
    ],
    videos: [{ src: "assets/videos/common/travel.mp4", poster: "assets/images/gyeongju/gyeongju2.jpg", title: "경주 여행 무드" }],
    food: { image: "assets/images/gyeongju/gyeongju3.jpg", name: "여행길을 채우는 정갈한 한 상", description: "천천히 걷는 여행 사이 지역의 맛을 담은 정갈한 한 끼를 즐겨보세요." },
    tips: ["유적지 운영 시간을 미리 확인하세요.", "자전거 이동 코스도 고려해 보세요.", "야간 조명이 켜지는 시간을 확인하세요."],
    checklist: ["유적지 관람권 확인하기", "걷기 편한 신발 챙기기", "야간 산책 시간 계획하기"]
  }
];

export function findDestination(id) {
  return destinations.find((destination) => destination.id === id);
}
