import type { Task } from "../types/Tasks";
import SingleCheckbox from "./CheckBox";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
}

function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  return (
    <ul>
      {tasks.map(
        (
          task, // maps over the tasks array and renders each task as a list item
        ) => (
          <li key={task.id}>
            <SingleCheckbox
              checked={task.isCompleted}
              onChange={() => onToggleComplete(task)}
            />{" "}
            {task.title} {task.description}
            {task.dueDate &&
              ` — due ${new Date(task.dueDate).toLocaleString()}`}
          </li>
        ),
      )}
    </ul>
  );
}

export default TaskList;
