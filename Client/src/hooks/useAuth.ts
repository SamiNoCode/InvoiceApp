import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message,
    isSuccess: loginMutation.isSuccess,
  };
};
