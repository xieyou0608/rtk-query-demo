import { axiosInstance } from "./api";

const endpoint = "/products";

export const apiQueryProductIds = async ({ categoryId, isAsc = true }) => {
  try {
    const resultData = await axiosInstance.get(
      categoryId ? `/products/category/${categoryId}` : "products",
      {
        params: {
          sort: isAsc ? "asc" : "desc",
        },
      }
    );
    return resultData.map((product) => product.id);
  } catch (error) {
    throw error;
  }
};

export const apiQueryProductDetail = (productId) => {
  return axiosInstance.get(endpoint + "/" + productId);
};

export const apiQueryCategories = () => {
  return axiosInstance.get(endpoint + "/categories");
};

export const apiAddProduct = ({
  title,
  price,
  description,
  image,
  category,
}) => {
  return axiosInstance.post(endpoint, {
    title,
    price,
    description,
    image,
    category,
  });
};

export const apiUpdateProduct = (
  productId,
  { title, price, description, image, category }
) => {
  return axiosInstance.put(endpoint + "/" + productId, {
    title,
    price,
    description,
    image,
    category,
  });
};

export const apiDeleteProduct = (productId) => {
  return axiosInstance.delete(endpoint + "/" + productId);
};
