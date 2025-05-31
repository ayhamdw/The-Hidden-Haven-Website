import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { authConfig } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Update Profile",
};

export default async function Page() {
  const countryFlag = "ps.jpg";
  const nationality = "palestinian";
  const session = await getServerSession(authConfig);
  const guest = await getGuest(session?.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        {" "}
        {/*i did this because i wanna render server component inside client component*/}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
