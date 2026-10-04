import { useEffect, useState } from "react";
import type { Task } from "./types/Tasks";
import { getTasks, updateTask, deleteTask } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TasksList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, []);

  function handleTaskCreated(newTask: Task) {
    setTasks((prev) => [...prev, newTask]);
  }

  async function handleUpdate(updated: Task) {
    await updateTask(updated);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function handleToggleComplete(task: Task) {
    return handleUpdate({ ...task, isCompleted: !task.isCompleted });
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="container">
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
