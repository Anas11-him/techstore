import React from "react";

const icons = {
  Audio: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="28" stroke="#00555a" strokeWidth="2" strokeDasharray="4 3" opacity="0.4"/>
      <circle cx="36" cy="36" r="18" fill="rgba(0,85,90,0.2)" stroke="#ffc94b" strokeWidth="1.5"/>
      <circle cx="36" cy="36" r="8" fill="#00555a"/>
      <circle cx="36" cy="36" r="3" fill="#ffc94b"/>
      <path d="M20 28 Q16 36 20 44" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M52 28 Q56 36 52 44" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  Laptops: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="14" y="18" width="44" height="28" rx="4" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <rect x="18" y="22" width="36" height="20" rx="2" fill="rgba(0,85,90,0.3)"/>
      <rect x="22" y="25" width="28" height="14" rx="1" fill="rgba(255,201,75,0.08)" stroke="#ffc94b" strokeWidth="0.8"/>
      <path d="M8 46h56v2a4 4 0 01-4 4H12a4 4 0 01-4-4v-2z" fill="rgba(0,85,90,0.3)" stroke="#00555a" strokeWidth="1.5"/>
      <rect x="28" y="48" width="16" height="2" rx="1" fill="#ffc94b" opacity="0.5"/>
    </svg>
  ),
  Wearables: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="28" y="14" width="16" height="44" rx="8" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <rect x="30" y="22" width="12" height="28" rx="6" fill="rgba(0,85,90,0.4)" stroke="#ffc94b" strokeWidth="1"/>
      <circle cx="36" cy="36" r="4" fill="#ffc94b" opacity="0.8"/>
      <path d="M22 24 Q18 28 18 36 Q18 44 22 48" stroke="#ffc94b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M50 24 Q54 28 54 36 Q54 44 50 48" stroke="#ffc94b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  Cameras: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="10" y="24" width="52" height="34" rx="6" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <path d="M24 24v-6a2 2 0 012-2h20a2 2 0 012 2v6" fill="rgba(0,85,90,0.3)" stroke="#00555a" strokeWidth="1.5"/>
      <circle cx="36" cy="41" r="10" fill="rgba(0,85,90,0.3)" stroke="#ffc94b" strokeWidth="1.5"/>
      <circle cx="36" cy="41" r="6" fill="rgba(0,85,90,0.5)"/>
      <circle cx="36" cy="41" r="2.5" fill="#ffc94b" opacity="0.7"/>
      <circle cx="52" cy="30" r="3" fill="#ffc94b" opacity="0.5"/>
    </svg>
  ),
  Tablets: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="16" y="10" width="40" height="52" rx="6" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <rect x="20" y="16" width="32" height="36" rx="3" fill="rgba(0,85,90,0.3)" stroke="#ffc94b" strokeWidth="0.8"/>
      <circle cx="36" cy="57" r="2.5" fill="#ffc94b" opacity="0.5"/>
      <rect x="28" y="24" width="16" height="2" rx="1" fill="#ffc94b" opacity="0.3"/>
      <rect x="24" y="29" width="24" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)"/>
      <rect x="24" y="33" width="20" height="1.5" rx="0.75" fill="rgba(255,255,255,0.1)"/>
    </svg>
  ),
  Gaming: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <path d="M12 32c0-6 4-10 10-10h28c6 0 10 4 10 10l-4 16c-1 4-4 6-7 6s-5-2-7-4h-12c-2 2-4 4-7 4s-6-2-7-6L12 32z" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <line x1="24" y1="28" x2="24" y2="38" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <line x1="19" y1="33" x2="29" y2="33" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <circle cx="48" cy="30" r="2.5" fill="#ffc94b" opacity="0.7"/>
      <circle cx="54" cy="35" r="2.5" fill="#ffc94b" opacity="0.5"/>
      <circle cx="48" cy="40" r="2.5" fill="#ffc94b" opacity="0.3"/>
    </svg>
  ),
  Monitors: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="8" y="14" width="56" height="36" rx="5" fill="rgba(0,85,90,0.2)" stroke="#00555a" strokeWidth="1.5"/>
      <rect x="12" y="18" width="48" height="28" rx="3" fill="rgba(0,85,90,0.3)" stroke="#ffc94b" strokeWidth="0.8"/>
      <path d="M28 50v6h16v-6" stroke="#00555a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="56" x2="50" y2="56" stroke="#00555a" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="20" y="24" width="32" height="16" rx="2" fill="rgba(255,201,75,0.05)" stroke="#ffc94b" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="36" cy="32" r="3" fill="#ffc94b" opacity="0.3"/>
    </svg>
  ),
};

export default function ProductIcon({ category }) {
  return (
    <div style={{ zIndex: 1, position: "relative" }}>
      {icons[category] || (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="22" fill="rgba(0,85,90,0.2)" stroke="#ffc94b" strokeWidth="1.5"/>
          <text x="36" y="42" textAnchor="middle" fill="#ffc94b" fontSize="20" fontFamily="monospace">⚡</text>
        </svg>
      )}
    </div>
  );
}