import ClientTyping from './components/ClientTyping';
import Image from 'next/image';
import BounceCards from './components/BounceCards';

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
  'rotate(8deg) translate(-400px)',
  'rotate(5deg) translate(-300px)',
  'rotate(-2deg) translate(-200px)',
  'rotate(3deg) translate(-100px)',
  'rotate(-10deg) translate(-50px)',
  'rotate(0deg)',
  'rotate(2deg) translate(50px)',
  'rotate(-6deg) translate(100px)',
  'rotate(5deg) translate(200px)',
  'rotate(-5deg) translate(300px)',
  'rotate(-8deg) translate(400px)',
];

export default function Home() {
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
              containerWidth={1200}
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
    </div>
  );
}
