interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const dimensions = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" },
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: dimensions.icon, height: dimensions.icon }}>
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E85D3A" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#logo-grad)" />
          <path d="M50 18L22 40v32a4 4 0 004 4h16V58h16v18h16a4 4 0 004-4V40L50 18z" fill="white" className="drop-shadow-sm" />
          <rect x="43" y="62" width="14" height="12" rx="2" fill="#E85D3A" />
          <rect x="30" y="44" width="10" height="10" rx="1.5" fill="white" opacity="0.8" />
          <rect x="60" y="44" width="10" height="10" rx="1.5" fill="white" opacity="0.8" />
          <circle cx="72" cy="28" r="10" fill="#FFD700" opacity="0.9" />
          <line x1="72" y1="14" x2="72" y2="10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="72" y1="42" x2="72" y2="46" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="58" y1="28" x2="54" y2="28" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="86" y1="28" x2="90" y2="28" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="62" y1="18" x2="59" y2="15" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="82" y1="38" x2="85" y2="41" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="82" y1="18" x2="85" y2="15" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="62" y1="38" x2="59" y2="41" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold text-gray-900 ${dimensions.text}`}>Maputo</span>
          <span className={`font-light text-primary -mt-1 ${size === "sm" ? "text-xs" : "text-sm"}`}>Properties</span>
        </div>
      )}
    </div>
  );
}
