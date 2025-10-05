import { api } from "./client";

export const register = async (user) => {
  try {
    const resp = await api.post("/auth/signup", user);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (user) => {
  try {
    const resp = await api.post("/auth/login", user);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const resp = await api.post("/auth/logout");

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const isLoggedIn = async () => {
  try {
    const resp = await api.post(`/auth/isLoggedin`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// projects

export const createProject = async (payload) => {
  try {
    const resp = await api.post(`/projects`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const resp = await api.get(`/projects`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const resp = await api.delete(`/projects/${projectId}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllProjects = async () => {
  try {
    const resp = await api.delete(`/projects`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// project tasks

export const getProjectTasks = async (projectID) => {
  try {
    const resp = await api.get(`/tasks-overview/${projectID}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectTaskDetail = async (taskId) => {
  try {
    const resp = await api.get(`/tasks/${taskId}/subtasks`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const createProjectTask = async (payload, projectID) => {
  try {
    const resp = await api.post(`/tasks/${projectID}`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskWithSubtask = async (payload, taskID) => {
  try {
    const resp = await api.patch(`/tasks/${taskID}/subtasks`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (payload, taskID) => {
  try {
    const resp = await api.patch(`/tasks/${taskID}`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskID) => {
  try {
    const resp = await api.delete(`/tasks/${taskID}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// subtasks

export const updateSubtask = async (payload, subtaskID) => {
  try {
    const resp = await api.patch(`/subtasks/${subtaskID}`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const createSubtask = async (payload) => {
  try {
    const resp = await api.post(`/subtasks`, payload);

    return resp.data;
  } catch (error) {
    throw error;
  }
};
