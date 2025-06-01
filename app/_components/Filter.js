"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const parameters = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = parameters.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(parameters);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-primary-800 flex border flex-wrap">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 border cursor-pointer ${filter === activeFilter ? "bg-primary-700 text-primary-100" : ""}`}
    >
      {children}
    </button>
  );
}

export default Filter;
