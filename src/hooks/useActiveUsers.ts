import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

export function useActiveUsers() {
  return useQuery({
    queryKey: ["active-users"],

    queryFn: async () => {
      const { data, error } =
        await userService.getActiveUsers();

      if (error) throw error;

      return data;
    },
  });
}