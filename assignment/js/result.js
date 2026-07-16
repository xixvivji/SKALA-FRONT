const users = JSON.parse(localStorage.getItem("users") || "[]");
const userList = document.getElementById("user-list");
const emptyState = document.getElementById("empty-state");
const count = document.getElementById("user-count");
const deleteButton = document.getElementById("delete-all");
const labels = {
  gender: { male: "남성", female: "여성" },
  interest: { design: "디자인", frontend: "프론트엔드", backend: "백엔드", ai: "AI" },
  region: { seoul: "서울", gwangju: "광주", ulsan: "울산" }
};

count.textContent = `${users.length}명`;
emptyState.hidden = users.length > 0;
deleteButton.hidden = users.length === 0;

users.forEach((user) => {
  const row = document.createElement("tr");
  const values = [
    user.username,
    user.userId,
    user.email,
    labels.gender[user.gender] || "미선택",
    (user.interests || []).map((item) => labels.interest[item] || item).join(", ") || "미선택",
    labels.region[user.region] || user.region
  ];
  values.forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  userList.appendChild(row);
});

deleteButton.addEventListener("click", () => {
  if (confirm("저장된 회원 정보를 모두 삭제할까요?")) {
    localStorage.removeItem("users");
    location.reload();
  }
});
