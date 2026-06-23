import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

export function useApproveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } =
        await userService.approveUser(userId);

      if (error) throw error;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["pending-users"],
      });
    },
  });
}