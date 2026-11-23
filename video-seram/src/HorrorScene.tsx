import React from 'react';
import {
  AbsoluteFill,
  // Audio,
  interpolate,
  random,
  Sequence,
  // staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FogLayer } from './FogLayer';
import { BloodDripText } from './BloodDripText';

export const HorrorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: 'clamp',
  });

  const isFlickering = random(`flicker-${frame}`) > 0.85;
  const flickerOpacity = isFlickering ? 0.15 : 1;

  const shakeX = isFlickering ? (random(`x-${frame}`) - 0.5) * 16 : 0;
  const shakeY = isFlickering ? (random(`y-${frame}`) - 0.5) * 8 : 0;

  const masterOpacity = interpolate(
    frame,
    [0, 25, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const letterSpacing = interpolate(frame, [0, durationInFrames], [4, 18]);
  const redGlowOpacity = 0.15 + Math.sin(frame / 10) * 0.08;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050505',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* 
        BUANG KOMEN DI BAWAH (dan pada import Audio & staticFile di atas) 
        selepas anda letakkan fail .mp3 dalam folder video-seram/public/
      */}
      {/*
      <Audio
        src={staticFile('drone-seram.mp3')}
        volume={(f) =>
          interpolate(
            f,
            [0, 30, durationInFrames - 25, durationInFrames],
            [0, 0.7, 0.7, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      <Sequence from={75}>
        <Audio src={staticFile('glitch-sfx.mp3')} volume={0.85} />
      </Sequence>
      */}

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, rgba(139, 0, 0, ${redGlowOpacity}) 0%, rgba(0, 0, 0, 0.98) 75%)`,
        }}
      />

      <FogLayer />

      <div
        style={{
          opacity: masterOpacity * flickerOpacity,
          transform: `scale(${scale}) translate(${shakeX}px, ${shakeY}px)`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <BloodDripText
          text="JANGAN MENOLEH"
          letterSpacing={letterSpacing}
          isFlickering={isFlickering}
        />

        <Sequence from={75} layout="none">
          <p
            style={{
              color: '#a80000',
              fontSize: 32,
              letterSpacing: '8px',
              marginTop: 48,
              textTransform: 'uppercase',
              opacity: random(`sub-${frame}`) > 0.2 ? 0.9 : 0.2,
            }}
          >
            ia berada di belakang anda...
          </p>
        </Sequence>
      </div>

      <AbsoluteFill
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </AbsoluteFill>
  );
};