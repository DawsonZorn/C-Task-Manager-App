import type { Task } from "../types/Tasks";
import SingleCheckbox from "./CheckBox";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.isCompleted ? "done" : ""}`}>
      <SingleCheckbox
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task)}
      />
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <span className="task-desc">{task.description}</span>
        )}
        {task.dueDate && (
          <span className="task-due">
            Due {new Date(task.dueDate).toLocaleString()}
          </span>
        )}
      </div>
      <div className="actions">
        <button className="secondary" onClick={() => onEdit(task.id)}>
          Edit
        </button>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
