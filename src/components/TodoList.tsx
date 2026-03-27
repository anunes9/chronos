import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now().toString(), text, done: false }]);
    setInput("");
  };

  const toggle = (id: string) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Tasks</h2>
        {todos.length > 0 && (
          <span className="text-xs text-muted-foreground font-mono">
            {doneCount}/{todos.length}
          </span>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="flex gap-2 mb-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="bg-secondary border-border placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="w-10 h-10 shrink-0 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <button
                onClick={() => toggle(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  todo.done ? "bg-primary border-primary" : "border-muted-foreground/40 hover:border-primary"
                }`}
              >
                {todo.done && <Check className="w-3 h-3 text-primary-foreground" />}
              </button>
              <span
                className={`flex-1 text-sm transition-all ${
                  todo.done ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => remove(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
            <Circle className="w-8 h-8 opacity-30" />
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
