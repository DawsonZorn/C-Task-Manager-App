import { useState } from "react";
import type { Task } from "../types/Tasks";

interface EditTaskFormProps {
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 16) ?? "");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      dueDate: dueDate || null,
    });
  }

  return (
    <li className="task-item editing">
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
        />
        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </li>
  );
}

export default EditTaskForm;
