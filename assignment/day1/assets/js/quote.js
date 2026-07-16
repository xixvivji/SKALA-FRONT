const fallbackQuote = {
  message: "여행은 새로운 일상을 만나는 일입니다.",
  author: "여행의 발견"
};

export async function loadDailyQuote() {
  try {
    const response = await fetch("assets/data/quotes.json");
    if (!response.ok) throw new Error("문구 요청에 실패했습니다.");
    const quotes = await response.json();
    if (!Array.isArray(quotes) || quotes.length === 0) throw new Error("문구 데이터가 없습니다.");
    return quotes[new Date().getDate() % quotes.length];
  } catch (error) {
    console.warn("오늘의 문구 대신 기본 문구를 표시합니다.", error);
    return fallbackQuote;
  }
}

const quoteElement = document.getElementById("daily-quote");
const authorElement = document.getElementById("quote-author");
if (quoteElement && authorElement) {
  const quote = await loadDailyQuote();
  quoteElement.textContent = quote.message;
  authorElement.textContent = `— ${quote.author}`;
}
