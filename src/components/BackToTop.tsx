import { useEffect, useState } from "react";

type BackToTopProps = {
  enabled?: boolean;
  threshold?: number;
};

export default function BackToTop({
  enabled = true,
  threshold = 400,
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, threshold]);

  if (!enabled) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white shadow-lg transition-all duration-300 ease-out hover:opacity-90
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
