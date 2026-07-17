const $ = (selector) => document.querySelector(selector);
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
const config = window.SUPABASE_CONFIG;
const db = window.supabase?.createClient(config.url, config.publishableKey);
const toast = (message) => {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 2500);
};
const escapeHtml = (text) => { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; };

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

async function loadGitHubActivity() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthText = String(month + 1).padStart(2, '0');
  const lastDay = new Date(year, month + 1, 0).getDate();
  const range = `${year}-${monthText}-01..${year}-${monthText}-${String(lastDay).padStart(2, '0')}`;
  const cacheKey = `jiwon-github-commits-${year}-${monthText}`;
  const cacheDuration = 15 * 60 * 1000;
  let result;
  const cached = store.get(cacheKey, null);

  try {
    if (cached && Date.now() - cached.savedAt < cacheDuration) {
      result = cached.result;
    } else {
      const query = encodeURIComponent(`author:xixvivji committer-date:${range}`);
      const response = await fetch(`https://api.github.com/search/commits?q=${query}&per_page=100`, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error('GitHub API request failed');
      result = await response.json();
      store.set(cacheKey, { savedAt: Date.now(), result });
    }

    const commits = result.items || [];
    const repositories = new Set(commits.map((item) => item.repository.full_name));
    $('#monthlyCommits').textContent = result.total_count ?? commits.length;
    $('#activeRepos').textContent = repositories.size;
    $('#activityMonth').textContent = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(now).toUpperCase();

    const countsByDay = {};
    commits.forEach((item) => {
      const commitDate = item.commit.author?.date || item.commit.committer?.date;
      if (!commitDate) return;
      const day = new Date(commitDate).getDate();
      countsByDay[day] = (countsByDay[day] || 0) + 1;
    });
    $('#contributionGrid').innerHTML = Array.from({ length: lastDay }, (_, index) => {
      const day = index + 1;
      const count = countsByDay[day] || 0;
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
      return `<span class="level-${level}" title="${day}일 · ${count}개 커밋"><small>${day}</small></span>`;
    }).join('');
  } catch {
    $('#monthlyCommits').textContent = '—';
    $('#activeRepos').textContent = '—';
    $('#contributionGrid').innerHTML = Array.from({ length: lastDay }, (_, index) => `<span class="level-0" title="${index + 1}일"><small>${index + 1}</small></span>`).join('');
  }
}

async function loadGitHubProfileStats() {
  const cacheKey = 'jiwon-github-profile-stats';
  const cacheDuration = 30 * 60 * 1000;
  const cached = store.get(cacheKey, null);
  let profile;
  let repos;

  try {
    if (cached && Date.now() - cached.savedAt < cacheDuration) {
      ({ profile, repos } = cached);
    } else {
      const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };
      const [profileResponse, reposResponse] = await Promise.all([
        fetch('https://api.github.com/users/xixvivji', { headers }),
        fetch('https://api.github.com/users/xixvivji/repos?type=owner&sort=updated&per_page=100', { headers })
      ]);
      if (!profileResponse.ok || !reposResponse.ok) throw new Error('GitHub profile request failed');
      [profile, repos] = await Promise.all([profileResponse.json(), reposResponse.json()]);
      store.set(cacheKey, { savedAt: Date.now(), profile, repos });
    }

    const ownedRepos = repos.filter((repo) => !repo.fork);
    $('#publicRepos').textContent = profile.public_repos ?? repos.length;
    $('#totalStars').textContent = ownedRepos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);

    const languageCounts = ownedRepos.reduce((counts, repo) => {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
      return counts;
    }, {});
    const languageEntries = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const languageTotal = Object.values(languageCounts).reduce((total, count) => total + count, 0);
    $('#languageBars').innerHTML = languageEntries.length ? languageEntries.map(([language, count]) => {
      const percentage = Math.round((count / languageTotal) * 100);
      return `<div class="language-row"><span title="${escapeHtml(language)}">${escapeHtml(language)}</span><i><b style="width:${percentage}%"></b></i><small>${percentage}%</small></div>`;
    }).join('') : '<p>표시할 공개 저장소 언어가 없습니다.</p>';
  } catch {
    $('#publicRepos').textContent = '—';
    $('#totalStars').textContent = '—';
    $('#languageBars').innerHTML = '<p>GitHub API 요청 제한으로 언어 정보를 불러오지 못했습니다.</p>';
  }
}

const codeSamples = [
  'Hello, World!',
  'console.log("Hello, World!");',
  'System.out.println("Hello, World!");',
  'print("Hello, World!")',
  'printf("Hello, World!");',
  'echo "Hello, World!"',
  'SELECT * FROM developers;',
  'git status',
  'git add .',
  'git commit -m "feat: Hello, World!"',
  'git push origin main',
  'git pull origin main',
  'git checkout -b feature/hello',
  'git log --oneline',
  'git branch -a',
  'pwd',
  'ls -la',
  'mkdir hello-world',
  'touch README.md',
  'open .',
  'whoami',
  'clear'
];
let gameTimer = null;
let startedAt = 0;
let activeSample = '';

function calculateTyping() {
  const typed = $('#typingInput').value;
  if (!startedAt) {
    $('#gameScore').textContent = '000';
    return { cpm: 0 };
  }
  const elapsedMinutes = Math.max((Date.now() - startedAt) / 60000, 1 / 60);
  let correct = 0;
  for (let index = 0; index < typed.length; index += 1) if (typed[index] === activeSample[index]) correct += 1;
  const cpm = Math.round(correct / elapsedMinutes);
  $('#gameScore').textContent = String(cpm).padStart(3, '0');
  return { cpm };
}

async function finishGame() {
  clearInterval(gameTimer);
  gameTimer = null;
  $('#gameTime').textContent = ((Date.now() - startedAt) / 1000).toFixed(2);
  $('#typingInput').disabled = true;
  $('#startGame').disabled = false;
  const result = calculateTyping();
  const username = $('#gameUserId').value.trim();
  const password = $('#gamePassword').value;
  if (!username || password.length < 4) return toast('기록 저장을 위해 아이디와 비밀번호를 입력해 주세요.');
  const { error } = await db.rpc('submit_typing_score', {
    p_username: username,
    p_password: password,
    p_cpm: result.cpm,
    p_accuracy: 100
  });
  if (error) return toast(error.message);
  $('#bestScore').textContent = String(result.cpm).padStart(3, '0');
  toast(`${result.cpm}타 기록이 저장되었습니다.`);
  loadRanking();
}

$('#startGame').addEventListener('click', () => {
  if ($('#gameUserId').value.trim().length < 2 || $('#gamePassword').value.length < 4) return toast('아이디와 비밀번호를 먼저 입력해 주세요.');
  activeSample = codeSamples[Math.floor(Math.random() * codeSamples.length)];
  $('#typingPrompt').textContent = activeSample;
  $('#typingInput').value = '';
  $('#typingInput').disabled = false;
  $('#typingInput').focus();
  $('#startGame').disabled = true;
  $('#gameTime').textContent = '0.00';
  $('#gameScore').textContent = '000';
  startedAt = 0;
});
$('#typingInput').addEventListener('input', () => {
  if (!startedAt && $('#typingInput').value.length > 0) {
    startedAt = Date.now();
    gameTimer = setInterval(() => {
      $('#gameTime').textContent = ((Date.now() - startedAt) / 1000).toFixed(2);
      calculateTyping();
    }, 50);
  }
  calculateTyping();
  if ($('#typingInput').value === activeSample) finishGame();
});

async function loadRanking() {
  if (!db) return;
  const { data, error } = await db.from('typing_scores').select('username,cpm,created_at').order('cpm', { ascending: false }).limit(30);
  if (error) { $('#rankingList').innerHTML = '<li class="loading-row">DB 설정 후 랭킹이 표시됩니다.</li>'; return; }
  const unique = [];
  const seen = new Set();
  data.forEach((row) => { if (!seen.has(row.username) && unique.length < 10) { seen.add(row.username); unique.push(row); } });
  $('#rankingList').innerHTML = unique.length ? unique.map((row, index) => `<li><b>${index + 1}</b><span>${escapeHtml(row.username)}</span><strong>${row.cpm}타</strong><span>${new Date(row.created_at).toLocaleDateString('ko-KR')}</span></li>`).join('') : '<li class="loading-row">아직 등록된 기록이 없습니다.</li>';
}
$('#refreshRanking').addEventListener('click', loadRanking);

let guestbookRows = [];
let guestbookPage = 1;
const guestbookPageSize = 6;
async function loadMessages() {
  if (!db) return;
  const from = (guestbookPage - 1) * guestbookPageSize;
  const to = from + guestbookPageSize - 1;
  const { data, error, count } = await db.from('guestbook').select('id,username,message,created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
  if (error) { $('#messages').innerHTML = '<article class="message"><p>DB 설정 후 방명록이 표시됩니다.</p></article>'; return; }
  if (!data.length && guestbookPage > 1) { guestbookPage -= 1; return loadMessages(); }
  guestbookRows = data;
  $('#messages').innerHTML = data.length ? data.map((message) => `<article class="message"><b>${escapeHtml(message.username)}</b><time>${new Date(message.created_at).toLocaleDateString('ko-KR')}</time><div class="message-actions"><button type="button" data-action="edit" data-id="${message.id}">수정</button><button type="button" data-action="delete" data-id="${message.id}">삭제</button></div><p>${escapeHtml(message.message)}</p></article>`).join('') : '<article class="message"><p>첫 번째 메시지를 남겨주세요.</p></article>';
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
  const row = guestbookRows.find((item) => String(item.id) === button.dataset.id);
  if (!row) return;
  const password = window.prompt(`${row.username}님의 비밀번호를 입력해 주세요.`);
  if (!password) return;

  if (button.dataset.action === 'edit') {
    const message = window.prompt('수정할 메시지를 입력해 주세요.', row.message);
    if (message === null || message.trim() === row.message) return;
    const { error } = await db.rpc('update_guestbook', { p_id: row.id, p_username: row.username, p_password: password, p_message: message.trim() });
    if (error) return toast(error.message);
    toast('방명록을 수정했습니다.');
  } else {
    if (!window.confirm('이 방명록을 삭제할까요?')) return;
    const { error } = await db.rpc('delete_guestbook', { p_id: row.id, p_username: row.username, p_password: password });
    if (error) return toast(error.message);
    toast('방명록을 삭제했습니다.');
  }
  loadMessages();
});

$('#guestForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  const { error } = await db.rpc('add_guestbook', {
    p_username: $('#guestName').value.trim(),
    p_password: $('#guestPassword').value,
    p_message: $('#guestMessage').value.trim()
  });
  button.disabled = false;
  if (error) return toast(error.message);
  $('#guestMessage').value = '';
  toast('방명록이 등록되었습니다.');
  guestbookPage = 1;
  loadMessages();
});

const visitCount = store.get('jiwon-visits', 0) + 1;
store.set('jiwon-visits', visitCount);
$('#visitorCount').textContent = String(visitCount);
loadMessages();
loadRanking();
loadGitHubActivity();
loadGitHubProfileStats();

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
