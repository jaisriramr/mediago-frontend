"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

type HeroPreviewProps = {
  videoUrl: string;
  muted?: boolean;
};

export default function HeroPreview({
  videoUrl,
  muted = true,
}: Readonly<HeroPreviewProps>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Update mute state dynamically
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden text-white"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        playsInline
        muted={isMuted}
      >
        <track kind="captions" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 z-10"></div>

      {/* Content */}
      <div className="absolute z-20 bottom-20 max-w-3xl space-y-6 pl-[100px]">
        <h1 className="text-5xl font-extrabold">Sakamoto Days</h1>
        <p className="text-lg text-white/80 max-w-lg">
          He was the ultimate assassin. Now he just wants a peaceful life.
        </p>

        <div className="flex items-center justify-between w-[100%]">
          <div className="flex items-center gap-4">
            <button className="cursor-pointer bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-medium hover:bg-gray-300 transition">
              <PlayCircleOutlined />
              Play
            </button>
            <button className="cursor-pointer bg-white/30 text-white px-6 py-2 rounded flex items-center gap-2 font-medium hover:bg-white/40 transition">
              <InfoCircleOutlined />
              More Info
            </button>
          </div>
          {/* 🔊 Mute/Unmute Toggle */}
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="ml-4 p-2 bg-white/30 rounded-full text-white hover:bg-white/50 transition cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <img
                src="/assets/volume-mute.svg"
                alt="mute"
                width={24}
                height={24}
              />
            ) : (
              <img
                src="/assets/volume-full.svg"
                alt="full"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
