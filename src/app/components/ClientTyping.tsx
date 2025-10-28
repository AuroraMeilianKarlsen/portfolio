'use client';

import TextType from './TextType';

export default function ClientTyping() {
  return (
    <TextType
      as="span"
      className="text-indigo-400"
      text={['velkommen til min portfolio']}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
    />
  );
}
