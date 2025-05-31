"use server";

import { getServerSession } from "next-auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";
import { authConfig } from "./auth";
import { revalidatePath } from "next/cache";

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
