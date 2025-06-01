"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed cursor-pointer left-0 top-25 z-30 p-4 md:hidden  "
        aria-label="Open menu"
      >
        <Bars3Icon className="h-6 w-6 text-primary-800 hover:text-primary-200 transition-colors duration-300" />
      </button>

      <nav className="hidden h-full border-r border-primary-900 md:block">
        <ul className="flex h-full flex-col gap-2 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 ${pathname === link.href ? "bg-primary-900" : ""}`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden  ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed left-0 top-25 z-50 h-full w-72 bg-primary-950 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute cursor-pointer right-4 top-4 rounded-full p-2 text-white hover:bg-primary-800"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <ul className="flex h-full flex-col gap-2 pt-16 text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 ${pathname === link.href ? "bg-primary-900" : ""}`}
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li className="mt-auto mb-4">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideNavigation;
