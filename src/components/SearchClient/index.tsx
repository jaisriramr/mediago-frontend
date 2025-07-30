"use client";

import Navbar from "@/components/navbar";
import "./search.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/browse");
    }
    console.log({ query });
  }, [query]);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="browse"></div>
    </div>
  );
}
