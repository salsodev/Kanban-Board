import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createProject,
  createProjectTask,
  deleteAllProjects,
  deleteProject,
  getAllProjects,
  getProjectTasks,
} from "../service";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, mutate } = useMutation({
    mutationFn: (payload) => createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("A new project has been created successfully!");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};

export const useCreateProjectTask = (projectID) => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: (payload) => createProjectTask(payload, projectID),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
      toast.success("A new task has been created successfully!");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};

export const useDeleteProject = (projectID) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (projectID) => deleteProject(projectID),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // all projects
      queryClient.invalidateQueries(["project", projectID]); // all tasks
      toast.success("Successfully deleted!");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate };
};

export const useClearProjects = (projectID) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAllProjects,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // all projects
      queryClient.invalidateQueries(["project", projectID]); // all projects
      queryClient.clear();
      toast.success("All projects successfully deleted!");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate };
};

export const useGetProjectTasks = (projectID) => {
  const { data } = useQuery({
    queryKey: ["project", projectID],
    queryFn: () => getProjectTasks(projectID),
  });

  return data;
};

export const useGetProjects = () => {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  return { data };
};
