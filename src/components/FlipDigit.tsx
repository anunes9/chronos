import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipDigitProps {
  value: number;
}

const FlipDigit = ({ value }: FlipDigitProps) => {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 300);
      prevValue.current = value;
      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <div className="flip-card relative">
      <div className="flip-segment w-[72px] h-[100px] sm:w-[88px] sm:h-[120px] md:w-[100px] md:h-[140px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-flip-text select-none"
            style={{ display: "inline-block" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlipDigit;
