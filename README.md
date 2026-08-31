# 부서 네비게이터 프로토타입

업무 상황을 입력하면 협의가 필요한 부서 후보를 안내하는 파일 기반 데모입니다.
데모 데이터는 `public/pilot_departments.json`에 포함되어 있어 별도의 데이터베이스나 외부 API 없이 실행할 수 있습니다.

## 요구 사항

- Node.js 22.13.0 이상
- pnpm 10.15.0 이상

Node.js 버전은 `.node-version`에, 패키지 매니저 버전은 `package.json`의 `packageManager`에 고정되어 있습니다.

## 다른 컴퓨터에서 실행하기

레포지토리를 클론한 뒤 프로젝트 폴더에서 실행합니다.

```bash
corepack enable
corepack prepare pnpm@10.15.0 --activate
pnpm install --frozen-lockfile
pnpm run dev -- --host 127.0.0.1 --port 3000
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

Windows PowerShell에서도 동일한 명령을 사용할 수 있습니다. `corepack` 명령을 찾을 수 없다면 Node.js를 공식 LTS 설치 파일로 다시 설치한 뒤 실행하세요.

## 검증 명령

```bash
pnpm run lint
pnpm run build
```

## Git에 포함되지 않는 파일

`node_modules`, `.next`, `dist`, `.vinext`, `.wrangler` 같은 생성물과 `.env*` 환경설정 파일은 `.gitignore`로 제외합니다. 가상환경을 저장할 필요가 없는 Node.js 프로젝트이며, `pnpm-lock.yaml`을 커밋하므로 `pnpm install --frozen-lockfile`로 동일한 의존성을 재설치할 수 있습니다.

환경변수가 필요한 경우 `.env.example`을 참고해 로컬에서 `.env.local`을 만들고 값을 입력하세요. `.env.local`은 절대 커밋하지 않습니다.
