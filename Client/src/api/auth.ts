import { setToken, removeToken } from "../utils/auth";
import axiosInstance from "./axiosConfig";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    if (data.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  logout: () => {
    removeToken();
  },
};
