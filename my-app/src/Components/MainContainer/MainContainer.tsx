import React, { useState, useEffect } from "react";
import { Group } from "../../Types/Group";
import { Task } from "../../Types/Task";
import GroupsContainer from "../Group/GroupsContainer";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./MainContainer.css";

const MainContainer = () => {
  const apiUrl =
    "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress";
  const [groups, setGroups] = useState<Group[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const sumGroupValues = (group: Group) => {
    let total = 0;
    group.tasks.forEach((task) => (total += task.value));
    return total;
  };

  const sumGroupCheckedValues = (group: Group) => {
    let total = 0;
    group.tasks.forEach((task) => {
      if (task.checked) total += task.value;
    });
    return total;
  };

  const taskOnClick = (task: Task) => {
    const newGroups = [...groups];
    for (let i = 0; i < groups.length; i++) {
      const groupTasks = [...groups[i].tasks];
      for (let j = 0; j < groupTasks.length; j++) {
        if (groupTasks[j].description === task.description) {
          groupTasks[j].checked = true;
          newGroups[i].tasks = groupTasks;
        }
      }
    }

    setGroups([...newGroups]);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await (await fetch(apiUrl)).json();
      return data;
    };

    fetchGroups().then((groups) => setGroups(groups));
  }, []);

  useEffect(() => {
    const calculateProgress = (groups: Group[]) => {
      let total = 0;
      let portion = 0;
      groups.forEach((group) => {
        total += sumGroupValues(group);
        portion += sumGroupCheckedValues(group);
      });

      return Number(((portion / total) * 100).toFixed(2));
    };

    setProgress(calculateProgress(groups));
  }, [groups]);

  return (
    <div className="container">
      <h1>Lodgify Grouped Tasks</h1>
      <ProgressBar completed={progress}></ProgressBar>
      <GroupsContainer
        groups={groups}
        taskOnClick={taskOnClick}
      ></GroupsContainer>
    </div>
  );
};

export default MainContainer;
