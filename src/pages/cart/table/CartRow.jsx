import React from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "components/table";
import { useQuery } from "hooks/useQuery";
import { apiQueryCartDetail } from "apis/cartApi";
import { apiQueryUserDetail } from "apis/userApi";
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
      <TableCell className="w-6/12 flex-col">
        {cart.products.map((product) => (
          <div key={product.productId}>
            No.{product.productId} x {product.quantity}
          </div>
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
