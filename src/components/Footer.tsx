import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div className="flex gap-4">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="hover:text-foreground">
              Email
            </a>
          )}
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
