import React, { useEffect, useState } from "react";

import { apiQueryProductDetail, apiQueryProductIds } from "apis/productApi";
import Modal from "components/Modal";
import Button from "components/Button";
import { TableCell, TableHeaderRow, TableRow } from "components/table";

export default function SelectProductModal({
  isOpen,
  onClose,
  existedProductIds = [],
  onAdd,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const idList = await apiQueryProductIds({});
        const productList = await Promise.all(
          idList.map((id) => apiQueryProductDetail(id)),
        );
        setProducts(productList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

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
          {!isLoading &&
            products.map((product) => (
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
            ))}
        </div>

        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
