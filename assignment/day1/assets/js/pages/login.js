import { getCurrentUser, getSafeRedirect, getUsers, setCurrentUser, verifyPassword } from "../core/auth.js";

const currentUser = getCurrentUser();
if (currentUser) location.replace(getSafeRedirect("planner.html"));

const form = document.getElementById("login-form");
const userIdInput = document.getElementById("login-id");
const passwordInput = document.getElementById("login-password");
const errorMessage = document.getElementById("login-error");
const submitButton = document.getElementById("login-submit");
const notice = document.getElementById("login-notice");

const params = new URLSearchParams(location.search);
if (params.get("registered") === "1") {
  notice.textContent = "회원가입이 완료되었습니다. 새 계정으로 로그인해 주세요.";
  notice.hidden = false;
  userIdInput.value = params.get("userId") || "";
  passwordInput.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = "확인 중…";

  try {
    const user = getUsers().find((item) => item.userId === userIdInput.value.trim());
    if (!user?.password) {
      throw new Error(user ? "기존 회원 정보에는 로그인 비밀번호가 없습니다. 다시 회원가입해 주세요." : "아이디 또는 비밀번호를 확인해 주세요.");
    }
    const isValid = await verifyPassword(passwordInput.value, user.password);
    if (!isValid) throw new Error("아이디 또는 비밀번호를 확인해 주세요.");
    setCurrentUser(user);
    location.replace(getSafeRedirect("planner.html"));
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
    passwordInput.select();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "로그인";
  }
});
