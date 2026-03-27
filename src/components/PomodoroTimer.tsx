import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import FlipClock from "./FlipClock";
import { Button } from "@/components/ui/button";

type Mode = "work" | "break" | "longBreak";

const DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_LABELS: Record<Mode, string> = {
  work: "Focus",
  break: "Short Break",
  longBreak: "Long Break",
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const switchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (mode === "work") {
              const next = (sessions + 1) % 4 === 0 ? "longBreak" : "break";
              setSessions((s) => s + 1);
              setTimeout(() => switchMode(next), 500);
            } else {
              setTimeout(() => switchMode("work"), 500);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, sessions, switchMode]);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode]);
  };

  const progress = 1 - timeLeft / DURATIONS[mode];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-secondary">
        {(["work", "break", "longBreak"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              mode === m
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "work" && <Brain className="w-4 h-4" />}
            {(m === "break" || m === "longBreak") && <Coffee className="w-4 h-4" />}
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-1 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Flip Clock */}
      <FlipClock minutes={minutes} seconds={seconds} />

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="w-12 h-12 rounded-full border-border hover:bg-secondary"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="w-16 h-16 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          size="icon"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </Button>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
          <span className="text-sm font-mono text-muted-foreground">{sessions}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Sessions completed: {sessions}</p>
    </div>
  );
};

export default PomodoroTimer;
