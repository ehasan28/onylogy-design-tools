"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SITE } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { href: "/color", label: "Color" },
  { href: "/font", label: "Font" },
  { href: "/tools", label: "Tools" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-fg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Onylogy Design Tools</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/tools"
                ? pathname.startsWith("/tools")
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-fg-muted hover:bg-bg-elev hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden text-xs font-medium text-fg-muted hover:text-fg sm:inline"
          >
            GitHub
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
