import { useMutation, useQueryClient } from "react-query";
import { isLoggedIn, login, logout, register } from "../service";
import { toast } from "sonner";

export const useRegister = () => {
  const { data, mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (user) => register(user),
    onSuccess: (data) => {
      toast.success("You've been registered successfully!", data);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading, isSuccess };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.setQueryData("currentUser", data.data);
      localStorage.setItem("currentUser", JSON.stringify(data.data));
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading, isSuccess };
};

export const useLogout = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.status);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isSuccess };
};

export const useIsLoggedIn = () => {
  const { data, mutate, isSuccess, isLoading } = useMutation({
    mutationFn: isLoggedIn,
    onSuccess: (data) => {
      console.log("inside: ", data);
    },
  });

  console.log(data);

  return { mutate, data, isSuccess, isLoading };
};
