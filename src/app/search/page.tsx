import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
