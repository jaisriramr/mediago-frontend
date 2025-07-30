"use client";

import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-[100vh] ">
          <Navbar />
          <div></div>
        </div>
      </Suspense>
    </div>
  );
}
