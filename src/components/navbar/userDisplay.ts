type UserLike = {
  isAuthenticated?: boolean | null;
  name?: string | null;
  email?: string | null;
  isPro?: boolean | null;
  isAdmin?: boolean | null;
} | null;

export function getUserDisplay(user: UserLike) {
  const isAuthenticated = user?.isAuthenticated ?? false;

  const displayName =
    isAuthenticated && user?.name && user.name.trim().length > 0
      ? user.name
      : "Anonymous";

  const displayEmail =
    isAuthenticated && user?.email && user.email.trim().length > 0
      ? user.email
      : "Not signed in";

  const initials =
    isAuthenticated && user?.name
      ? user.name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? "")
          .join("")
      : "";

  const isPro = user?.isPro ?? false;
  const isAdmin = user?.isAdmin ?? false;

  return { isAuthenticated, displayName, displayEmail, initials, isPro, isAdmin };
}
