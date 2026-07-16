import { loadData, saveData } from "./storage.js";

const USERS_KEY = "users";
const SESSION_KEY = "travel-current-user";
const ITERATIONS = 120000;

function bytesToBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function derivePassword(password, salt, iterations = ITERATIONS) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256
  );
  return new Uint8Array(bits);
}

export async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePassword(password, salt);
  return { salt: bytesToBase64(salt), hash: bytesToBase64(hash), iterations: ITERATIONS };
}

export async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const candidate = await derivePassword(password, base64ToBytes(record.salt), record.iterations);
  return bytesToBase64(candidate) === record.hash;
}

export function getUsers() {
  return loadData(USERS_KEY, []);
}

export function saveUsers(users) {
  return saveData(USERS_KEY, users);
}

export function getCurrentUser() {
  return loadData(SESSION_KEY, null);
}

export function setCurrentUser(user) {
  const session = { userId: user.userId, username: user.username };
  saveData(SESSION_KEY, session);
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSafeRedirect(fallback = "index.html") {
  const redirect = new URLSearchParams(location.search).get("redirect");
  if (!redirect) return fallback;
  try {
    const target = new URL(redirect, location.href);
    return target.origin === location.origin ? `${target.pathname}${target.search}${target.hash}` : fallback;
  } catch {
    return fallback;
  }
}

export function redirectToLogin() {
  const redirect = `${location.pathname}${location.search}${location.hash}`;
  location.replace(`login.html?redirect=${encodeURIComponent(redirect)}`);
}
