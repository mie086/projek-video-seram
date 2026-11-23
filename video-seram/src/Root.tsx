import React from 'react';
import { Composition } from 'remotion';
import { HorrorScene } from './HorrorScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HorrorIntro"
        component={HorrorScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};