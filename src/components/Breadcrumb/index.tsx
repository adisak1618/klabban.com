import Link from "next/link";

interface BreadcrumbProps {
  links: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 md:gap-3">
        <Link href="/" className="inline-flex items-center">
          <div className="inline-flex items-center text-text-third italic text-caption hover:text-text-hover">
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </div>
        </Link>
        {links.map(({ href, label }) => (
          <Link href={href} key={label}>
            <div className="flex items-center">
              <svg
                className="w-2 h-2"
                viewBox="0 0 32 32"
                id="icon-arrow-small"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24.5 18c1.1-1 1.2-2.8.2-3.9l-.1-.1-7.2-7.2-2.3-2.3L11.5.9C10.4-.2 8.7-.3 7.6.8s-1.2 2.8-.1 3.9l.1.1 11.1 11.1-5.4 5.4-2.3 2.3-3.6 3.6c-1.1 1.1-1.2 2.8-.1 3.9 1.1 1.1 2.8 1.2 3.9.1l.1-.1L24.5 18z"></path>
              </svg>
              <a
                href="#"
                className="ml-1 text-sm italic text-text-color text-caption hover:text-text-hover md:ml-2"
              >
                {label}
              </a>
            </div>
          </Link>
        ))}
      </ol>
    </nav>
  );
}
