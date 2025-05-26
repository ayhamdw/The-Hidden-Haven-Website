import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="flex flex-col md:flex-row gap-8 border border-primary-800 rounded-2xl overflow-hidden shadow-lg min-h-[400px] bg-primary-900/80">
      <div className="flex-1 flex flex-col justify-center">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
}

export default Reservation;
