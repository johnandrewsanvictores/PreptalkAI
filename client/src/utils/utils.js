export const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-headingText font-semibold border-b-2 border-primary transition-colors text-lg"
    : "text-subHeadingText hover:text-primary transition-colors text-lg";
