import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function LogoIdea2Icon({ size = 48, className, ...props }: LogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      className={className} 
      {...props}
    >
      <defs>
        <filter id="react-logo2-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="react-logo2-bevel">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
        </filter>
        <linearGradient id="react-logo2-red-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="35%" stopColor="#FF2A2A" />
          <stop offset="75%" stopColor="#FF5520" />
          <stop offset="100%" stopColor="#FF7E33" />
        </linearGradient>
        <linearGradient id="react-logo2-red-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#990000" />
          <stop offset="50%" stopColor="#CC1111" />
          <stop offset="100%" stop-color="#FF3322" />
        </linearGradient>
      </defs>

      <g filter="url(#react-logo2-glow)">
        <path 
          d="
            M 104 364 
            L 72 364 
            L 216 138 
            L 256 138 
            L 328 364 
            L 272 364 
            L 236 240 
            L 164 240 
            Z
          " 
          fill="url(#react-logo2-red-primary)" 
          filter="url(#react-logo2-bevel)"
        />
        <polygon 
          points="272,138 316,138 440,364 396,364" 
          fill="url(#react-logo2-red-dark)" 
          filter="url(#react-logo2-bevel)"
        />
        <polygon 
          points="396,138 440,138 316,364 272,364" 
          fill="url(#react-logo2-red-primary)" 
          filter="url(#react-logo2-bevel)"
        />
        <line x1="356" y1="230" x2="368" y2="252" stroke="#FFA86B" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default LogoIdea2Icon;
