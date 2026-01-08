import type { Page } from "../Navbar";

type BrandButtonProps = {
  page: Page;
  setPage: (page: Page) => void;
};

export function BrandButton({ page, setPage }: BrandButtonProps) {
  return (
    <button
      onClick={() => {
        if (page !== "home") {
          setPage("home");
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="text-xl font-extrabold tracking-tight text-white"
    >
      <span className="inline sm:hidden">AD</span>
      <span className="hidden sm:inline">AutoDeploy</span>
    </button>
  );
}
