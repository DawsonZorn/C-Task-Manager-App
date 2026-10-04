import { useState } from "react";
import type { Task } from "../types/Tasks";
import TaskItem from "./TaskItem";
import EditTaskForm from "./EditTaskForm";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

function TaskList({
  tasks,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const active = tasks.filter((t) => !t.isCompleted);
  const completed = tasks.filter((t) => t.isCompleted);

  function renderTask(task: Task) {
    return task.id === editingId ? (
      <EditTaskForm
        key={task.id}
        task={task}
        onSave={(updated) => {
          onUpdate(updated);
          setEditingId(null);
        }}
        onCancel={() => setEditingId(null)}
      />
    ) : (
      <TaskItem
        key={task.id}
        task={task}
        onToggleComplete={onToggleComplete}
        onEdit={setEditingId}
        onDelete={onDelete}
      />
    );
  }

  return (
    <>
      <ul className="task-list">{active.map(renderTask)}</ul>
      {active.length === 0 && (
        <p className="empty">Nothing to do. Add a task above.</p>
      )}

      {completed.length > 0 && (
        <details className="completed">
          <summary>Completed ({completed.length})</summary>
          <ul className="task-list">{completed.map(renderTask)}</ul>
        </details>
      )}
    </>
  );
}

export default TaskList;
