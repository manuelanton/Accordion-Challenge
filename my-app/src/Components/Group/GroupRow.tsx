import React, { useState } from "react";
import { Task } from "../../Types/Task";
import TaskRow from "../TaskRow/TaskRow";

const GroupRow = ({
  title,
  tasks,
  taskOnClick,
}: {
  title: string;
  tasks: Task[];
  taskOnClick: (task: Task) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const color = tasks.every((task) => task.checked === true)
    ? "#6a1b9a"
    : "black";

  return (
    <div>
      <h3 style={{ color: color }}>
        {title}
        <button
          className="groupButton"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </h3>

      {expanded &&
        tasks.map((task, i) => (
          <TaskRow
            task={task}
            taskOnClick={taskOnClick}
            key={`${task.description + i}`}
          ></TaskRow>
        ))}
    </div>
  );
};

export default GroupRow;
