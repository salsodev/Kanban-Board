export const getTodoByStatus = (tasks = [], status) => {
  return tasks?.filter((task) => task.status === status);
};

export const getSubtaskResolved = (todo) => {
  let res = 0;
  todo?.subtasks?.forEach((subtask) => {
    if (subtask.status) {
      res += 1;
    }
  });
  return res;
};
