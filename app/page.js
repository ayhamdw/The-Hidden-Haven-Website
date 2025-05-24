import Link from "next/link";
import Image from "next/image";
import background from "@/public/bg.png";
export const metadata = {
  title: {
    template:
      "%s | Luxury Cabin Hotel in the Italian Dolomites | The Hidden Haven",
    default: "Luxury Cabin Hotel in the Italian Dolomites | The Hidden Haven",
  },
  description:
    "Experience luxury and tranquility at The Hidden Haven, a premium cabin hotel nestled in the heart of the Italian Dolomites. Enjoy breathtaking mountain views, exclusive amenities, and unforgettable adventures in nature",
};

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={background}
        fill
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
        placeholder="blur"
        quality={80}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
