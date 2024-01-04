import { axiosInstance } from "./api";

const endpoint = "/carts";

export const apiQueryCartIds = async ({
  userId,
  isAsc = true,
  startDate,
  endDate,
}) => {
  try {
    const resultData = await axiosInstance.get(
      userId ? `/carts/user/${userId}` : "/carts",
      {
        params: {
          sort: isAsc ? "asc" : "desc",
          startdate: startDate,
          enddate: endDate,
        },
      }
    );
    return resultData.map((cart) => cart.id);
  } catch (error) {
    throw error;
  }
};

export const apiQueryCartDetail = (cartId) => {
  return axiosInstance.get(endpoint + "/" + cartId);
};

export const apiAddCart = ({ userId, date, products }) => {
  return axiosInstance.post(endpoint, {
    userId,
    date,
    products,
  });
};

export const apiUpdateCart = (cartId, { userId, date, products }) => {
  return axiosInstance.put(endpoint + "/" + cartId, {
    userId,
    date,
    products,
  });
};

export const apiDeleteCart = (cartId) => {
  return axiosInstance.delete(endpoint + "/" + cartId);
};
