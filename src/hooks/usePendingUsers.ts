import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

// Hook responsável pela listagem dos usuários pendentes
export function usePendingUsers() {
  return useQuery({
    queryKey: ["pending-users"],

    queryFn: () => userService.getPendingUsers(),
  });
}