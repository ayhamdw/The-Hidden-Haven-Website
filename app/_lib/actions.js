import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { callbackUrl: "/account" }); //! when the register successful, it redirect to the account
}
export async function signOutAction() {
  await signOut({ callbackUrl: "/" }); //! when the register successful, it redirect to the account
}
