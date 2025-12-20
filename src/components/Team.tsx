

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  github?: string | null;
  linkedin?: string | null;
};

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-current ${className}`}
    >
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.1.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.74.11 3.03.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.21 0 .31.21.67.79.56 4.56-1.53 7.85-5.86 7.85-10.97C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-current ${className}`}
    >
      <path d="M4.98 3.5C3.33 3.5 2 4.84 2 6.48c0 1.63 1.33 2.98 2.98 2.98h.02C6.64 9.46 8 8.11 8 6.48 8 4.84 6.64 3.5 4.98 3.5zM2.4 21.5h5.17V9.98H2.4V21.5zM9.75 9.98V21.5h5.17v-6.45c0-3.6 4.65-3.89 4.65 0v6.45H24V13.3c0-6.22-6.71-5.99-9.08-2.93V9.98H9.75z" />
    </svg>
  );
}

const team: TeamMember[] = [
  {
    name: "Paython Veazie",
    role: "Founding Engineer",
    bio: "Contributes to MCP flows, AI Wizard design, API routing, session handling, and deployment automations across AWS.",
    image: "/team/paython.png",
    github: "https://github.com/PVeazie951",
    linkedin: "https://www.linkedin.com/in/pveazie",
  },
  {
    name: "Lorenc Dedaj",
    role: "Founding Engineer",
    bio: "Leads work on Supabase integration, GitHub OAuth flows, GitHub Actions generation, and Google Cloud deployment automation.",
    image: "/team/lorenc.png",
    github: "https://github.com/lorencDedaj",
    linkedin: "https://www.linkedin.com/in/lorenc-dedaj/",
  },
  {
    name: "Victoria Williams",
    role: "Founding Engineer",
    bio: "Drives UI architecture, front-end system design, state management strategy, and overall product polish.",
    image: "/team/victoria.png",
    github: "https://github.com/williams21v",
    linkedin: "https://www.linkedin.com/in/victoria-williams-/",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">The AutoDeploy Team</h2>
          <p className="text-lg text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
            Built by engineers who care deeply about developer experience,
            reliability, and real-world deployment workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto w-full max-w-6xl">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center text-center gap-4 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden bg-border-light dark:bg-border-dark ring-2 ring-transparent hover:ring-primary transition-shadow duration-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary text-sm font-medium">
                  {member.role}
                </p>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-2">
                  {member.bio}
                </p>

                <div className="flex gap-4 mt-3 text-primary justify-center">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary/80 transition-colors"
                      aria-label="GitHub profile"
                    >
                      <GitHubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary/80 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <LinkedInIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}