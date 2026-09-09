"use client";

/**
 * 브라우저 인쇄 대화상자를 연다. 대상에서 "PDF로 저장"을 고르면 이력서 PDF가 된다.
 * 레이아웃은 globals.css 의 @media print 가 담당한다.
 */
export default function PrintButton({
  children = "PDF로 저장",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {children}
    </button>
  );
}
