import { useState } from "react";
import type { Task } from "../types/Tasks";

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

function TaskForm({ onTaskCreated }: TaskFormProps) {
  // form component for creating a new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    // handles form submission
    e.preventDefault();
    const response = await fetch("http://localhost:5292/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        isCompleted: false,
        dueDate: dueDate || null, // empty string would fail to bind to DateTime on the backend
      }),
    });
    const newTask = await response.json();
    onTaskCreated(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
  }

  return (
    // form for creating a new task
    <form className="task-form" onSubmit={handleSubmit}>
      {" "}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
