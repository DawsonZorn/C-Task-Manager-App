import { useState, useEffect } from "react";
export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  dueDate?: string;
}

const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
  fetch("http://localhost:5292/api/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data));
}, []);
