import React from "react";
import { Group } from "../../Types/Group";
import { Task } from "../../Types/Task";
import GroupRow from "./GroupRow";

const GroupsContainer = ({
  groups,
  taskOnClick,
}: {
  groups: Group[];
  taskOnClick: (task: Task) => void;
}) => {
  return (
    <div>
      {groups.map((group: Group, i) => (
        <GroupRow
          title={group.name}
          tasks={group.tasks}
          taskOnClick={taskOnClick}
          key={`${group.name + i}`}
        ></GroupRow>
      ))}
    </div>
  );
};

export default GroupsContainer;
