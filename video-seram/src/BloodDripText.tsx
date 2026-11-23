import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

interface BloodDripTextProps {
  text: string;
  letterSpacing: number;
  isFlickering: boolean;
}

const DRIPS = [
  { left: '12%', startFrame: 20, width: 6, maxHeight: 110 },
  { left: '28%', startFrame: 42, width: 8, maxHeight: 165 },
  { left: '47%', startFrame: 15, width: 5, maxHeight: 95 },
  { left: '63%', startFrame: 55, width: 9, maxHeight: 190 },
  { left: '81%', startFrame: 30, width: 6, maxHeight: 130 },
  { left: '91%', startFrame: 65, width: 7, maxHeight: 145 },
];

export const BloodDripText: React.FC<BloodDripTextProps> = ({
  text,
  letterSpacing,
  isFlickering,
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <h1
        style={{
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: `${letterSpacing}px`,
          margin: 0,
          background: 'linear-gradient(180deg, #e0e0e0 35%, #990000 75%, #4a0000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: isFlickering
            ? 'drop-shadow(4px 0px 0px #8b0000) drop-shadow(-4px 0px 0px #2b0000)'
            : 'drop-shadow(0px 0px 20px rgba(160, 0, 0, 0.7))',
        }}
      >
        {text}
      </h1>

      <div
        style={{
          position: 'absolute',
          top: '76%',
          left: 0,
          right: 0,
          height: 220,
          pointerEvents: 'none',
        }}
      >
        {DRIPS.map((drip, index) => {
          const dripHeight = interpolate(
            frame,
            [drip.startFrame, drip.startFrame + 85],
            [0, drip.maxHeight],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.in(Easing.quad),
            }
          );

          const dripOpacity = interpolate(
            frame,
            [drip.startFrame, drip.startFrame + 10],
            [0, 0.92],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: drip.left,
                top: 0,
                width: drip.width,
                height: dripHeight,
                opacity: dripOpacity,
                background: 'linear-gradient(180deg, #5c0000 0%, #9e0000 75%, #c40000 100%)',
                borderBottomLeftRadius: drip.width,
                borderBottomRightRadius: drip.width,
                boxShadow: '0 2px 6px rgba(150, 0, 0, 0.6)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};