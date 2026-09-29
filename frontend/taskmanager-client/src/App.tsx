import { useEffect, useState } from "react";
import type { Task } from "./types/Tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TasksList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5292/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function handleTaskCreated(newTask: Task) {
    setTasks([...tasks, newTask]);
  }

  async function handleToggleComplete(task: Task) {
    // PUT expects the full task, so send it back with isCompleted flipped
    const updated = { ...task, isCompleted: !task.isCompleted };

    await fetch(`http://localhost:5292/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  }

  return (
    <>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks.filter((t) => !t.isCompleted)} // hide completed tasks
        onToggleComplete={handleToggleComplete}
      />
    </>
  );
}

export default App;
