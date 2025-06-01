import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid h-full md:grid-cols-[16rem_1fr] md:gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
