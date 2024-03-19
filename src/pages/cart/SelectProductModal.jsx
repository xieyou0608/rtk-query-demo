import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import { TableCell, TableHeaderRow, TableRow } from "components/table";
import {
  useGetProductDetailQuery,
  useGetProductIdsQuery,
} from "store/apiSlice";

export default function SelectProductModal({
  isOpen,
  onClose,
  existedProductIds = [],
  onAdd,
}) {
  const { data: productIds, isLoading, isSuccess } = useGetProductIdsQuery();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col p-5">
        <h1 className="text-2xl font-bold">Select an product</h1>
        <div className="my-3 max-h-[50vh] overflow-auto">
          <TableHeaderRow>
            <TableCell className="w-1/6">No</TableCell>
            <TableCell className="w-3/6">Title</TableCell>
            <TableCell className="w-1/6">Price</TableCell>
            <TableCell className="w-1/6"></TableCell>
          </TableHeaderRow>
          {isLoading && (
            <TableRow>
              <TableCell className="h-[30vh] w-[60vw]">Loading...</TableCell>
            </TableRow>
          )}
          {isSuccess &&
            productIds.map((productId) => (
              <ProductRow
                key={productId}
                productId={productId}
                existedProductIds={existedProductIds}
                onAdd={onAdd}
              />
            ))}
        </div>

        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}

const ProductRow = ({ productId, existedProductIds, onAdd }) => {
  const { data: product, isSuccess } = useGetProductDetailQuery(productId, {
    skip: !productId,
  });
  if (!isSuccess) {
    return null;
  }
  return (
    <TableRow key={product.id}>
      <TableCell className="w-1/6">{product.id}</TableCell>
      <TableCell className="w-3/6">{product.title}</TableCell>
      <TableCell className="w-1/6">{product.price}</TableCell>
      <TableCell className="w-1/6">
        {!existedProductIds.includes(product.id) && (
          <Button color="blue" onClick={() => onAdd(product)}>
            Select
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
