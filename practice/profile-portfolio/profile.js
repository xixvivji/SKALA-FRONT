const $ = (selector) => document.querySelector(selector);
document.documentElement.classList.add('js-enhanced');
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
const REMEMBERED_GUEST_ID_KEY = 'jiwon-remembered-guest-id';
const THEME_MODE_KEY = 'jiwon-theme-mode';
const config = window.SUPABASE_CONFIG;
const db = window.supabase?.createClient(config.url, config.publishableKey);
const toast = (message) => {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 2500);
};
const escapeHtml = (text) => { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; };

function applyThemeMode(mode) {
  const vivid = mode === 'vivid';
  const dark = mode === 'dark';
  document.documentElement.dataset.theme = vivid ? 'vivid' : dark ? 'dark' : 'default';
  const colorButton = $('#themeToggle');
  const darkButton = $('#darkModeToggle');
  colorButton?.setAttribute('aria-pressed', String(vivid));
  darkButton?.setAttribute('aria-pressed', String(dark));
  if (colorButton) colorButton.textContent = vivid ? 'CALM MODE' : 'COLOR MODE';
  if (darkButton) darkButton.textContent = dark ? 'AUTO MODE' : 'DARK MODE';
}

applyThemeMode(store.get(THEME_MODE_KEY, 'default'));
$('#themeToggle')?.addEventListener('click', () => {
  const nextMode = document.documentElement.dataset.theme === 'vivid' ? 'default' : 'vivid';
  store.set(THEME_MODE_KEY, nextMode);
  applyThemeMode(nextMode);
});
$('#darkModeToggle')?.addEventListener('click', () => {
  const nextMode = document.documentElement.dataset.theme === 'dark' ? 'default' : 'dark';
  store.set(THEME_MODE_KEY, nextMode);
  applyThemeMode(nextMode);
});

const guestActionDialog = $('#guestActionDialog');
const guestActionForm = $('#guestActionForm');
let resolveGuestAction = null;

function closeGuestActionDialog(result = null) {
  if (!guestActionDialog.open) return;
  resolveGuestAction?.(result);
  resolveGuestAction = null;
  guestActionDialog.close();
}

function openGuestActionDialog({ mode, title, description, submitText, initialMessage = '' }) {
  const showMessage = mode === 'edit';
  $('#guestActionTitle').textContent = title;
  $('#guestActionDescription').textContent = description;
  $('#guestActionSubmit').replaceChildren(document.createTextNode(`${submitText} `), Object.assign(document.createElement('span'), { textContent: '↗' }));
  $('#guestActionPassword').value = '';
  $('#guestActionMessage').value = initialMessage;
  $('#guestActionMessageWrap').hidden = !showMessage;
  $('#guestActionMessage').required = showMessage;

  return new Promise((resolve) => {
    resolveGuestAction = resolve;
    guestActionDialog.showModal();
    requestAnimationFrame(() => (showMessage ? $('#guestActionMessage') : $('#guestActionPassword')).focus());
  });
}

guestActionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closeGuestActionDialog({
    password: $('#guestActionPassword').value,
    message: $('#guestActionMessage').value.trim()
  });
});
$('#guestActionCancel').addEventListener('click', () => closeGuestActionDialog());
$('#guestActionClose').addEventListener('click', () => closeGuestActionDialog());
guestActionDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeGuestActionDialog();
});
guestActionDialog.addEventListener('click', (event) => {
  if (event.target === guestActionDialog) closeGuestActionDialog();
});

const projects = {
  'mung-shall': {
    number: '01 · BACKEND / INFRA',
    title: 'Mung-Shall · AI 유기견 입양 지원 플랫폼',
    summary: '유기견과 입양 희망자를 연결하고, AI 추천과 실시간 상담을 지원하는 서비스입니다.',
    role: '추천·매칭 백엔드와 서비스 배포 인프라를 담당했습니다.',
    work: ['추천·매칭 기능을 위한 백엔드 구현', 'OpenVidu 연결 및 배포 환경 구성', '운영 과정의 연결 문제 분석과 안정화'],
    stack: ['Java', 'Spring', 'Docker', 'OpenVidu', 'Infra'],
    video: 'assets/videos/mungshall.mp4',
    url: 'https://github.com/xixvivji/mung-shall'
  },
  'z-invest': {
    number: '02 · SPRING / FINTECH',
    title: 'Z멋대로 · AI 투자 플랫폼',
    summary: '투자 데이터와 AI 기능을 결합해 모의 주식 거래 경험을 제공하는 핀테크 서비스입니다.',
    role: '외부 금융 API 연동과 주문을 포함한 핵심 백엔드 기능을 구현했습니다.',
    work: ['KIS API 연동과 주식 매수·매도 구현', '데이터베이스 및 스케줄링 로직 구성', 'FCM 기반 푸시 알림 기능 구현'],
    stack: ['Java', 'Spring', 'KIS API', 'Database', 'FCM'],
    video: 'assets/videos/z-invest.mp4',
    url: 'https://github.com/xixvivji/z-invest'
  },
  lumen: {
    number: '03 · AI / INFRA',
    title: 'LUMEN · AI 스마트 보행 지원 서비스',
    summary: '시각장애인이 주변 환경과 위험 요소를 인지하며 이동할 수 있도록 돕는 보행 지원 서비스입니다.',
    role: 'AI 기능과 사용자 기능을 연결하고 서비스가 동작할 수 있는 전체 구성을 함께 설계했습니다.',
    work: ['AI 기반 주변 환경 인식 기능 구성', '음성 경로 안내와 위험 지도 기능 연결', '서비스 통합과 실행 환경 구성'],
    stack: ['AI', 'Voice Guide', 'Risk Map', 'Infra'],
    video: 'assets/videos/lumen.mp4',
    url: 'https://github.com/xixvivji/C102_LUMEN_PROJECT'
  }
};

const projectModal = $('#projectModal');
let projectModalTrigger = null;
const modalFocusableSelector = 'a[href], button:not([disabled]), video[controls], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function closeProjectModal() {
  const video = $('#projectModalVideo');
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.hidden = false;
  $('#projectVideoFallback').hidden = true;
  projectModal.hidden = true;
  document.body.classList.remove('modal-open');
  projectModalTrigger?.focus();
}
function openProjectModal(projectKey, trigger) {
  const project = projects[projectKey];
  if (!project) return;
  projectModalTrigger = trigger;
  $('#projectModalNumber').textContent = project.number;
  $('#projectModalTitle').textContent = project.title;
  $('#projectModalSummary').textContent = project.summary;
  $('#projectModalRole').textContent = project.role;
  $('#projectModalWork').innerHTML = project.work.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  $('#projectModalStack').innerHTML = project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join('');
  const video = $('#projectModalVideo');
  video.hidden = false;
  video.setAttribute('aria-label', `${project.title} 포트폴리오 소개 영상`);
  video.src = project.video;
  $('#projectVideoFallback').hidden = true;
  $('#projectVideoFallbackLink').href = project.url;
  $('#projectModalLink').href = project.url;
  projectModal.hidden = false;
  document.body.classList.add('modal-open');
  $('.project-modal-close').focus();
}
document.querySelectorAll('.project-trigger').forEach((trigger) => trigger.addEventListener('click', (event) => {
  event.preventDefault();
  openProjectModal(trigger.dataset.project, trigger);
}));
$('.project-modal-close').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (event) => { if (event.target === projectModal) closeProjectModal(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !projectModal.hidden) closeProjectModal();
  if (event.key !== 'Tab' || projectModal.hidden) return;
  const focusable = [...projectModal.querySelectorAll(modalFocusableSelector)].filter((element) => !element.hidden);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
$('#projectModalVideo').addEventListener('error', () => {
  if (projectModal.hidden || !$('#projectModalVideo').getAttribute('src')) return;
  $('#projectModalVideo').hidden = true;
  $('#projectVideoFallback').hidden = false;
});

const aboutDetails = {
  personality: {
    label: 'ABOUT ME',
    title: '처음에는 조금 낯을 가리지만, 맡은 일은 끝까지 해냅니다.',
    text: '대체로 무던하고 다른 사람에게 피해를 주지 않으려고 합니다. 궁금한 것은 원리를 이해할 때까지 차근차근 살펴보는 편입니다.',
    cards: [
      { label: 'MBTI', value: 'INTP', text: '궁금한 것은 직접 확인하는 편' },
      { label: 'STYLE', value: '차분함', text: '천천히 살피고 끝까지 마무리' },
      { label: 'VALUE', value: '책임감', text: '맡은 일은 피해 주지 않게 처리' }
    ],
    tags: ['INTP', '낯가림', '무던함', '책임감']
  },
  study: {
    label: 'STUDY',
    title: '백엔드와 인프라를 중심으로 서비스의 흐름을 공부합니다.',
    text: 'Java와 Spring으로 기능을 만들고, Docker와 Cloud 환경에서 서비스가 어떻게 배포되고 운영되는지 이해하려고 합니다.',
    cards: [
      { label: 'LANGUAGE', value: 'Java', text: '기본기와 객체지향 중심으로 학습' },
      { label: 'BACKEND', value: 'Spring', text: 'API와 서비스 구조를 직접 구현' },
      { label: 'INFRA', value: 'Docker · AWS', text: '배포와 운영 흐름을 이해하기' }
    ],
    tags: ['Java', 'Spring', 'Docker', 'AWS']
  },
  record: {
    label: 'RECORD',
    title: '배운 것과 하루의 생각을 짧게라도 남기려고 합니다.',
    text: '공부하다 알게 된 내용, 프로젝트를 하며 겪은 일, 하루 일과와 감정을 DAILY LOG에 남기며 나중에 다시 돌아볼 수 있게 정리합니다.',
    cards: [
      { label: 'DAILY', value: '하루 기록', text: '날짜별로 일과와 기분 남기기' },
      { label: 'STUDY', value: '공부 메모', text: '새로 배운 개념을 짧게 정리' },
      { label: 'REVIEW', value: '회고', text: '프로젝트에서 겪은 문제 돌아보기' }
    ],
    tags: ['Daily Log', '공부 메모', '프로젝트 회고', '생각 정리']
  },
  hobby: {
    label: 'OFF THE CLOCK',
    title: '산책하면서 생각을 정리하고, 다른 사람의 Git을 구경합니다.',
    text: '좋은 코드 구조나 README, 프로젝트 구성을 보면 어떻게 만들었는지 살펴보는 것을 좋아합니다. 문득 궁금해진 것도 직접 찾아보며 알아갑니다.',
    cards: [
      { label: 'WALK', value: '산책', text: '걸으면서 머릿속 정리하기' },
      { label: 'GITHUB', value: 'Git 구경', text: '다른 사람 프로젝트 구조 살펴보기' },
      { label: 'SEARCH', value: '찾아보기', text: '궁금한 것은 그냥 넘기지 않기' }
    ],
    tags: ['산책', 'GitHub', '기록', '궁금한 것']
  },
  contact: {
    label: 'STUDY TOGETHER',
    title: '같이 공부하고 이야기할 수 있는 공간이면 좋겠습니다.',
    text: '아직 많이 부족하지만 함께 고민하며 배우고 싶습니다. Java와 Spring을 학습할 계획이 있다면 방명록으로 편하게 말을 걸어주세요.',
    cards: [
      { label: 'TOPIC', value: 'Java · Spring', text: '같이 이야기하기 좋은 주제' },
      { label: 'CHANNEL', value: '방명록', text: '짧은 질문이나 인사 남기기' },
      { label: 'MOOD', value: '편하게', text: '부담 없이 서로 배우기' }
    ],
    tags: ['공부 메이트', '질문 환영', '방명록', '성장']
  }
};

const aboutTabs = [...document.querySelectorAll('[data-about-tab]')];
const aboutDetail = {
  label: $('#aboutDetailLabel'),
  title: $('#aboutDetailTitle'),
  text: $('#aboutDetailText'),
  cards: $('#aboutDetailCards'),
  tags: $('#aboutDetailTags')
};
function renderAboutDetail(key) {
  const detail = aboutDetails[key];
  if (!detail || !aboutDetail.title) return;
  aboutTabs.forEach((tab) => {
    const active = tab.dataset.aboutTab === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  aboutDetail.label.textContent = detail.label;
  aboutDetail.title.textContent = detail.title;
  aboutDetail.text.textContent = detail.text;
  aboutDetail.cards.innerHTML = detail.cards.map((card) => `<div><small>${escapeHtml(card.label)}</small><strong>${escapeHtml(card.value)}</strong><p>${escapeHtml(card.text)}</p></div>`).join('');
  aboutDetail.tags.innerHTML = detail.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  $('#aboutDetail')?.animate?.([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 220 });
}
aboutTabs.forEach((tab) => tab.addEventListener('click', () => renderAboutDetail(tab.dataset.aboutTab)));

let guestbookRows = [];
let guestbookComments = [];
let guestbookPage = 1;
const guestbookPageSize = 6;

function getRememberedGuestId() {
  return store.get(REMEMBERED_GUEST_ID_KEY, '');
}

function rememberGuestId(username) {
  if (username) store.set(REMEMBERED_GUEST_ID_KEY, username);
}

function fillRememberedGuestId(root = document) {
  const rememberedId = getRememberedGuestId();
  if (!rememberedId) return;
  root.querySelectorAll('#guestName, .message-comment-form input[name="username"]').forEach((input) => {
    if (!input.value) input.value = rememberedId;
  });
}

function updateVisitorCount(count) {
  const target = $('#visitorCount');
  if (target) target.textContent = String(count || 0);
}

function commentsForMessage(messageId) {
  return guestbookComments.filter((comment) => String(comment.guestbook_id) === String(messageId));
}

function renderGuestbookComments(messageId) {
  const comments = commentsForMessage(messageId);
  return `<div class="message-comments">${comments.length ? comments.map((comment) => `<div class="message-comment"><div><b>${escapeHtml(comment.username)}</b><time>${new Date(comment.created_at).toLocaleDateString('ko-KR')}</time></div><p>${escapeHtml(comment.message)}</p><button type="button" data-action="delete-comment" data-comment-id="${comment.id}" data-comment-user="${escapeHtml(comment.username)}">삭제</button></div>`).join('') : '<p class="message-comment-empty">아직 댓글이 없습니다.</p>'}</div>`;
}

function renderGuestbookMessage(message) {
  const commentCount = commentsForMessage(message.id).length;
  return `<article class="message"><b>${escapeHtml(message.username)}</b><time>${new Date(message.created_at).toLocaleDateString('ko-KR')}</time><div class="message-actions"><button type="button" data-action="reply" data-id="${message.id}">댓글달기${commentCount ? ` ${commentCount}` : ''}</button><button type="button" data-action="edit" data-id="${message.id}">수정</button><button type="button" data-action="delete" data-id="${message.id}">삭제</button></div><p>${escapeHtml(message.message)}</p>${renderGuestbookComments(message.id)}<form class="message-comment-form" data-message-id="${message.id}" hidden><input name="username" minlength="2" maxlength="16" pattern="[A-Za-z0-9가-힣_-]{2,16}" autocomplete="username" placeholder="아이디" required><input name="password" type="password" minlength="4" maxlength="32" autocomplete="current-password" placeholder="비밀번호" required><input name="message" maxlength="120" placeholder="댓글을 입력하세요" required><button type="submit">등록</button></form></article>`;
}

async function loadMessages() {
  if (!db) return;
  const from = (guestbookPage - 1) * guestbookPageSize;
  const to = from + guestbookPageSize - 1;
  const { data, error, count } = await db.from('guestbook').select('id,username,message,created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
  if (error) { $('#messages').innerHTML = '<article class="message"><p>DB 설정 후 방명록이 표시됩니다.</p></article>'; return; }
  if (!data.length && guestbookPage > 1) { guestbookPage -= 1; return loadMessages(); }
  updateVisitorCount(count);
  guestbookRows = data;
  guestbookComments = [];
  const ids = data.map((message) => message.id);
  if (ids.length) {
    const { data: comments, error: commentsError } = await db.from('guestbook_comments').select('id,guestbook_id,username,message,created_at').in('guestbook_id', ids).order('created_at', { ascending: true });
    if (!commentsError) guestbookComments = comments || [];
  }
  $('#messages').innerHTML = data.length ? data.map(renderGuestbookMessage).join('') : '<article class="message"><p>첫 번째 방문 기록을 남겨주세요.</p></article>';
  fillRememberedGuestId($('#messages'));
  const totalPages = Math.max(1, Math.ceil((count || 0) / guestbookPageSize));
  $('#guestPagination').innerHTML = totalPages > 1 ? `<button type="button" data-page="${guestbookPage - 1}" ${guestbookPage === 1 ? 'disabled' : ''} aria-label="이전 페이지">←</button>${Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => `<button type="button" data-page="${page}" class="${page === guestbookPage ? 'active' : ''}" aria-label="${page}페이지" ${page === guestbookPage ? 'aria-current="page"' : ''}>${page}</button>`).join('')}<button type="button" data-page="${guestbookPage + 1}" ${guestbookPage === totalPages ? 'disabled' : ''} aria-label="다음 페이지">→</button>` : '';
}

$('#guestPagination').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-page]');
  if (!button || button.disabled) return;
  guestbookPage = Number(button.dataset.page);
  loadMessages();
});

$('#messages').addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  if (button.dataset.action === 'reply') {
    const form = button.closest('.message').querySelector('.message-comment-form');
    const willOpen = form.hidden;
    document.querySelectorAll('.message-comment-form').forEach((item) => { item.hidden = true; });
    form.hidden = !willOpen;
    if (willOpen) form.elements.username.focus();
    return;
  }

  if (button.dataset.action === 'delete-comment') {
    const result = await openGuestActionDialog({
      mode: 'delete',
      title: '댓글 삭제',
      description: `${button.dataset.commentUser}님의 댓글을 삭제하려면 비밀번호를 입력해 주세요.`,
      submitText: '삭제'
    });
    if (!result?.password) return;
    const { error } = await db.rpc('delete_guestbook_comment', { p_id: Number(button.dataset.commentId), p_username: button.dataset.commentUser, p_password: result.password });
    if (error) return toast(error.message);
    toast('댓글을 삭제했습니다.');
    loadMessages();
    return;
  }

  const row = guestbookRows.find((item) => String(item.id) === button.dataset.id);
  if (!row) return;

  if (button.dataset.action === 'edit') {
    const result = await openGuestActionDialog({
      mode: 'edit',
      title: '방문 기록 수정',
      description: `${row.username}님의 방문 기록을 수정하려면 메시지와 비밀번호를 입력해 주세요.`,
      submitText: '수정',
      initialMessage: row.message
    });
    if (!result?.password || !result.message || result.message === row.message) return;
    const { error } = await db.rpc('update_guestbook', { p_id: row.id, p_username: row.username, p_password: result.password, p_message: result.message });
    if (error) return toast(error.message);
    toast('방명록을 수정했습니다.');
  } else {
    const result = await openGuestActionDialog({
      mode: 'delete',
      title: '방문 기록 삭제',
      description: `${row.username}님의 방문 기록을 삭제하려면 비밀번호를 입력해 주세요.`,
      submitText: '삭제'
    });
    if (!result?.password) return;
    const { error } = await db.rpc('delete_guestbook', { p_id: row.id, p_username: row.username, p_password: result.password });
    if (error) return toast(error.message);
    toast('방명록을 삭제했습니다.');
  }
  loadMessages();
});

$('#messages').addEventListener('submit', async (event) => {
  const form = event.target.closest('.message-comment-form');
  if (!form) return;
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const username = form.elements.username.value.trim();
  submitButton.disabled = true;
  const { error } = await db.rpc('add_guestbook_comment', {
    p_guestbook_id: Number(form.dataset.messageId),
    p_username: username,
    p_password: form.elements.password.value,
    p_message: form.elements.message.value.trim()
  });
  submitButton.disabled = false;
  if (error) return toast(error.message);
  rememberGuestId(username);
  toast('댓글을 등록했습니다.');
  loadMessages();
});

$('#guestForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.submitter;
  const username = $('#guestName').value.trim();
  button.disabled = true;
  const { error } = await db.rpc('add_guestbook', {
    p_username: username,
    p_password: $('#guestPassword').value,
    p_message: $('#guestMessage').value.trim()
  });
  button.disabled = false;
  if (error) return toast(error.message);
  rememberGuestId(username);
  $('#guestMessage').value = '';
  toast('방명록이 등록되었습니다.');
  guestbookPage = 1;
  loadMessages();
});

fillRememberedGuestId();
loadMessages();

const backToTop = $('#backToTop');
const updateBackToTop = () => backToTop.classList.toggle('show', window.scrollY > 480);
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  window.scrollTo({ top: 0, behavior });
});
updateBackToTop();

const siteHeader = $('.site-header');
const navToggle = $('#navToggle');
function closeMobileMenu() {
  siteHeader.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', '메뉴 열기');
}
navToggle.addEventListener('click', () => {
  const willOpen = !siteHeader.classList.contains('menu-open');
  siteHeader.classList.toggle('menu-open', willOpen);
  navToggle.setAttribute('aria-expanded', String(willOpen));
  navToggle.setAttribute('aria-label', willOpen ? '메뉴 닫기' : '메뉴 열기');
});
document.querySelectorAll('#mainNav a').forEach((link) => link.addEventListener('click', closeMobileMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMobileMenu(); });

const dailyCalendar = $('#dailyCalendar');
if (dailyCalendar) {
  const DAILY_LOG_KEY = 'jiwon-daily-logs';
  const dailyLogs = store.get(DAILY_LOG_KEY, {});
  const today = new Date();
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDateKey = toDateKey(today);

  const dailyElements = {
    month: $('#dailyCalendarMonth'),
    selectedDate: $('#dailySelectedDate'),
    title: $('#dailyTitle'),
    tag: $('#dailyTag'),
    mood: $('#dailyMood'),
    note: $('#dailyNote'),
    form: $('#dailyEntryForm'),
    deleteButton: $('#dailyDelete'),
    count: $('#dailyLogCount'),
    recentList: $('#dailyRecentList')
  };

  const dailyTagLabels = {
    study: '공부',
    project: '프로젝트',
    daily: '일상',
    thought: '생각',
    rest: '휴식'
  };

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseDateKey(key) {
    return new Date(`${key}T00:00:00`);
  }

  function saveDailyLogs() {
    store.set(DAILY_LOG_KEY, dailyLogs);
  }

  function formatSelectedDate(key) {
    return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }).format(parseDateKey(key));
  }

  function renderDailyForm() {
    const entry = dailyLogs[selectedDateKey] || {};
    dailyElements.selectedDate.textContent = formatSelectedDate(selectedDateKey);
    dailyElements.title.value = entry.title || '';
    dailyElements.tag.value = entry.tag || 'study';
    dailyElements.mood.value = entry.mood || 'calm';
    dailyElements.note.value = entry.note || '';
    dailyElements.deleteButton.disabled = !dailyLogs[selectedDateKey];
  }

  function renderRecentLogs() {
    const entries = Object.entries(dailyLogs)
      .sort(([left], [right]) => right.localeCompare(left))
      .slice(0, 3);

    dailyElements.recentList.replaceChildren();
    if (!entries.length) {
      const empty = document.createElement('p');
      empty.className = 'daily-recent-empty';
      empty.textContent = '아직 남긴 기록이 없습니다.';
      dailyElements.recentList.appendChild(empty);
      return;
    }

    entries.forEach(([key, entry]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.date = key;
      button.className = key === selectedDateKey ? 'is-active' : '';
      button.innerHTML = `<span>${new Intl.DateTimeFormat('ko-KR', { month: 'short', day: 'numeric' }).format(parseDateKey(key))}</span><strong>${escapeHtml(entry.title || '제목 없는 하루')}</strong><small>${dailyTagLabels[entry.tag] || '기록'}</small>`;
      dailyElements.recentList.appendChild(button);
    });
  }

  function renderDailyCalendar() {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    dailyElements.month.textContent = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(visibleMonth);
    dailyElements.count.textContent = String(Object.keys(dailyLogs).filter((key) => key.startsWith(monthPrefix)).length);
    dailyCalendar.replaceChildren();

    for (let index = 0; index < firstDay.getDay(); index += 1) {
      const blank = document.createElement('span');
      blank.className = 'daily-blank';
      dailyCalendar.appendChild(blank);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      const date = new Date(year, month, day);
      const key = toDateKey(date);
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.date = key;
      button.className = [
        key === selectedDateKey ? 'is-selected' : '',
        key === toDateKey(today) ? 'is-today' : '',
        dailyLogs[key] ? 'has-entry' : ''
      ].filter(Boolean).join(' ');
      button.setAttribute('aria-label', `${formatSelectedDate(key)}${dailyLogs[key] ? ', 기록 있음' : ''}`);
      button.innerHTML = `<span>${day}</span>`;
      dailyCalendar.appendChild(button);
    }
    renderDailyForm();
    renderRecentLogs();
  }

  dailyCalendar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-date]');
    if (!button) return;
    selectedDateKey = button.dataset.date;
    renderDailyCalendar();
  });

  dailyElements.recentList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-date]');
    if (!button) return;
    selectedDateKey = button.dataset.date;
    const selectedDate = parseDateKey(selectedDateKey);
    visibleMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    renderDailyCalendar();
  });

  $('#dailyPrevMonth').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    renderDailyCalendar();
  });

  $('#dailyNextMonth').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    renderDailyCalendar();
  });

  dailyElements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    dailyLogs[selectedDateKey] = {
      title: dailyElements.title.value.trim() || '제목 없는 하루',
      tag: dailyElements.tag.value,
      mood: dailyElements.mood.value,
      note: dailyElements.note.value.trim()
    };
    saveDailyLogs();
    toast('하루 기록을 저장했습니다.');
    renderDailyCalendar();
  });

  dailyElements.deleteButton.addEventListener('click', () => {
    if (!dailyLogs[selectedDateKey]) return;
    delete dailyLogs[selectedDateKey];
    saveDailyLogs();
    toast('하루 기록을 삭제했습니다.');
    renderDailyCalendar();
  });

  renderDailyCalendar();
}

const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollEffects() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  document.body.style.setProperty('--section-progress', scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
}
window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);
updateScrollEffects();

const observedSections = [...document.querySelectorAll('main > section[id]')];
const sectionNavLinks = [...document.querySelectorAll('#mainNav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const sectionId = visible.target.id;
    document.body.dataset.activeSection = sectionId;
    sectionNavLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${sectionId}`;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-28% 0px -55%', threshold: [0, 0.15, 0.35] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const canTilt = window.matchMedia('(hover:hover) and (pointer:fine)').matches && !motionReduced;
if (canTilt) {
  document.querySelectorAll('.now-card').forEach((card) => {
    let tiltFrame = 0;
    card.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`);
        card.style.setProperty('--glow-x', `${x * 100}%`);
        card.style.setProperty('--glow-y', `${y * 100}%`);
        card.classList.add('is-tilting');
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(tiltFrame);
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}

const conversationQuestions = [
  '요즘 가장 재미있게 배우는 기술은 무엇인가요?',
  '최근 해결해서 가장 뿌듯했던 오류는 무엇인가요?',
  '처음 배운 프로그래밍 언어는 무엇인가요?',
  '지금 가장 만들어 보고 싶은 서비스는 무엇인가요?',
  '개발 공부가 잘되지 않을 때 어떻게 다시 시작하나요?',
  '함께 공부해 보고 싶은 주제가 있나요?'
];
let questionIndex = 0;
const dailyQuestion = $('#dailyQuestion');
const newQuestion = $('#newQuestion');
if (dailyQuestion && newQuestion) {
  newQuestion.addEventListener('click', () => {
    questionIndex = (questionIndex + 1) % conversationQuestions.length;
    dailyQuestion.animate?.([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 240 });
    dailyQuestion.textContent = conversationQuestions[questionIndex];
  });
}

const introOverlay = $('#introOverlay');
const introEnter = $('#introEnter');
const introSkip = $('#introSkip');
const replayIntro = $('#replayIntro');
const introBackground = [$('.site-header'), $('main'), $('footer'), $('#backToTop'), replayIntro].filter(Boolean);
let introEnableTimer = null;
let introCloseTimer = null;

function setIntroBackgroundInert(inert) {
  introBackground.forEach((element) => { element.inert = inert; });
}

function rememberIntro() {
  try { sessionStorage.setItem('jiwon-intro-seen', 'true'); } catch { /* Storage may be unavailable. */ }
}

function hasSeenIntro() {
  try { return sessionStorage.getItem('jiwon-intro-seen') === 'true'; } catch { return false; }
}

function openIntro() {
  if (!introOverlay) return;
  clearTimeout(introEnableTimer);
  clearTimeout(introCloseTimer);
  introOverlay.hidden = false;
  introOverlay.classList.remove('is-visible', 'is-closing');
  introEnter.disabled = true;
  document.body.classList.add('intro-open');
  setIntroBackgroundInert(true);
  void introOverlay.offsetWidth;
  introOverlay.classList.add('is-visible');
  introSkip.focus();
  introEnableTimer = setTimeout(() => {
    introEnter.disabled = false;
    introEnter.focus();
  }, motionReduced ? 0 : 2800);
}

function closeIntro() {
  if (!introOverlay || introOverlay.hidden || introOverlay.classList.contains('is-closing')) return;
  clearTimeout(introEnableTimer);
  rememberIntro();
  introOverlay.classList.add('is-closing');
  introCloseTimer = setTimeout(() => {
    introOverlay.hidden = true;
    introOverlay.classList.remove('is-visible', 'is-closing');
    document.body.classList.remove('intro-open');
    setIntroBackgroundInert(false);
    replayIntro.focus();
  }, motionReduced ? 0 : 950);
}

if (introOverlay && introEnter && introSkip && replayIntro) {
  introEnter.addEventListener('click', closeIntro);
  introSkip.addEventListener('click', closeIntro);
  replayIntro.addEventListener('click', openIntro);
  introOverlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeIntro();
    if (event.key === 'Enter' && !introEnter.disabled) closeIntro();
  });
  if (hasSeenIntro()) introOverlay.hidden = true;
  else openIntro();
}
