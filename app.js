const form = document.querySelector('#question-form');
const questionInput = document.querySelector('#question');
const answer = document.querySelector('#answer');
const summary = document.querySelector('#summary');
const primaryCard = document.querySelector('#primary-card');
const partnerCards = document.querySelector('#partner-cards');
const clarify = document.querySelector('#clarify');
let organizations = [];

const categoryTerms = {
  '안전': ['안전', '보건', '소방', '위험', '작업허가', '밀폐공간'],
  '환경': ['환경', '폐수', '배출', '폐기물', '화학물질', '에너지'],
  '품질': ['품질', '검사', 'audit', '인증'],
  '설비·정비': ['설비', '정비', '교체', '수리', '전기', '기계', '계장'],
  '투자·공사': ['투자', '공사', '설계', '엔지니어링', 'layout'],
  '구매·자재': ['구매', '원료', '자재', '발주'],
  '계약·용역': ['계약', '용역', '외주', '협력업체'],
  '생산·조업': ['생산', '조업', '제조', '공정'],
  '재무·회계': ['전결', '회계', '세무', '자금', 'ir'],
};
const sites = ['포항', '광양', '세종', '구미'];

async function loadKnowledgeBase() {
  const data = await fetch('/knowledge-base').then((response) => response.json());
  organizations = data.organizations;
}

function scoreOrganization(org, question) {
  const lower = question.toLowerCase();
  let score = 0;
  const matches = [];
  for (const [category, terms] of Object.entries(categoryTerms)) {
    if (terms.some((term) => lower.includes(term)) && org.work_categories.includes(category)) {
      score += 6;
      matches.push(category);
    }
  }
  for (const site of sites) {
    if (lower.includes(site) && org.applicable_sites.includes(site)) score += 5;
  }
  for (const keyword of org.keywords) {
    if (keyword.length > 1 && lower.includes(keyword.toLowerCase())) score += 2;
  }
  for (const term of ['계약', '용역', '외주', '협력']) {
    if (lower.includes(term) && `${org.organization_name} ${org.responsibility_text || ''}`.toLowerCase().includes(term)) {
      score += 4;
      matches.push(term);
    }
  }
  if (lower.includes('계약') || lower.includes('용역')) {
    if (org.organization_name === '법무그룹') { score += 8; matches.push('계약 법률검토'); }
    if (org.organization_name === '상생협력그룹') { score += 6; matches.push('협력작업 기준'); }
    if ((lower.includes('정비') || lower.includes('설비')) && org.organization_name === '설비기획그룹') { score += 8; matches.push('정비 용역계약'); }
  }
  if (lower.includes(org.organization_name.toLowerCase())) score += 12;
  return { org, score, matches };
}

function sourcePath(org) {
  return org.source_reference.source_path || `업무분장 > ${org.organization_name}`;
}

function cardMarkup(item, isPrimary) {
  if (!item || !item.org) {
    return '<div class="card-top"><span class="role">추가 확인 필요</span></div><h3>추천할 부서를 아직 정하지 못했습니다.</h3><p class="reason">업무 대상, 사업장 또는 계약 목적을 알려 주시면 더 정확히 안내할 수 있습니다.</p>';
  }
  const { org, score, matches } = item;
  const role = isPrimary ? '주관 부서 후보' : '협업 부서 후보';
  const confidence = score >= 12 ? '높음' : score >= 6 ? '보통' : '추가 확인 필요';
  const reason = matches.length ? `${matches.join('·')} 관련 책임업무가 질문과 일치합니다.` : '업무분장 책임업무와 질문의 주요 단어를 기준으로 제안했습니다.';
  const responsibility = (org.responsibility_text || '책임업무는 원문 확인이 필요합니다.').slice(0, 180);
  return `<div class="card-top"><span class="role">${role}</span><span class="confidence ${confidence === '높음' ? 'high' : ''}">${confidence}</span></div><h3>${org.organization_name}</h3><p class="reason">${reason}</p><div class="evidence"><span>업무분장 근거</span><p>${responsibility}</p><small>${sourcePath(org)}</small></div><button class="request-button" type="button">검토 요청 만들기</button>`;
}

function answerQuestion(question) {
  if (!organizations.length) {
    summary.textContent = '업무분장 지식베이스를 불러오는 중입니다. 잠시 후 다시 찾아보기를 눌러 주세요.';
    primaryCard.innerHTML = cardMarkup(null, true);
    partnerCards.innerHTML = '';
    clarify.textContent = '예: 용역의 목적, 대상 사업장, 설비·공사·구매 여부를 함께 입력해 주세요.';
    clarify.classList.remove('hidden');
    answer.classList.remove('hidden');
    return;
  }
  const ranked = organizations.map((org) => scoreOrganization(org, question)).sort((a, b) => b.score - a.score);
  const meaningful = ranked.filter((item) => item.score > 0);
  const candidates = meaningful.length ? meaningful : ranked.slice(0, 4);
  const mentionedSites = sites.filter((site) => question.includes(site));
  summary.textContent = `“${question}”와 관련된 업무분장 책임업무를 바탕으로 추천한 결과입니다.`;
  primaryCard.innerHTML = cardMarkup(candidates[0], true);
  partnerCards.innerHTML = candidates.slice(1, 4).map((item) => `<article class="department-card">${cardMarkup(item, false)}</article>`).join('');
  if (!mentionedSites.length && candidates.some((item) => item.org.applicable_sites.some((site) => sites.includes(site)))) {
    clarify.textContent = '더 정확한 추천을 위해 진행 사업장(포항·광양·세종·구미)을 알려 주세요.';
    clarify.classList.remove('hidden');
  } else {
    clarify.classList.add('hidden');
  }
  answer.classList.remove('hidden');
  answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (event) => { event.preventDefault(); const question = questionInput.value.trim(); if (question) answerQuestion(question); });
document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => { questionInput.value = button.dataset.question; answerQuestion(questionInput.value); }));
loadKnowledgeBase().catch(() => { summary.textContent = '지식베이스를 불러오지 못했습니다. 서버를 다시 실행해 주세요.'; answer.classList.remove('hidden'); });
