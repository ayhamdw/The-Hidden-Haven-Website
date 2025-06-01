// app/components/Navigation.tsx
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../_lib/auth";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default async function Navigation() {
  const session = await getServerSession(authConfig);

  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/cabins"
              className="text-sm font-medium text-accent-100 hover:text-accent-300 transition-colors hover:bg-primary-900 p-2 rounded-full"
            >
              Cabins
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-accent-100 hover:text-accent-300 hover:bg-primary-900 transition-colors p-2  rounded-full"
            >
              About
            </Link>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-primary-900 transition p-2 "
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-medium text-accent-100">
                  {session.user.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Guest area
              </Link>
            )}
          </div>

          <MobileMenu session={session} />
        </div>
      </div>
    </nav>
  );
}
