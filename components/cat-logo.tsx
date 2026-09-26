export function CatLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M9.5 21 14 7.5 21.5 18" fill="#ffb48a" />
      <path d="M38.5 21 34 7.5 26.5 18" fill="#ffb48a" />
      <circle cx="24" cy="27" r="14.5" fill="#ff7a3c" />
      <path d="M12.2 19.2 15.4 10.2 20 17.6" fill="#ffe0cf" />
      <path d="M35.8 19.2 32.6 10.2 28 17.6" fill="#ffe0cf" />
      <path
        d="M18.2 16.8c1.1-2.3 2.3-2.5 3.4-.2M29.8 16.8c-1.1-2.3-2.3-2.5-3.4-.2"
        stroke="#ef6428"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="24" cy="30.2" rx="7.2" ry="5.6" fill="#fff1e8" />
      <ellipse cx="18.1" cy="25.4" rx="2.15" ry="2.55" fill="#2c211c" />
      <ellipse cx="29.9" cy="25.4" rx="2.15" ry="2.55" fill="#2c211c" />
      <circle cx="18.7" cy="24.7" r="0.7" fill="#fff" />
      <circle cx="30.5" cy="24.7" r="0.7" fill="#fff" />
      <path d="M24 28.4 22.3 30.4h3.4Z" fill="#ef6d86" />
      <path
        d="M24 30.5v1.7"
        stroke="#e56a84"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M16.6 31.8c1.5.9 2.8 1 3.8.1M31.4 31.8c-1.5.9-2.8 1-3.8.1"
        stroke="#e39a86"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
