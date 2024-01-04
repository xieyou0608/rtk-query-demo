import { axiosInstance } from "./api";

const endpoint = "/users";

export const apiQueryUsers = async ({ isAsc = true }) => {
  return axiosInstance.get(endpoint, {
    params: {
      sort: isAsc ? "asc" : "desc",
    },
  });
};

export const apiQueryUserDetail = (userId) => {
  return axiosInstance.get(endpoint + "/" + userId);
};

export const apiAddUser = ({
  email,
  username,
  password,
  name,
  address,
  phone,
}) => {
  return axiosInstance.post(endpoint, {
    email,
    username,
    password,
    name,
    address,
    phone,
  });
};

export const apiUpdateUser = (
  userId,
  { email, username, password, name, address, phone }
) => {
  return axiosInstance.put(endpoint + "/" + userId, {
    email,
    username,
    password,
    name,
    address,
    phone,
  });
};

export const apiDeleteUser = (userId) => {
  return axiosInstance.delete(endpoint + "/" + userId);
};
