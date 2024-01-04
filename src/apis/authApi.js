import { axiosInstance } from "./api";

const endpoint = "/auth";

export const apiLogin = async ({ username, password }) => {
  try {
    const result = axiosInstance.post(endpoint + "/login", {
      username: username || "mor_2314",
      password: password || "83r5^_",
    });
    sessionStorage["token"] = result.token;
    return result;
  } catch (error) {
    throw error;
  }
};
