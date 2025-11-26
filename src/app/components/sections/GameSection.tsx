interface GameSectionProps {
  onOpenGame: () => void;
}

export default function GameSection({ onOpenGame }: GameSectionProps) {
  return (
    <section
      id="game"
      className="px-6 py-12 scroll-mt-20"
      aria-label="Spill"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenGame}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-lg font-semibold border-2 border-gray-600 hover:border-gray-500"
            aria-label="Åpne Dino-spill"
          >
            Spill mitt favoritt spill 🦕
          </button>
        </div>
      </div>
    </section>
  );
}

