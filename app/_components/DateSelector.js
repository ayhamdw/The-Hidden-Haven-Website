"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector() {
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const range = { from: null, to: null };

  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="flex flex-col h-full bg-primary-800/40 p-6 rounded-xl shadow-md">
      <DayPicker
        className="mx-auto"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between mt-8 px-6 py-4 bg-accent-500/90 text-primary-900 rounded-b-xl">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl rounded-lg">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {(range.from || range.to) && (
          <button
            className="bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-600 transition"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
