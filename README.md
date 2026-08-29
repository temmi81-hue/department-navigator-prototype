# 업무 지침 네비게이터 데모

`public/demo.html`은 `public/pilot_departments.json`의 검증된 15개 부서만 사용한다.
업무 상황 검색, 주관·협업 후보, 협업 후보 선택, 추천 근거, 검토 요청 확인, 메일 초안 작성을 제공한다.

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
