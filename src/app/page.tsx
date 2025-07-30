"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hero-container">
          <nav className="flex items-center justify-between px-[100px] h-[100px]">
            <Link href={"/browse"} className="cursor-pointer">
              <Image
                src="/assets/MediaGo.svg"
                alt="Logo"
                width={140}
                height={50}
              />
            </Link>
            <button className="bg-[var(--primary)] text-white h-[36px] w-[80px] rounded cursor-pointer">
              Login
            </button>
          </nav>
          <main className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div>
              <div>
                <h1 className="hero-text text-[96px] text-center font-bold leading-[100px]">
                  Unlimited movies, TV
                </h1>
                <h1 className="hero-text text-[96px] text-center font-bold leading-[100px]">
                  shows and more
                </h1>
              </div>
              <div className="flex items-center justify-center mt-[50px]">
                <button className="text-center bg-[var(--primary)] text-white h-[55px] w-[215px] rounded cursor-pointer">
                  Get Started
                </button>
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </div>
  );
}
