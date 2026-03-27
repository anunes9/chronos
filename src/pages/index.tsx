import PomodoroTimer from "@/components/PomodoroTimer";
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Timer section */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2 tracking-tight">Pomodoro</h1>
          <p className="text-sm text-muted-foreground mb-10">Stay focused, take breaks.</p>
          <PomodoroTimer />
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-border" />

        {/* Todo section */}
        <div className="w-full lg:w-80 bg-card rounded-2xl p-6 border border-border shadow-lg shadow-black/20">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Index;
