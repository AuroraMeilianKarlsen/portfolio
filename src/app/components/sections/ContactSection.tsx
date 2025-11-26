import Card from '../Card';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-6 py-12 scroll-mt-20"
      aria-label="Kontakt"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold">Kontakt</h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="text-center">
            <a
              href="mailto:aurora.mk@icloud.com"
              className="text-blue-400 hover:text-blue-300 transition-colors block"
              aria-label="Send e-post til aurora.mk@icloud.com"
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
              aria-label="Besøk LinkedIn-profil"
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
              aria-label="Besøk GitHub-profil"
            >
              GitHub
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}

