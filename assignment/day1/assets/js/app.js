import { getCurrentUser, redirectToLogin } from "./auth.js";
import { destinations, findDestination } from "./data/destinations.js";
import { loadData, saveData } from "./storage.js";

const currentUser = getCurrentUser();
if (!currentUser) {
  redirectToLogin();
} else {
  initializePlanner(currentUser);
}

function initializePlanner(user) {
  const STORAGE_KEY = "travel-plans";
  const tripForm = document.getElementById("trip-form");
  const tripTitle = document.getElementById("trip-title");
  const tripStart = document.getElementById("trip-start");
  const tripEnd = document.getElementById("trip-end");
  const todoForm = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const timeInput = document.getElementById("todo-time");
  const submitButton = document.getElementById("todo-submit");
  const cancelButton = document.getElementById("todo-cancel");
  const list = document.getElementById("todo-list");
  const filters = document.querySelector(".todo-filters");
  const summary = document.getElementById("todo-summary");
  const empty = document.getElementById("todo-empty");
  const destinationSelect = document.getElementById("destination-select");
  const destinationLink = document.getElementById("destination-link");
  document.getElementById("plan-owner").textContent = `${user.username}님의 여행`;

  let plans = loadData(STORAGE_KEY, []);
  let currentFilter = "all";
  let editingId = null;
  let currentDestination = new URLSearchParams(location.search).get("city");
  if (!findDestination(currentDestination)) currentDestination = destinations[0].id;

  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = destination.name;
    option.selected = destination.id === currentDestination;
    destinationSelect.appendChild(option);
  });

  function createId() {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getPlan(create = false) {
    let plan = plans.find((item) => item.userId === user.userId && item.destinationId === currentDestination);
    if (!plan && create) {
      plan = { id: createId(), userId: user.userId, destinationId: currentDestination, title: "", startDate: "", endDate: "", items: [] };
      plans.push(plan);
    }
    return plan;
  }

  function savePlans() {
    saveData(STORAGE_KEY, plans);
  }

  function sortItems(items) {
    return [...items].sort((a, b) => `${a.date}T${a.time || "23:59"}`.localeCompare(`${b.date}T${b.time || "23:59"}`));
  }

  function getVisibleItems(items) {
    if (currentFilter === "active") return items.filter((item) => !item.done);
    if (currentFilter === "done") return items.filter((item) => item.done);
    return items;
  }

  function formatDate(date, time) {
    const value = new Date(`${date}T${time || "00:00"}`);
    const dateText = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(value);
    return time ? `${dateText} · ${time}` : dateText;
  }

  function resetEdit() {
    editingId = null;
    todoForm.reset();
    submitButton.textContent = "일정 추가";
    cancelButton.hidden = true;
    syncDateLimits();
  }

  function syncDateLimits() {
    const plan = getPlan();
    dateInput.min = plan?.startDate || "";
    dateInput.max = plan?.endDate || "";
    const defaultDate = plan?.startDate || new Date().toISOString().slice(0, 10);
    if (!dateInput.value || (dateInput.min && dateInput.value < dateInput.min) || (dateInput.max && dateInput.value > dateInput.max)) {
      dateInput.value = defaultDate;
    }
  }

  function render() {
    const plan = getPlan();
    const items = sortItems(plan?.items || []);
    const visibleItems = getVisibleItems(items);
    list.replaceChildren();

    visibleItems.forEach((todo) => {
      const item = document.createElement("li");
      item.className = `todo-item schedule-item${todo.done ? " is-done" : ""}`;
      item.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.dataset.action = "toggle";
      checkbox.setAttribute("aria-label", `${todo.text} 완료 상태 변경`);

      const content = document.createElement("div");
      content.className = "schedule-content";
      const scheduleTime = document.createElement("time");
      scheduleTime.dateTime = `${todo.date}T${todo.time || "00:00"}`;
      scheduleTime.textContent = formatDate(todo.date, todo.time);
      const text = document.createElement("span");
      text.textContent = todo.text;
      content.append(scheduleTime, text);

      const actions = document.createElement("div");
      actions.className = "schedule-actions";
      const edit = document.createElement("button");
      edit.type = "button";
      edit.dataset.action = "edit";
      edit.setAttribute("aria-label", `${todo.text} 수정`);
      edit.textContent = "수정";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "todo-delete";
      remove.dataset.action = "delete";
      remove.setAttribute("aria-label", `${todo.text} 삭제`);
      remove.textContent = "×";
      actions.append(edit, remove);
      item.append(checkbox, content, actions);
      list.appendChild(item);
    });

    const doneCount = items.filter((item) => item.done).length;
    summary.textContent = `전체 ${items.length}개 · 완료 ${doneCount}개`;
    empty.hidden = visibleItems.length > 0;
    destinationLink.href = `destination.html?city=${currentDestination}`;
    tripTitle.value = plan?.title || "";
    tripStart.value = plan?.startDate || "";
    tripEnd.value = plan?.endDate || "";
    syncDateLimits();
  }

  tripForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (tripEnd.value < tripStart.value) {
      tripEnd.setCustomValidity("종료일은 시작일 이후여야 합니다.");
      tripEnd.reportValidity();
      return;
    }
    tripEnd.setCustomValidity("");
    const plan = getPlan(true);
    plan.title = tripTitle.value.trim();
    plan.startDate = tripStart.value;
    plan.endDate = tripEnd.value;
    savePlans();
    syncDateLimits();
    document.getElementById("trip-settings-title").textContent = `${plan.title} · 저장됨`;
  });

  tripStart.addEventListener("change", () => {
    tripEnd.min = tripStart.value;
    if (tripEnd.value && tripEnd.value < tripStart.value) tripEnd.value = tripStart.value;
  });
  tripEnd.addEventListener("input", () => tripEnd.setCustomValidity(""));

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    const plan = getPlan(true);
    if (editingId) {
      plan.items = plan.items.map((item) => item.id === editingId ? { ...item, text: value, date: dateInput.value, time: timeInput.value } : item);
    } else {
      plan.items.push({ id: createId(), text: value, date: dateInput.value, time: timeInput.value, done: false });
    }
    savePlans();
    resetEdit();
    render();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    todoForm.requestSubmit();
  });
  cancelButton.addEventListener("click", resetEdit);

  list.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const id = control.closest(".todo-item")?.dataset.id;
    const plan = getPlan();
    const todo = plan?.items.find((item) => item.id === id);
    if (!plan || !todo) return;

    if (control.dataset.action === "delete") {
      plan.items = plan.items.filter((item) => item.id !== id);
      if (editingId === id) resetEdit();
    } else if (control.dataset.action === "toggle") {
      plan.items = plan.items.map((item) => item.id === id ? { ...item, done: !item.done } : item);
    } else if (control.dataset.action === "edit") {
      editingId = id;
      input.value = todo.text;
      dateInput.value = todo.date;
      timeInput.value = todo.time;
      submitButton.textContent = "수정 완료";
      cancelButton.hidden = false;
      input.focus();
      return;
    }
    savePlans();
    render();
  });

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter;
    filters.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });

  destinationSelect.addEventListener("change", () => {
    currentDestination = destinationSelect.value;
    const url = new URL(location.href);
    url.searchParams.set("city", currentDestination);
    history.replaceState(null, "", url);
    resetEdit();
    render();
  });

  render();
}
