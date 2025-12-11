//from "../ui/dialog";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";

type Ornament = { id: number; x: string; y: string };

export default function ChristmasTree(): JSX.Element {
  const [openId, setOpenId] = useState<number | null>(null);
  const [fireworksActive, setFireworksActive] = useState(false);
  const openTimer = useRef<number | null>(null);
  const autoStopTimer = useRef<number | null>(null);

  // when popup opens (openId set) ensure fireworks run and auto-stop after 10s
  useEffect(() => {
    if (openId !== null) {
      setFireworksActive(true);
      if (autoStopTimer.current) window.clearTimeout(autoStopTimer.current);
      autoStopTimer.current = window.setTimeout(() => {
        // Do NOT stop main video, only stop popup effects
    setFireworksActive(false);
      }, 10000) as unknown as number;
      return () => {
        if (autoStopTimer.current) window.clearTimeout(autoStopTimer.current);
        autoStopTimer.current = null;
      };
    }
    // when popup closed, make sure fireworks are off
    setFireworksActive(false);
    return undefined;
  }, [openId]);

  // open handler: start fireworks immediately, show popup immediately (no delay)
  const handleOpen = (id: number) => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (autoStopTimer.current) {
      window.clearTimeout(autoStopTimer.current);
      autoStopTimer.current = null;
    }

    setFireworksActive(true);
    setOpenId(id);
  };

  const handleClose = () => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (autoStopTimer.current) {
      window.clearTimeout(autoStopTimer.current);
      autoStopTimer.current = null;
    }
    setOpenId(null);
    setFireworksActive(false);
  };

  const ornaments: Ornament[] = [
    { id: 1, x: "49%", y: "14%" },
    { id: 2, x: "48%", y: "28%" },
    { id: 3, x: "53%", y: "40%" },
    { id: 4, x: "43%", y: "48%" },
    { id: 5, x: "56%", y: "58%" },
    { id: 6, x: "38%", y: "64%" },
    { id: 7, x: "47%", y: "64%" },
    // const ornaments: Ornament[] = [
    // { id: 1, x: "48%", y: "14%" },
    // { id: 2, x: "47%", y: "28%" },
    // { id: 3, x: "57%", y: "40%" },
    // { id: 4, x: "33%", y: "48%" },
    // { id: 5, x: "65%", y: "58%" },
    // { id: 6, x: "24%", y: "64%" },
    // { id: 7, x: "44%", y: "64%" },
  ];
  

  // Editable messages for each ornament (index = id-1). You can edit these 7 entries directly.
  const messages = [
    ["Bạn đã trúng", "01 gối Kymdan", "PressureFree Air"],
    ["Bạn đã trúng", "01 gối Kymdan", "Glory Air"],
    ["Bạn đã trúng", "01 gối Kymdan", "PressureFree Max"],
    ["Bạn đã trúng", "01 gối Kymdan", "PressureFree Plus"],
    ["Bạn đã trúng", "01 bộ ga Kymdan", "Lavish Prime"],
    ["Bạn đã trúng", "01 bộ ga Kymdan", "Serenity"],
    ["Bạn đã trúng", "01 mền chăn Kymdan", "SleepCool"],
  ];

  return (
    <>
      {/* Snow overlay (pointer-events-none so it doesn't block clicks) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <SnowEffect />
      </div>

      {/* Main container (centered to match iPad 1620x2160) */}
      <div
        className="relative w-full h-[100dvh] mx-auto select-none flex justify-center items-center overflow-hidden"
        style={{ maxHeight: "2160px", maxWidth: "1620px", margin: "0 auto" }}
      >
        {/* Main background video, centered */}
        <video
          src="https://res.cloudinary.com/ddcbvgrxw/video/upload/v1765263461/Hailuo_Video_chuy%E1%BB%83n_%E1%BA%A3nh_th%C3%A0nh_video_c%C3%B3_%C4%91%E1%BB%99_d_454689996606468096_wcpwdc.mp4"
          className="rounded-lg mx-auto block max-h-full max-w-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Ornament Hotspots with glow + floating animation */}
        {ornaments.map((o, idx) => (
          <motion.div
            key={o.id}
            onClick={() => handleOpen(o.id)}
            className="absolute cursor-pointer"
            style={{ left: o.x, top: o.y, transform: "translate(-50%, -50%)" }}
            animate={{ y: [0, -6 - (idx % 2) * 2, 0], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2 + (idx % 3) * 0.2, ease: "easeInOut", delay: idx * 0.06 }}
          >
            {/* Glow halo */}
            <motion.div
              className="w-18 h-18 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 65%)",
                filter: "blur(10px)",
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2 + (idx % 2) * 0.4 }}
            />
          </motion.div>
        ))}

        {/* Popup dialog with fireworks effect */}
        <Dialog open={openId !== null} onOpenChange={(open) => {
            if (!open) handleClose();
          }}>
          {/* DialogContent requires a DialogTitle for accessibility — keep it present but visually hidden */}
          <DialogContent className="bg-transparent shadow-none border-none p-0 fixed inset-0 flex justify-center items-center z-50">
            <div className="relative w-full max-w-sm pointer-events-auto">
              <div className="sr-only">
                <DialogTitle>Christmas tree ornament popup</DialogTitle>
              </div>

              <div className="absolute inset-0 z-50 pointer-events-none">
                <Fireworks active={fireworksActive} key={openId ?? 0} />
              </div>

              <div className="relative z-20 rounded-xl">
                <button
                  onClick={handleClose}
                  className="absolute right-2 top-2 z-30 bg-black/70 text-white w-7 h-7 rounded-full text-xs flex items-center justify-center"
                  aria-label="Close prize"
                >
                  ✕
                </button>

                <video
                  src="https://res.cloudinary.com/ddcbvgrxw/video/upload/v1765272670/1209_djpeju.mp4"
                  className="w-full rounded-xl shadow-xl mx-auto block"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {messages.map((lines, idx) => (
                  <p
                    key={idx}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-xl font-bold text-black z-30 pointer-events-none leading-tight"
                    style={{ display: openId === idx + 1 ? 'flex' : 'none' }}
                  >
                    <span>{lines[0]}</span>
                    <span>{lines[1]}</span>
                    <span>{lines[2]}</span>
                  </p>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

/* Snow effect component (medium density, subtle shimmer) */
function SnowEffect(): JSX.Element {
  // create a set of flakes with different sizes/delays
  const flakes = Array.from({ length: 48 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 6 + Math.random() * 8,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <motion.div
          key={f.id}
          className="absolute bg-white rounded-full opacity-80"
          style={{ left: `${f.left}%`, width: f.size, height: f.size, top: -10, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: [-20, 110 + Math.random() * 20], opacity: [0, 1, 0.85] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* Fireworks effect (medium-heavy, multicolor bursts) */
function Fireworks({ active }: { active: boolean }): JSX.Element {
  // random bursts across area
  const bursts = Array.from({ length: 6 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 60 + 10,
    hue: Math.floor(Math.random() * 360),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {active &&
        bursts.map((b, i) => {
          const particles = Array.from({ length: 26 }).map((_, j) => ({
            id: `${i}-${j}`,
            angle: Math.random() * Math.PI * 2,
            speed: 60 + Math.random() * 140,
          }));

          return (
            <div
              key={i}
              className="absolute"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              {particles.map((p) => {
                const tx = Math.cos(p.angle) * p.speed;
                const ty = Math.sin(p.angle) * p.speed;
                return (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      left: 0,
                      top: 0,
                      background: `hsl(${b.hue}, 90%, 60%)`,
                      filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9))",
                    }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [0, tx],
                      y: [0, ty],
                      scale: [0.4, 1.2, 0.2],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: Math.random() * 0.2,
                      repeat: active ? Infinity : 0,
                      ease: "easeOut",
                    }}
                  />
                );
              })}

              {/* center flash */}
              <motion.div
                className="absolute rounded-full border-[3px] border-white/90"
                style={{ width: 12, height: 12, left: -6, top: -6 }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: [1, 0], scale: [0, 4] }}
                transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
              />
            </div>
          );
        })}
    </div>
  );
}
