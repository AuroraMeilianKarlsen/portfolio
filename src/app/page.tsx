'use client';

import { useState } from 'react';
import DinoGameModal from './components/DinoGameModal';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import PictureGallerySection from './components/sections/PictureGallerySection';
import SkillsSection from './components/sections/SkillsSection';
import GameSection from './components/sections/GameSection';
import ContactSection from './components/sections/ContactSection';

export default function Home() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <main className="bg-gray-900 text-white">
      <HomeSection />
      <AboutSection />
      <PictureGallerySection />
      <SkillsSection />
      <GameSection onOpenGame={() => setIsGameOpen(true)} />
      <DinoGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      <ContactSection />
    </main>
  );
}
