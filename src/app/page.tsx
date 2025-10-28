import ClientTyping from './components/ClientTyping';
import Image from 'next/image';

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
            Jeg er i det siste blitt glad i å ta bilder, her er noen av mine nyligste knips fra Italia
          </p>
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
