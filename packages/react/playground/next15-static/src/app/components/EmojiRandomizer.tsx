'use client';

import React, { type FC, useEffect, useState } from 'react';
import type { SbBlokData } from '@storyblok/react';

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

interface EmojiRandomizerProps {
  blok: SbBlokData & {
    label?: string;
  };
}

/**
 * A component that displays a label and a random emoji that changes on click
 */
const EmojiRandomizer: FC<EmojiRandomizerProps> = ({ blok }) => {
  console.log('EmojiRandomizer', blok);

  // List of fun emojis to randomly choose from
  const emojis = ['😊', '🎉', '🚀', '✨', '🌈', '🎨', '🎸', '🎮', '🍕', '🌺'];

  // State to track current emoji
  const [currentEmoji, setCurrentEmoji] = useState(() =>
    emojis[Math.floor(Math.random() * emojis.length)],
  );
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  /**
   * Generates a new random emoji different from the current one
   */
  const randomizeEmoji = () => {
    let newEmoji;
    do {
      newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    } while (newEmoji === currentEmoji);

    setCurrentEmoji(newEmoji);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="text-6xl">
        {currentEmoji}
      </div>
      <button
        onClick={randomizeEmoji}
        className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-small transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
      >
        {blok.label || 'Randomize Emoji'}
      </button>
    </div>
  );
};

export default EmojiRandomizer;
