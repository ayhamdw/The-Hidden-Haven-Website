"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu({ session }) {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-accent-600 focus:outline-none transition-all"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 backdrop-blur-sm bg-black/30"
            : "opacity-0 pointer-events-none backdrop-blur-none bg-transparent"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-transparent backdrop-blur-lg shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 px-8 py-6">
            <Link
              href="/cabins"
              className="text-lg font-medium text-accent-400 hover:text-accent-600 transition-colors py-3 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Cabins
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-accent-400 hover:text-accent-600 transition-colors py-3 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/account"
              className="text-lg font-medium text-accent-400 hover:text-accent-600 transition-colors py-3"
              onClick={() => setIsOpen(false)}
            >
              {session?.user?.image ? (
                <div className="flex items-center gap-4">
                  {/* <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={session.user.image}
                    alt={session.user.name}
                    referrerPolicy="no-referrer"
                  /> */}
                  <span>{session.user.name}</span>
                </div>
              ) : (
                "Guest area"
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
