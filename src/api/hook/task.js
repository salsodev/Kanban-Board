import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteTask,
  getProjectTaskDetail,
  updateTask,
  updateTaskWithSubtask,
} from "../service";
import { toast } from "sonner";

export const useUpdateSingleTask = (taskID, projectID) => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: (payload) => updateTask(payload, taskID),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["taskDetail"]);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};

export const useUpdateTaskWithSubtask = (projectID) => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: ({ payload, taskID }) => updateTaskWithSubtask(payload, taskID),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};

export const useGetProjectTaskDetail = (taskId) => {
  const { data } = useQuery({
    queryKey: ["taskDetail"],
    queryFn: () => getProjectTaskDetail(taskId),
    onSuccess: (data) => {
      localStorage.setItem("taskDetail", JSON.stringify(data));
    },
  });

  return { data };
};

export const useDeleteProjectTask = (taskId, projectID) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate };
};
