import { useEffect, useState } from "react";
import type { Page } from "../Navbar";

export type ActiveSection = "home" | "features" | "how" | "team";

type UseActiveSectionArgs = {
  page: Page;
};

export function useActiveSection({ page }: UseActiveSectionArgs) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (page !== "home") {
      const t = setTimeout(() => setActiveSection("home"), 0);
      return () => clearTimeout(t);
    }

    const sectionIds: Array<"features" | "how" | "team"> = [
      "features",
      "how",
      "team",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.scrollY < 100) {
              setActiveSection("home");
            } else {
              setActiveSection(entry.target.id as ActiveSection);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    if (page !== "home") return;

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return { activeSection, scrollToSection };
}
