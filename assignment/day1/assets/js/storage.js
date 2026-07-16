export function loadData(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.warn(`${key} 데이터를 복원하지 못했습니다.`, error);
    return fallback;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`${key} 데이터를 저장하지 못했습니다.`, error);
    return false;
  }
}
