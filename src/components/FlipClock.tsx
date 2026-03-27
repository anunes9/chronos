import FlipDigit from "./FlipDigit";

interface FlipClockProps {
  minutes: number;
  seconds: number;
}

const FlipClock = ({ minutes, seconds }: FlipClockProps) => {
  const m1 = Math.floor(minutes / 10);
  const m2 = minutes % 10;
  const s1 = Math.floor(seconds / 10);
  const s2 = seconds % 10;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <FlipDigit value={m1} />
      <FlipDigit value={m2} />
      <div className="flex flex-col gap-3 mx-1 sm:mx-2">
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--glow)/0.6)]" />
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--glow)/0.6)]" />
      </div>
      <FlipDigit value={s1} />
      <FlipDigit value={s2} />
    </div>
  );
};

export default FlipClock;
