import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLink = ({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    data-testid={`navlink-${label.toLowerCase()}`}
    className={cn(
      "relative inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors",
      isActive
        ? "text-foreground after:absolute after:bottom-1 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-foreground/70"
        : "text-muted-foreground hover:text-foreground hover:after:absolute hover:after:bottom-1 hover:after:left-2 hover:after:right-2 hover:after:h-0.5 hover:after:rounded-full hover:after:bg-foreground/50"
    )}
  >
    {label}
  </Link>
);

export default NavLink;
