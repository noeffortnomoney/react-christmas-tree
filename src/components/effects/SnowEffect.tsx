import { motion } from "framer-motion";

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
export default SnowEffect;
/* Fireworks effect (medium-heavy, multicolor bursts) */
