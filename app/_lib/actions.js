"use server";

import { getServerSession } from "next-auth";
import { updateGuest } from "./data-service";
import { authConfig } from "./auth";

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
}
