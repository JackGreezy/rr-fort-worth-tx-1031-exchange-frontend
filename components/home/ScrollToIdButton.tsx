'use client';

type Props = {
  targetId: string;
  children: React.ReactNode;
  className?: string;
};

export default function ScrollToIdButton({ targetId, children, className }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}

