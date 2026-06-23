import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

export function useRejectUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } =
        await userService.rejectUser(userId);

      if (error) throw error;
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["pending-users"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["active-users"],
        }),
      ]);
    },
  });
}