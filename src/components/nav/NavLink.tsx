"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  activeClassName?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  exact,
  activeClassName = "active",
  className,
  children,
  ...props
}) => {
  const pathname = usePathname();

  // Logic for active state
  // If exact is true, pathname must match to
  // If exact is false, pathname must start with to (but careful with /)
  // Also handle /:lang prefix removal if needed?
  // For now, assuming 'to' includes the lang prefix if needed, or we compare raw strings.

  const isActive = exact ? pathname === to : pathname.startsWith(to);

  const finalClassName =
    `${className || ""} ${isActive ? activeClassName : ""}`.trim();

  return (
    <Link href={to} className={finalClassName} {...props}>
      {children}
    </Link>
  );
};
