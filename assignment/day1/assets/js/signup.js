import { createPasswordRecord, getUsers, saveUsers } from "./auth.js";

const form = document.getElementById("signup-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function validatePassword() {
  confirmPassword.setCustomValidity(password.value === confirmPassword.value ? "" : "비밀번호가 일치하지 않습니다.");
}

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validatePassword();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userId = document.getElementById("user-id").value.trim();
  const users = getUsers();
  const existingIndex = users.findIndex((user) => user.userId === userId);
  const existingUser = users[existingIndex];
  const email = document.getElementById("email").value.trim();
  if (existingUser?.password) {
    alert("이미 사용 중인 아이디입니다.");
    document.getElementById("user-id").focus();
    return;
  }
  if (existingUser && existingUser.email !== email) {
    alert("기존 계정에 등록된 이메일과 일치하지 않습니다.");
    document.getElementById("email").focus();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "가입 처리 중…";

  const passwordRecord = await createPasswordRecord(password.value);
  const user = {
    username: document.getElementById("username").value.trim(),
    userId,
    email,
    gender: document.querySelector('input[name="gender"]:checked').value,
    interests: [...document.querySelectorAll('input[name="interests"]:checked')].map((item) => item.value),
    region: document.getElementById("region").value,
    password: passwordRecord
  };
  if (existingIndex >= 0) users[existingIndex] = user;
  else users.push(user);
  saveUsers(users);
  location.href = `login.html?registered=1&userId=${encodeURIComponent(userId)}`;
});
