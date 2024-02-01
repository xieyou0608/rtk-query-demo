import React from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "components/table";
import { useQuery } from "hooks/useQuery";
import { apiQueryCartDetail } from "apis/cartApi";
import { LoadingRow } from "./LoadingTable";

export default function ({ cartId }) {
  const { data: cart, isLoading } = useQuery({
    queryFunc: () => apiQueryCartDetail(cartId),
    queryKeys: [cartId],
  });

  if (isLoading) {
    return <LoadingRow />;
  }

  return (
    <TableRow>
      <TableCell className="w-1/12">{cart.id}</TableCell>
      <TableCell className="w-2/12">{cart.userId}</TableCell>
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
