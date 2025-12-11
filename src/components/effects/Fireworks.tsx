import { motion } from "framer-motion";

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
                      ease: "ease-out",
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
