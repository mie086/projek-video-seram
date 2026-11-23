import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const FogLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const driftLayer1 = interpolate(frame, [0, durationInFrames], [-120, 120]);
  const driftLayer2 = interpolate(frame, [0, durationInFrames], [150, -150]);
  const fogOpacity = 0.25 + Math.sin(frame / 18) * 0.08;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="horror-fog-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="4"
              seed="7"
            />
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 -0.15"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: -200,
          filter: 'url(#horror-fog-filter) blur(18px)',
          transform: `translateX(${driftLayer1}px)`,
          opacity: fogOpacity,
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(160, 160, 170, 0.45) 0%, transparent 65%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: -200,
          filter: 'url(#horror-fog-filter) blur(26px)',
          transform: `translateX(${driftLayer2}px) scale(1.15)`,
          opacity: fogOpacity * 0.85,
          background:
            'radial-gradient(ellipse at 70% 45%, rgba(130, 30, 30, 0.35) 0%, transparent 70%)',
        }}
      />
    </AbsoluteFill>
  );
};