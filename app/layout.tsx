import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '규정 길잡이 | 업무분장 더미파일 데모',
  description: '업무 상황을 바탕으로 협의할 부서 후보를 안내하는 파일 기반 데모',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
