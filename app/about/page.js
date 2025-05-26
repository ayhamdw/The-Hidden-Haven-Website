import Image from "next/image";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export default async function Page() {
  const cabinsCount = (await getCabins()).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-y-24 gap-x-0 md:gap-x-12 items-center">
        <div className="md:col-span-3 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl mb-6 text-accent-400 font-semibold drop-shadow">
            Welcome to The Hidden Haven
          </h1>
          <div className="space-y-6 text-base sm:text-lg text-accent-100">
            <p>
              Where nature's beauty and comfortable living blend seamlessly.
              Hidden away in the heart of the Italian Dolomites, this is your
              paradise away from home. But it's not just about the luxury
              cabins. It's about the experience of reconnecting with nature and
              enjoying simple pleasures with family.
            </p>
            <p>
              Our {cabinsCount} luxury cabins provide a cozy base, but the real
              freedom and peace you'll find in the surrounding mountains. Wander
              through lush forests, breathe in the fresh air, and watch the
              stars twinkle above from the warmth of a campfire or your hot tub.
            </p>
            <p>
              This is where memorable moments are made, surrounded by nature's
              splendor. It's a place to slow down, relax, and feel the joy of
              being together in a beautiful setting.
            </p>
          </div>
        </div>

        <div className="relative md:col-span-2 aspect-square rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 animate-fadeIn">
          <Image
            src={about1}
            alt="Family sitting around a fire pit in front of cabin"
            fill
            placeholder="blur"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="md:col-span-2 order-3 md:order-none animate-fadeIn">
          <div className="rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
            <Image
              src={about2}
              alt="Family that sit together"
              className="object-cover w-full h-full"
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col justify-center animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl mb-6 text-accent-400 font-semibold drop-shadow">
            Managed by our family since 1962
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-accent-100">
            <p>
              Since 1962, The Hidden Haven has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we've maintained the essence of The Hidden Haven,
              blending the timeless beauty of the mountains with the personal
              touch only a family business can offer. Here, you're not just a
              guest; you're part of our extended family. So join us at The
              Hidden Haven soon, where tradition meets tranquility, and every
              visit is like coming home.
            </p>
            <div>
              <a
                href="/cabins"
                className="inline-block mt-4 bg-accent-500 px-8 py-4 text-primary-800 text-lg font-bold rounded-full shadow-lg hover:bg-accent-600 active:scale-95 transition-all duration-200"
              >
                Explore our luxury cabins
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
