"use client";

import Navbar from "@/components/navbar";
import "./browse.css";
import HeaderPreview from "@/components/HeroPreview";
import { Suspense } from "react";

export default function BrowsePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-[100vh]">
          <Navbar />
          <HeaderPreview
            videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            muted={true}
          />
          <div className="browse">
            <h1>welcome</h1>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
