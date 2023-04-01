import React from "react";
import { Task } from "../../Types/Task";

const TaskRow = ({
  task,
  taskOnClick,
}: {
  task: Task;
  taskOnClick: (task: Task) => void;
}) => {
  return (
    <>
      <input
        checked={task.checked}
        type={"checkbox"}
        onChange={() => taskOnClick(task)}
      ></input>
      {task.description}
    </>
  );
};

export default TaskRow;
