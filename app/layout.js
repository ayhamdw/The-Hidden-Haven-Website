import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template:
      "%s | Luxury Cabin Hotel in the Italian Dolomites | The Hidden Haven",
    default: "Luxury Cabin Hotel in the Italian Dolomites | The Hidden Haven",
  },
  description:
    "Experience luxury and tranquility at The Hidden Haven, a premium cabin hotel nestled in the heart of the Italian Dolomites. Enjoy breathtaking mountain views, exclusive amenities, and unforgettable adventures in nature",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 relative text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
