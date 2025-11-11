'use client';

import { useState } from 'react';
import ClientTyping from './components/ClientTyping';
import Image from 'next/image';
import BounceCards from './components/BounceCards';
import DinoGameModal from './components/DinoGameModal';
import Card from './components/Card';

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
            <p className="mt-4 text-gray-300">
              {' '}
              Informatikkstudent, og bachelor i Celle og Molekylær Biologi
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/AuroraMKarlsenPortrait.png"
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

      <section id="about" className="px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Om meg</h2>
          <p className="mt-4 text-gray-300">
            Mitt navn er Aurora Meilian Karlsen, og jeg studerer 3. året på
            bachelor i informatikk ved NTNU. Jeg er en utvikler som liker å
            bygge enkle og brukervennlige løsninger. Siden er mest for gøy og
            egen læring. Her har jeg utforsket kreativitet og testet ut litt
            interaktivt design.
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

      <section id="skills" className="px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Skills</h2>

          {/* Språk */}
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-200 mb-4">Språk</h3>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/typescript.svg"
                  alt="TypeScript"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">TypeScript</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/javascript.svg"
                  alt="JavaScript"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">JavaScript</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/python.svg"
                  alt="Python"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Python</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/html5.svg"
                  alt="HTML5"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">HTML5</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/css.svg"
                  alt="CSS"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">CSS</span>
              </Card>
            </div>
          </div>

          {/* Teknologier */}
          <div className="mt-12">
            <h3 className="text-xl font-medium text-gray-200 mb-4">
              Teknologier
            </h3>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/react.svg"
                  alt="React"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">React</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/nextdotjs.svg"
                  alt="Next.js"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Next.js</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/firebase.svg"
                  alt="Firebase"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Firebase</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/spring.svg"
                  alt="Spring"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Spring</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/springboot.svg"
                  alt="Spring Boot"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Spring Boot</span>
              </Card>
            </div>
          </div>

          {/* Verktøy */}
          <div className="mt-12">
            <h3 className="text-xl font-medium text-gray-200 mb-4">Verktøy</h3>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/git.svg"
                  alt="Git"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Git</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/github.svg"
                  alt="GitHub"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">GitHub</span>
              </Card>
              <Card className="flex flex-col items-center gap-2">
                <Image
                  src="/skillLogo/docker.svg"
                  alt="Docker"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-sm text-gray-300">Docker</span>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="game" className="px-6 py-24 scroll-mt-20">
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

      <section id="contact" className="px-6 py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Kontakt</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="text-center">
              <a
                href="mailto:aurora.mk@icloud.com"
                className="text-blue-400 hover:text-blue-300 transition-colors block"
              >
                aurora.mk@icloud.com
              </a>
            </Card>
            <Card className="text-center">
              <a
                href="https://www.linkedin.com/in/aurora-meilian-karlsen-970b0b2b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors block"
              >
                LinkedIn
              </a>
            </Card>
            <Card className="text-center">
              <a
                href="https://github.com/AuroraMeilianKarlsen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors block"
              >
                GitHub
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
