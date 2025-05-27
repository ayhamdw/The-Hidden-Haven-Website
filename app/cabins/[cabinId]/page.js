import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const cabinId = await params.cabinId;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const cabinId = await params.cabinId;
  const cabin = await getCabin(cabinId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pb-24">
      <Cabin cabin={cabin} />
      <div className="max-w-4xl mx-auto mt-24 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-100 mb-6">
          Experience Nature in Luxury
        </h2>
        <p className="text-primary-200 text-lg md:text-xl leading-relaxed mb-8">
          Our {cabin.name} Cabin combines rustic charm with modern comforts.
          Wake up to breathtaking mountain views, enjoy complete privacy, and
          create unforgettable memories in the heart of the Dolomites.
        </p>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
