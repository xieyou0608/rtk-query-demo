import React from "react";
import { useQuery } from "hooks/useQuery";
import { apiQueryProductDetail } from "apis/productApi";
import { TableCell, TableRow } from "components/table";
import { LoadingRow } from "./LoadingTable";

export default function ProductRow({ productId }) {
  const { data: product, isLoading } = useQuery({
    queryFunc: () => apiQueryProductDetail(productId),
    queryKeys: [productId],
  });

  return isLoading || !product ? (
    <LoadingRow />
  ) : (
    <TableRow className="h-32">
      <TableCell className="w-1/5">
        <img
          src={product.image}
          alt={product.id}
          className="h-full w-full object-contain"
        />
      </TableCell>
      <TableCell className="w-1/5">{product.id}</TableCell>
      <TableCell className="w-1/5">{product.title}</TableCell>
      <TableCell className="w-1/5">{product.price}</TableCell>
      <TableCell className="w-1/5">{product.category}</TableCell>
    </TableRow>
  );
}
