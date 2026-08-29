# 업무 지침 네비게이터 데모

`public/demo.html`은 `public/pilot_departments.json`의 검증된 25개 부서만 사용한다.
업무 상황 검색, 주관·협업 후보, 협업 후보 선택, 추천 근거, 검토 요청 확인, 메일 초안 작성을 제공한다.

# 25개 부서
1. 안전보건기획그룹
2. 안전QSS섹션
3. 환경자원기획그룹
4. 정도경영그룹
5. 투자관리그룹
6. 원료구매1그룹
7. 원료구매2그룹
8. 설비자재구매그룹
9. 기초소재품질섹션
10. 포항안전환경그룹
11. 광양안전환경그룹
12. 플랜트공사그룹
13. 플랜트안전섹션
14. 포항양극재정비섹션
15. 광양양극재정비섹션
16. 윤리경영사무국
17. 연구기획그룹
18. 세종지원섹션
19. 기초소재연구그룹
20. 양극재개발1그룹
21. 양극재개발2그룹
22. 재무기획그룹
23. 회계세무그룹
24. 세무섹션
25. 내부회계관리섹션


## 다른 PC에서 실행

1. Node.js LTS를 설치한다.
2. 프로젝트 폴더에서 아래 명령을 실행한다.

```powershell
corepack enable
pnpm install --frozen-lockfile
pnpm run dev -- --host 127.0.0.1 --port 3000
```

3. 브라우저에서 `http://localhost:3000/demo.html`을 연다.

`demo.html`은 JSON을 읽으므로 파일 탐색기에서 직접 열지 말고, 반드시 위 로컬 서버로 실행한다.

## GitHub에 포함할 파일

- `public/demo.html`
- `public/pilot_departments.json`
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- 설정 및 앱 소스 파일
- `.gitignore`, 이 README

`node_modules`, `.next`, `dist`, `.vinext`, `.wrangler` 및 원본 업무분장 문서는 포함하지 않는다.
