import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function LogoIdea1Icon({ size = 48, className, ...props }: LogoProps) {
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
        <filter id="react-logo1-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="react-logo1-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A2A" />
          <stop offset="40%" stopColor="#FF5520" />
          <stop offset="75%" stopColor="#FF7E33" />
          <stop offset="100%" stopColor="#FFA86B" />
        </linearGradient>
      </defs>

      <g filter="url(#react-logo1-glow)">
        <path 
          d="M 104 360 L 216 152 L 312 360" 
          fill="none" 
          stroke="url(#react-logo1-red-grad)" 
          strokeWidth="32" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 288 152 L 408 360" 
          fill="none" 
          stroke="url(#react-logo1-red-grad)" 
          strokeOpacity="0.8"
          strokeWidth="32" 
          strokeLinecap="round" 
        />
        <path 
          d="M 408 152 L 304 330" 
          fill="none" 
          stroke="url(#react-logo1-red-grad)" 
          strokeWidth="32" 
          strokeLinecap="round" 
        />
        <circle cx="216" cy="152" r="9" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export default LogoIdea1Icon;
