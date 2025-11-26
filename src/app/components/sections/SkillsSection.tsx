import Image from 'next/image';
import Card from '../Card';

interface Skill {
  name: string;
  icon?: string;
  iconAlt?: string;
  textIcon?: string;
}

const languages: Skill[] = [
  { name: 'Java', textIcon: 'J' },
  { name: 'Python', icon: '/skillLogo/python.svg', iconAlt: 'Python logo' },
  { name: 'CSS', icon: '/skillLogo/html5.svg', iconAlt: 'HTML5 logo' },
  {
    name: 'JavaScript',
    icon: '/skillLogo/javascript.svg',
    iconAlt: 'JavaScript logo',
  },
  {
    name: 'TypeScript',
    icon: '/skillLogo/typescript.svg',
    iconAlt: 'TypeScript logo',
  },
  { name: 'R', textIcon: 'R' },
  { name: 'SQL', textIcon: 'SQL' },
];

const technologies: Skill[] = [
  { name: 'React', icon: '/skillLogo/react.svg', iconAlt: 'React logo' },
  { name: 'Next.js', icon: '/skillLogo/nextdotjs.svg', iconAlt: 'Next.js logo' },
  { name: 'Tailwind', textIcon: 'TW' },
  { name: 'JavaFX', textIcon: 'JFX' },
  {
    name: 'Spring Boot',
    icon: '/skillLogo/springboot.svg',
    iconAlt: 'Spring Boot logo',
  },
];

const tools: Skill[] = [
  { name: 'Git', icon: '/skillLogo/git.svg', iconAlt: 'Git logo' },
  { name: 'GitHub', icon: '/skillLogo/github.svg', iconAlt: 'GitHub logo' },
  { name: 'VS Code', textIcon: 'VS' },
  { name: 'IntelliJ', textIcon: 'IJ' },
  { name: 'RStudio', textIcon: 'R' },
  { name: 'Maven', icon: '/skillLogo/apachemaven.svg', iconAlt: 'Maven logo' },
  { name: 'Vite', textIcon: 'V' },
  { name: 'Figma', textIcon: 'F' },
  { name: 'Docker', icon: '/skillLogo/docker.svg', iconAlt: 'Docker logo' },
  { name: 'Scrum', textIcon: 'S' },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Card className="flex flex-col items-center gap-2">
      {skill.icon ? (
        <Image
          src={skill.icon}
          alt={skill.iconAlt || `${skill.name} logo`}
          width={64}
          height={64}
          className="h-16 w-16"
        />
      ) : (
        <div className="h-16 w-16 flex items-center justify-center bg-gray-700 rounded-lg">
          <span
            className={`font-bold text-white ${
              skill.textIcon === 'SQL'
                ? 'text-lg'
                : skill.textIcon === 'R' && skill.name === 'R'
                ? 'text-xl'
                : skill.textIcon === 'J'
                ? 'text-2xl'
                : 'text-xs'
            }`}
          >
            {skill.textIcon}
          </span>
        </div>
      )}
      <span className="text-sm text-gray-300">{skill.name}</span>
    </Card>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-6 py-12 scroll-mt-20"
      aria-label="Ferdigheter"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold">Skills</h2>

        {/* Språk */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-200 mb-4">Språk</h3>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
            {languages.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        {/* Teknologier */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-200 mb-4">
            Teknologier
          </h3>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
            {technologies.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        {/* Verktøy */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-200 mb-4">Verktøy</h3>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
            {tools.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

