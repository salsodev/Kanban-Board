import { useMutation, useQueryClient } from "react-query";
import { createSubtask, updateSubtask } from "../service";
import { toast } from "sonner";

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: ({ payload }) => createSubtask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["taskDetail"]);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};

export const useUpdateSubtask = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: ({ payload, subtaskID }) => updateSubtask(payload, subtaskID),
    onSuccess: () => {
      queryClient.invalidateQueries(["taskDetail"]);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return { mutate, data, isLoading };
};
