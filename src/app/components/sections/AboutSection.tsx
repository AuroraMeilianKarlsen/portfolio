import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-12 scroll-mt-20" aria-label="Om meg">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6">Om meg</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="mt-4 text-gray-300">
              Mitt navn er Aurora Meilian Karlsen, og jeg studerer 3. året på
              bachelor i informatikk ved NTNU. Jeg er en utvikler som liker å
              bygge enkle og brukervennlige løsninger. Siden er mest for gøy og
              egen læring. Her har jeg utforsket kreativitet og testet ut litt
              interaktivt design.
            </p>
            <br />
            <ul className="text-gray-300 list-disc list-inside mt-4">
              <li>
                2020-2023: Bachelor i Biologi, spesialisering i Celle og
                Molekylærbiologi
              </li>
              <li>2023-2026: Bachelor i Informatikk</li>
            </ul>
          </div>
          <div className="flex gap-4">
            <Image
              src="/lab.jpg"
              alt="Laboratoriummiljø"
              width={250}
              height={250}
              className="w-56 h-56 rounded-lg object-cover"
            />
            <Image
              src="/pcAtDT.png"
              alt="Datamaskin ved skrivebord"
              width={250}
              height={250}
              className="w-56 h-56 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
