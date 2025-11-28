import ClientTyping from '../ClientTyping';
import Image from 'next/image';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 scroll-mt-20"
      aria-label="Hjem"
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
            Informatikkstudent, og bachelor i Celle og Molekylær Biologi
          </p>
          <br />
          <br />
          <br />
          <h2 className="text-2xl font-semibold">Curriculum Vitae</h2>
          <p className="text-gray-300">
            Her kan du laste ned min CV i PDF format.
          </p>
          <a
            href="/AuroraMeilianKarlsenCV.pdf"
            download="Aurora_Meilian_Karlsen_CV.pdf"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
            aria-label="Last ned CV i PDF format"
          >
            Last ned CV
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/AuroraMKarlsenPortrait.png"
            alt="Profilbilde av Aurora Meilian Karlsen"
            width={440}
            height={560}
            priority
            className="h-auto w-full max-w-sm rounded-[16px] object-cover shadow-xl"
            sizes="(max-width: 1024px) 60vw, 480px"
          />
        </div>
      </div>
    </section>
  );
}
