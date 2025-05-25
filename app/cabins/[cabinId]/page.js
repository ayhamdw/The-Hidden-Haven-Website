import { getCabin } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pb-24">
      <div className="relative h-[480px] w-full mb-[-100px]">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover brightness-75 transition-all duration-700"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg bg-primary-950/70 px-8 py-4 rounded-2xl inline-block animate-fade-in">
            {name} Cabin
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-primary-900/90 rounded-3xl shadow-2xl p-8 md:p-12 pt-24 relative z-10 mt-0 backdrop-blur-sm border border-primary-700/50">
        <div className="hidden md:block absolute -top-20 left-10 w-72 h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-primary-800 animate-slide-in hover:scale-105 transition-transform duration-300">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="md:ml-80">
          <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 bg-primary-800/40 px-6 py-4 rounded-xl shadow-md hover:bg-primary-800/60 transition-all border border-primary-700/30">
              <div className="p-3 rounded-lg bg-accent-900/90">
                <UsersIcon className="h-6 w-6 text-accent-100" />
              </div>
              <div>
                <h3 className="text-sm text-primary-300">Capacity</h3>
                <p className="text-xl font-semibold text-accent-100">
                  {maxCapacity} Guests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary-800/40 px-6 py-4 rounded-xl shadow-md hover:bg-primary-800/60 transition-all border border-primary-700/30">
              <div className="p-3 rounded-lg bg-accent-900/90">
                <MapPinIcon className="h-6 w-6 text-accent-100" />
              </div>
              <div>
                <h3 className="text-sm text-primary-300">Location</h3>
                <p className="text-xl font-semibold text-accent-100">
                  Dolomites, Italy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary-800/40 px-6 py-4 rounded-xl shadow-md hover:bg-primary-800/60 transition-all border border-primary-700/30">
              <div className="p-3 rounded-lg bg-accent-900/90">
                <EyeSlashIcon className="h-6 w-6 text-accent-100" />
              </div>
              <div>
                <h3 className="text-sm text-primary-300">Privacy</h3>
                <p className="text-xl font-semibold text-accent-100">
                  Secluded Retreat
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-primary-800/50 p-6 rounded-2xl border border-primary-700/50">
            <div className="text-center md:text-left">
              {discount > 0 && (
                <span className="text-sm text-primary-300 line-through block">
                  ${regularPrice} per night
                </span>
              )}
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-3xl md:text-4xl font-bold text-accent-100">
                  ${discount > 0 ? regularPrice - discount : regularPrice}
                </span>
                <span className="text-lg text-primary-300">/ night</span>
              </div>
              {discount > 0 && (
                <span className="inline-block mt-2 px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">
                  Save ${discount}!
                </span>
              )}
            </div>
            <button className="bg-gradient-to-r from-accent-800 to-accent-700 hover:from-accent-700 hover:to-accent-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg text-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95">
              Reserve Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-24 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-100 mb-6">
          Experience Nature in Luxury
        </h2>
        <p className="text-primary-200 text-lg md:text-xl leading-relaxed mb-8">
          Our {name} Cabin combines rustic charm with modern comforts. Wake up
          to breathtaking mountain views, enjoy complete privacy, and create
          unforgettable memories in the heart of the Dolomites.
        </p>
      </div>
    </div>
  );
}
