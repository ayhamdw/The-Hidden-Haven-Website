"use server";

import { getServerSession } from "next-auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { authConfig } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You Must be logged in");

  const userId = session.user.guestId;
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid National Id");
  }
  const updateData = { nationality, countryFlag, nationalID };

  await updateGuest(userId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You Must be logged in");
  const guestId = session.user.guestId;
  const guestBookings = await getBookings(guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You Must be logged in");
  const guestId = session.user.guestId;
  const guestBookings = await getBookings(guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to edit this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const updateData = { numGuests, observations };

  await updateBooking(bookingId, updateData);

  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You Must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await createBooking(newBooking);

  if (error) throw new Error("Booking Could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
