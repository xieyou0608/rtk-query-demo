import React from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "components/table";
import { useQuery } from "hooks/useQuery";
import { apiQueryCartDetail } from "apis/cartApi";
import { apiQueryUserDetail } from "apis/userApi";
import { apiQueryProductDetail } from "apis/productApi";
import { LoadingRow } from "./LoadingTable";

export default function ({ cartId }) {
  const {
    data: cart,
    isLoading,
    isSuccess: isCartSuccess,
  } = useQuery({
    queryFunc: () => apiQueryCartDetail(cartId),
    queryKeys: [cartId],
    initData: {},
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useQuery({
    queryFunc: () => apiQueryUserDetail(cart.userId),
    queryKeys: [cart.userId],
    isEnabled: isCartSuccess,
  });

  if (isLoading) {
    return <LoadingRow />;
  }

  return (
    <TableRow>
      <TableCell className="w-1/12">{cart.id}</TableCell>
      <TableCell className="w-2/12">
        {isUserLoading ? (
          <div className="h-6 w-6 animate-pulse rounded-lg bg-gray-300" />
        ) : isUserSuccess ? (
          user.name.firstname + " " + user.name.lastname
        ) : (
          <div className="text-red-500">wrong</div>
        )}
      </TableCell>
      <TableCell className="w-2/12">
        {new Date(cart.date).toLocaleString()}
      </TableCell>
      <TableCell className="w-6/12 flex-col space-y-1">
        {cart.products.map((product) => (
          <ProductInfo
            key={product.productId}
            productId={product.productId}
            quantity={product.quantity}
            isEnabled={isCartSuccess}
          />
        ))}
      </TableCell>
      <TableCell className="w-1/12">
        <Link to={`/cart/${cart.id}`} className="text-blue-600 underline">
          Edit
        </Link>
      </TableCell>
    </TableRow>
  );
}

const ProductInfo = ({ productId, quantity, isEnabled }) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryFunc: () => apiQueryProductDetail(productId),
    queryKeys: [productId],
    isEnabled: isEnabled,
  });

  if (isLoading) {
    return <div className="h-4 w-48 rounded-md bg-gray-300" />;
  }
  if (isError) {
    <div className="text-red-500">wrong</div>;
  }
  return (
    <div className="flex w-full text-left">
      <div className="mr-3 h-fit flex-shrink-0 rounded-sm bg-green-800 px-1 text-white">
        No. {productId}
      </div>
      <div>
        {product.title} x {quantity}
      </div>
    </div>
  );
};
