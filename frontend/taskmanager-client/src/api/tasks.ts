import type { Task } from "../types/Tasks";

const BASE_URL = "http://localhost:5292/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function updateTask(task: Task): Promise<void> {
  const res = await fetch(`${BASE_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
