const form = document.getElementById("signup-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function validatePassword() {
  confirmPassword.setCustomValidity(password.value === confirmPassword.value ? "" : "비밀번호가 일치하지 않습니다.");
}

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validatePassword();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userId = document.getElementById("user-id").value.trim();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some((user) => user.userId === userId)) {
    alert("이미 사용 중인 아이디입니다.");
    document.getElementById("user-id").focus();
    return;
  }

  users.push({
    username: document.getElementById("username").value.trim(),
    userId,
    email: document.getElementById("email").value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value,
    interests: [...document.querySelectorAll('input[name="interests"]:checked')].map((item) => item.value),
    region: document.getElementById("region").value
  });
  localStorage.setItem("users", JSON.stringify(users));
  location.href = "result.html";
});
