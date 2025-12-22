import { useEffect, useState } from "react";

type BackToTopProps = {
  enabled?: boolean;
  threshold?: number;
  /**
   * Optional ID of a scrollable container to control instead of the window.
   * Used on the docs page to target the `#docs-scroll` middle column.
   */
  targetId?: string;
};

export default function BackToTop({
  enabled = true,
  threshold = 400,
  targetId,
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24); // px, matches bottom-6

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const scrollTarget = targetId
      ? ((document.getElementById(targetId) as HTMLElement | null) ?? window)
      : window;

    const onScroll = () => {
      if (scrollTarget instanceof Window) {
        setVisible(scrollTarget.scrollY > threshold);
      } else {
        setVisible(scrollTarget.scrollTop > threshold);
      }

      // Nudge the button up when the footer comes into view so it doesn't overlap.
      const footer = document.querySelector("footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const overlap = viewportHeight - rect.top; // > 0 when footer top is inside viewport

      const baseBottom = 24; // 6 * 4px
      const gapAboveFooter = 16; // keep a small gap above the footer bubble

      if (overlap > 0) {
        setBottomOffset(baseBottom + overlap + gapAboveFooter);
      } else {
        setBottomOffset(baseBottom);
      }
    };

    const targetForListener: HTMLElement | Window = scrollTarget;
    targetForListener.addEventListener("scroll", onScroll);

    return () => {
      targetForListener.removeEventListener("scroll", onScroll as any);
    };
  }, [enabled, threshold, targetId]);

  if (!enabled) return null;

  const handleClick = () => {
    const scrollTarget = targetId
      ? ((document.getElementById(targetId) as HTMLElement | null) ?? window)
      : window;

    if (scrollTarget instanceof Window) {
      scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-6 z-50 rounded-full border border-white/30 bg-white/10 text-slate-100 p-3 shadow-glass backdrop-blur-md transition-all duration-300 ease-out hover:bg-white/20
        ${visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 4a1 1 0 01.707.293l6 6a1 1 0 11-1.414 1.414L13 7.414V19a1 1 0 11-2 0V7.414L6.707 11.707a1 1 0 01-1.414-1.414l6-6A1 1 0 0112 4z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
