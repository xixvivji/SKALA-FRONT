import { getCurrentUser, redirectToLogin } from "../core/auth.js";
import { destinations, findDestination } from "../data/destinations.js?v=2";
import { loadData, saveData } from "../core/storage.js";

const user = getCurrentUser();
if (!user) redirectToLogin();
else initializePlanner();

function initializePlanner() {
  const STORAGE_KEY = "travel-plans";
  const elements = {
    tripList: document.getElementById("trip-list"),
    empty: document.getElementById("planner-empty"),
    workspace: document.getElementById("trip-workspace"),
    dialog: document.getElementById("trip-dialog"),
    tripForm: document.getElementById("trip-form"),
    tripDialogTitle: document.getElementById("trip-dialog-title"),
    title: document.getElementById("trip-title"),
    destination: document.getElementById("destination-select"),
    start: document.getElementById("trip-start"),
    end: document.getElementById("trip-end"),
    activeTitle: document.getElementById("active-trip-title"),
    location: document.getElementById("trip-location"),
    period: document.getElementById("trip-period"),
    dday: document.getElementById("trip-dday"),
    destinationLink: document.getElementById("destination-link"),
    calendarTitle: document.getElementById("calendar-title"),
    calendar: document.getElementById("calendar-grid"),
    selectedDateTitle: document.getElementById("selected-date-title"),
    todoForm: document.getElementById("todo-form"),
    kind: document.getElementById("todo-kind"),
    input: document.getElementById("todo-input"),
    time: document.getElementById("todo-time"),
    timeField: document.getElementById("todo-time-field"),
    todoSubmit: document.getElementById("todo-submit"),
    todoCancel: document.getElementById("todo-cancel"),
    filters: document.querySelector(".todo-filters"),
    list: document.getElementById("todo-list"),
    todoEmpty: document.getElementById("todo-empty"),
    summary: document.getElementById("todo-summary")
  };

  let plans = loadData(STORAGE_KEY, []).map(normalizePlan);
  let activePlanId = plans.find((plan) => plan.userId === user.userId)?.id ?? null;
  let selectedDate = "";
  let calendarMonth = "";
  let editingItemId = null;
  let editingTripId = null;
  let currentFilter = "all";

  document.getElementById("plan-owner").textContent = `${user.username}님의 여행`;
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = destination.name;
    elements.destination.appendChild(option);
  });

  function createId() {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function normalizePlan(plan) {
    const today = toDateKey(new Date());
    return {
      ...plan,
      id: plan.id || createId(),
      title: plan.title || `${findDestination(plan.destinationId)?.name || "나의"} 여행`,
      destinationId: findDestination(plan.destinationId) ? plan.destinationId : destinations[0].id,
      startDate: plan.startDate || today,
      endDate: plan.endDate && plan.endDate >= (plan.startDate || today) ? plan.endDate : (plan.startDate || today),
      items: (plan.items || []).map((item) => ({ ...item, kind: item.kind || (item.time ? "schedule" : "preparation") }))
    };
  }

  function userPlans() {
    return plans.filter((plan) => plan.userId === user.userId);
  }

  function activePlan() {
    return plans.find((plan) => plan.id === activePlanId && plan.userId === user.userId);
  }

  function savePlans() {
    saveData(STORAGE_KEY, plans);
  }

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseDate(value) {
    return new Date(`${value}T00:00:00`);
  }

  function formatDate(value, options = { year: "numeric", month: "long", day: "numeric" }) {
    return new Intl.DateTimeFormat("ko-KR", options).format(parseDate(value));
  }

  function monthKey(value) {
    return value.slice(0, 7);
  }

  function getDday(plan) {
    const today = parseDate(toDateKey(new Date()));
    const start = parseDate(plan.startDate);
    const end = parseDate(plan.endDate);
    if (today < start) return `D-${Math.ceil((start - today) / 86400000)}`;
    if (today <= end) return "여행 중";
    return "여행 완료";
  }

  function selectPlan(id) {
    activePlanId = id;
    const plan = activePlan();
    selectedDate = plan?.startDate || "";
    calendarMonth = plan?.startDate ? monthKey(plan.startDate) : monthKey(toDateKey(new Date()));
    resetItemForm();
    render();
  }

  function openTripDialog(plan = null) {
    editingTripId = plan?.id ?? null;
    elements.tripDialogTitle.textContent = plan ? "여행 기본정보 수정" : "새 여행 만들기";
    elements.tripForm.reset();
    elements.title.value = plan?.title || "";
    elements.destination.value = plan?.destinationId || new URLSearchParams(location.search).get("city") || destinations[0].id;
    elements.start.value = plan?.startDate || toDateKey(new Date());
    elements.end.value = plan?.endDate || elements.start.value;
    elements.end.min = elements.start.value;
    elements.dialog.showModal();
    elements.title.focus();
  }

  function closeTripDialog() {
    elements.dialog.close();
    editingTripId = null;
  }

  function resetItemForm() {
    editingItemId = null;
    elements.todoForm.reset();
    elements.kind.value = "schedule";
    elements.timeField.hidden = false;
    elements.todoSubmit.textContent = "항목 추가";
    elements.todoCancel.hidden = true;
  }

  function renderTripList() {
    elements.tripList.replaceChildren();
    userPlans().forEach((plan) => {
      const destination = findDestination(plan.destinationId);
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.planId = plan.id;
      button.className = plan.id === activePlanId ? "is-active" : "";
      const title = document.createElement("strong");
      title.textContent = plan.title;
      const meta = document.createElement("span");
      meta.textContent = `${destination?.name || "여행"} · ${formatDate(plan.startDate, { month: "short", day: "numeric" })}`;
      button.append(title, meta);
      item.appendChild(button);
      elements.tripList.appendChild(item);
    });
  }

  function renderOverview(plan) {
    const destination = findDestination(plan.destinationId);
    elements.activeTitle.textContent = plan.title;
    elements.location.textContent = `${destination?.englishName || "Trip"} · Korea`;
    elements.period.textContent = `${formatDate(plan.startDate)} – ${formatDate(plan.endDate)}`;
    elements.dday.textContent = getDday(plan);
    elements.destinationLink.href = `destination.html?city=${plan.destinationId}`;
  }

  function renderCalendar(plan) {
    const [year, month] = calendarMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    elements.calendarTitle.textContent = `${year}년 ${month}월`;
    elements.calendar.replaceChildren();

    for (let index = 0; index < firstDay.getDay(); index += 1) {
      const blank = document.createElement("span");
      blank.className = "calendar-blank";
      elements.calendar.appendChild(blank);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      const date = toDateKey(new Date(year, month - 1, day));
      const dayItems = plan.items.filter((item) => item.date === date);
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.date = date;
      button.disabled = date < plan.startDate || date > plan.endDate;
      button.className = [date === selectedDate ? "is-selected" : "", date === toDateKey(new Date()) ? "is-today" : ""].filter(Boolean).join(" ");
      button.setAttribute("aria-label", `${formatDate(date)}${dayItems.length ? `, 항목 ${dayItems.length}개` : ""}`);
      const number = document.createElement("span");
      number.textContent = day;
      button.appendChild(number);
      if (dayItems.length) {
        const markers = document.createElement("span");
        markers.className = "calendar-markers";
        markers.innerHTML = `<i class="schedule-dot"></i>${dayItems.some((item) => item.kind === "preparation") ? '<i class="preparation-dot"></i>' : ""}`;
        button.appendChild(markers);
      }
      elements.calendar.appendChild(button);
    }
  }

  function visibleDayItems(plan) {
    const items = plan.items.filter((item) => item.date === selectedDate);
    if (currentFilter === "done") return items.filter((item) => item.done);
    if (currentFilter !== "all") return items.filter((item) => item.kind === currentFilter);
    return items;
  }

  function renderDay(plan) {
    const allItems = plan.items.filter((item) => item.date === selectedDate);
    const items = visibleDayItems(plan).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
    elements.selectedDateTitle.textContent = formatDate(selectedDate, { month: "long", day: "numeric", weekday: "long" });
    elements.summary.textContent = `전체 ${allItems.length}개 · 완료 ${allItems.filter((item) => item.done).length}개`;
    elements.list.replaceChildren();

    items.forEach((todo) => {
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
      const meta = document.createElement("span");
      meta.className = `item-kind ${todo.kind}`;
      meta.textContent = todo.kind === "schedule" ? `시간 일정${todo.time ? ` · ${todo.time}` : ""}` : "준비 항목";
      const text = document.createElement("span");
      text.textContent = todo.text;
      content.append(meta, text);
      const actions = document.createElement("div");
      actions.className = "schedule-actions";
      actions.innerHTML = `<button type="button" data-action="edit" aria-label="${todo.text} 수정">수정</button><button type="button" class="todo-delete" data-action="delete" aria-label="${todo.text} 삭제">×</button>`;
      item.append(checkbox, content, actions);
      elements.list.appendChild(item);
    });
    elements.todoEmpty.hidden = items.length > 0;
  }

  function render() {
    const plan = activePlan();
    renderTripList();
    elements.empty.hidden = Boolean(plan);
    elements.workspace.hidden = !plan;
    if (!plan) return;
    renderOverview(plan);
    renderCalendar(plan);
    renderDay(plan);
  }

  document.getElementById("new-trip").addEventListener("click", () => openTripDialog());
  document.querySelector("[data-create-trip]").addEventListener("click", () => openTripDialog());
  document.getElementById("close-trip-dialog").addEventListener("click", closeTripDialog);
  document.getElementById("cancel-trip").addEventListener("click", closeTripDialog);
  document.getElementById("edit-trip").addEventListener("click", () => openTripDialog(activePlan()));

  elements.start.addEventListener("change", () => {
    elements.end.min = elements.start.value;
    if (elements.end.value < elements.start.value) elements.end.value = elements.start.value;
  });

  elements.tripForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (elements.end.value < elements.start.value) return;
    if (editingTripId) {
      plans = plans.map((plan) => plan.id === editingTripId ? { ...plan, title: elements.title.value.trim(), destinationId: elements.destination.value, startDate: elements.start.value, endDate: elements.end.value } : plan);
      activePlanId = editingTripId;
    } else {
      const plan = { id: createId(), userId: user.userId, title: elements.title.value.trim(), destinationId: elements.destination.value, startDate: elements.start.value, endDate: elements.end.value, items: [] };
      plans.push(plan);
      activePlanId = plan.id;
    }
    savePlans();
    closeTripDialog();
    selectPlan(activePlanId);
  });

  elements.tripList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan-id]");
    if (button) selectPlan(button.dataset.planId);
  });

  document.getElementById("delete-trip").addEventListener("click", () => {
    const plan = activePlan();
    if (!plan || !confirm(`‘${plan.title}’ 여행을 삭제할까요?`)) return;
    plans = plans.filter((item) => item.id !== plan.id);
    savePlans();
    activePlanId = userPlans()[0]?.id ?? null;
    if (activePlanId) selectPlan(activePlanId);
    else render();
  });

  elements.calendar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-date]");
    if (!button || button.disabled) return;
    selectedDate = button.dataset.date;
    resetItemForm();
    renderCalendar(activePlan());
    renderDay(activePlan());
    elements.input.focus();
  });

  function moveMonth(offset) {
    const [year, month] = calendarMonth.split("-").map(Number);
    const next = new Date(year, month - 1 + offset, 1);
    calendarMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
    renderCalendar(activePlan());
  }
  document.getElementById("calendar-prev").addEventListener("click", () => moveMonth(-1));
  document.getElementById("calendar-next").addEventListener("click", () => moveMonth(1));

  elements.kind.addEventListener("change", () => {
    elements.timeField.hidden = elements.kind.value === "preparation";
    if (elements.timeField.hidden) elements.time.value = "";
  });

  elements.todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const plan = activePlan();
    const text = elements.input.value.trim();
    if (!plan || !text || !selectedDate) return;
    if (editingItemId) {
      plan.items = plan.items.map((item) => item.id === editingItemId ? { ...item, text, kind: elements.kind.value, time: elements.kind.value === "schedule" ? elements.time.value : "" } : item);
    } else {
      plan.items.push({ id: createId(), text, kind: elements.kind.value, date: selectedDate, time: elements.kind.value === "schedule" ? elements.time.value : "", done: false });
    }
    savePlans();
    resetItemForm();
    renderCalendar(plan);
    renderDay(plan);
  });

  elements.input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      elements.todoForm.requestSubmit();
    }
  });
  elements.todoCancel.addEventListener("click", () => { resetItemForm(); renderDay(activePlan()); });

  elements.list.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const plan = activePlan();
    const id = control.closest(".todo-item")?.dataset.id;
    const todo = plan?.items.find((item) => item.id === id);
    if (!plan || !todo) return;
    if (control.dataset.action === "delete") plan.items = plan.items.filter((item) => item.id !== id);
    if (control.dataset.action === "toggle") plan.items = plan.items.map((item) => item.id === id ? { ...item, done: !item.done } : item);
    if (control.dataset.action === "edit") {
      editingItemId = id;
      elements.input.value = todo.text;
      elements.kind.value = todo.kind;
      elements.time.value = todo.time || "";
      elements.timeField.hidden = todo.kind === "preparation";
      elements.todoSubmit.textContent = "수정 완료";
      elements.todoCancel.hidden = false;
      elements.input.focus();
      return;
    }
    savePlans();
    renderCalendar(plan);
    renderDay(plan);
  });

  elements.filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter;
    elements.filters.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
    renderDay(activePlan());
  });

  if (activePlanId) selectPlan(activePlanId);
  else render();
}
