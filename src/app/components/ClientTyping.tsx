'use client';

import TextType from './TextType';

export default function ClientTyping() {
  return (
    <TextType
      as="span"
      className="text-indigo-400"
      text={['velkommen til min portfolio', 'her kan du se litt mer om meg :)', 'bare tull og tøys']}
      typingSpeed={75}
      pauseDuration={1500}
      deletingSpeed={40}
      loop={true}
      showCursor={true}
      cursorCharacter="|"
    />
  );
}
