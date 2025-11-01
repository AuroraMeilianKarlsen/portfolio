'use client';

import { useState } from 'react';
import ClientTyping from './components/ClientTyping';
import Image from 'next/image';
import BounceCards from './components/BounceCards';
import DinoGameModal from './components/DinoGameModal';

const images = [
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.12.52.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.13.06.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.13.28.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.13.45.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.14.29.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.14.54.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.15.25.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.15.41.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.14.45.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.15.54.jpg',
  '/pictureGallery/Skjermbilde 2025-10-28 kl. 23.13.55.jpg',
];

const transformStyles = [
  'rotate(0deg) translate(-500px)',
  'rotate(0deg) translate(-400px)',
  'rotate(0deg) translate(-300px)',
  'rotate(0deg) translate(-200px)',
  'rotate(0deg) translate(-100px)',
  'rotate(0deg)',
  'rotate(0deg) translate(100px)',
  'rotate(0deg) translate(200px)',
  'rotate(0deg) translate(300px)',
  'rotate(0deg) translate(400px)',
  'rotate(0deg) translate(500px)',
];

export default function Home() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white">
      <section
        id="home"
        className="min-h-screen flex items-center px-6 scroll-mt-20"
      >
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">
              Hei,{' '}
              <span className="inline-block">
                <ClientTyping />
              </span>
            </h1>
            <p className="mt-4 text-gray-300">Velkommen til min side!</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/Aurora.jpg"
              alt="Profilbilde"
              width={440}
              height={560}
              priority
              className="h-auto w-full max-w-sm rounded-[16px] object-cover shadow-xl"
              sizes="(max-width: 1024px) 60vw, 480px"
            />
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Om meg</h2>
          <p className="mt-4 text-gray-300">
            Jeg er en utvikler som liker å bygge enkle og brukervennlige
            løsninger. Her kan du lese litt om meg, bakgrunnen min og hva jeg
            jobber med for tiden.
          </p>

          <p className="mt-4 text-gray-300">
            Jeg er i det siste blitt glad i å ta bilder, her er noen av mine
            nyligste knips fra Italia
          </p>

          <div className="mt-8 flex justify-center">
            <BounceCards
              className="custom-bounceCards"
              images={images}
              containerWidth={1000}
              containerHeight={500}
              animationDelay={1}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Skills</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-gray-300 sm:grid-cols-2">
            <li>TypeScript / React / Next.js</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
            <li>Design og UX</li>
          </ul>
        </div>
      </section>

      <section id="game" className="min-h-screen px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsGameOpen(true)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-lg font-semibold border-2 border-gray-600 hover:border-gray-500"
            >
              Spill mitt favoritt spill 🦕
            </button>
          </div>
        </div>
      </section>

      <DinoGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

      <section id="contact" className="min-h-screen px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Kontakt</h2>
          <p className="mt-4 text-gray-300">
            Ønsker du å komme i kontakt med meg?
          </p>
          <div className="mt-6 space-y-4 text-gray-300">
            <div>
              <a
                href="mailto:aurora.mk@icloud.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                aurora.mk@icloud.com
              </a>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a
                href="https://www.linkedin.com/in/aurora-meilian-karlsen-970b0b2b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/AuroraMeilianKarlsen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
