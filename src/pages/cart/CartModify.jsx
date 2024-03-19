import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "components/Button";
import FullScreenLoading from "components/FullScreenLoading";
import { TableCell, TableHeaderRow, TableRow } from "components/table";
import SelectProductModal from "./SelectProductModal";
import {
  useEditCartMutation,
  useGetCartDetailQuery,
  useGetProductDetailQuery,
  useGetUserDetailQuery,
} from "store/apiSlice";

export default function CartModify() {
  const navigate = useNavigate();
  const params = useParams();
  const cartId = params.cartId;

  const {
    data: cartInfo,
    isLoading,
    isSuccess,
  } = useGetCartDetailQuery(cartId);
  const [updateCart, { isLoading: isSaving }] = useEditCartMutation();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setProducts(cartInfo.products);
    }
  }, [cartInfo, isSuccess]);

  const handleSaveCart = async () => {
    const newCartInfo = { ...cartInfo, products: products };
    await updateCart(newCartInfo);
    alert("Save successfully!");
    navigate("/cart");
  };

  const handleAdd = (id) => {
    const newProducts = products.map(({ productId, quantity }) => ({
      productId,
      quantity: productId === id ? quantity + 1 : quantity,
    }));
    setProducts(newProducts);
  };
  const handleSubtract = (id) => {
    const newProducts = products
      .map(({ productId, quantity }) => ({
        productId,
        quantity: productId === id ? quantity - 1 : quantity,
      }))
      .filter(({ quantity }) => quantity > 0);
    setProducts(newProducts);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, { productId: product.id, quantity: 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-10">
        <h1 className="text-2xl font-bold">Cart Info</h1>
      </header>

      {isLoading && <div className="m-10">Loading...</div>}
      {isSuccess && (
        <div className="w-[80vw] lg:w-[60vw]">
          <div className="my-5 grid grid-cols-2 gap-5">
            <div>Cart Id</div>
            <div>{cartId}</div>

            <div>Buyer</div>
            <UserInfo userId={cartInfo.userId} />

            <div>Date</div>
            <div>{new Date(cartInfo.date).toLocaleString()}</div>

            <div>ProductList</div>
            <div>
              <Button
                onClick={() => setIsModalOpen(true)}
                color="blue"
                className="w-fit"
              >
                Select new Product
              </Button>
            </div>
          </div>
          <div>
            <TableHeaderRow>
              <TableCell className="w-1/6">No</TableCell>
              <TableCell className="w-3/6">Title</TableCell>
              <TableCell className="w-1/6">Quantity</TableCell>
              <TableCell className="w-1/6">Action</TableCell>
            </TableHeaderRow>

            {products.map((product) => (
              <ProductRow
                key={product.productId}
                productId={product.productId}
                quantity={product.quantity}
                handleAdd={handleAdd}
                handleSubtract={handleSubtract}
              />
            ))}
          </div>
        </div>
      )}
      <footer className="my-10 space-x-10">
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={handleSaveCart} color="green">
          Save
        </Button>
      </footer>

      {isSaving && <FullScreenLoading>Saving...</FullScreenLoading>}

      <SelectProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existedProductIds={products.map((item) => item.id)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}

const UserInfo = ({ userId }) => {
  const { data: user, isSuccess } = useGetUserDetailQuery(userId, {
    skip: !userId,
  });
  if (!isSuccess) {
    return null;
  }
  return (
    <div className="w-fit rounded-md bg-gray-300 p-3 shadow">
      <div className="w-fit rounded-sm bg-sky-700 px-2 text-white">
        No. {user.id}
      </div>
      <div>
        <div>
          Name: {user.name.firstname} {user.name.lastname}
        </div>
        <div>Phone: {user.phone}</div>
        <div>Email: {user.email}</div>
      </div>
    </div>
  );
};

const ProductRow = ({ productId, quantity, handleAdd, handleSubtract }) => {
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
      <TableCell className="w-1/6">{quantity}</TableCell>
      <TableCell className="w-1/6 space-x-2">
        <button
          onClick={() => handleSubtract(product.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-3xl font-bold text-red-600 hover:bg-gray-300"
        >
          -
        </button>
        <button
          onClick={() => handleAdd(product.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-3xl font-bold text-green-600 hover:bg-gray-300"
        >
          +
        </button>
      </TableCell>
    </TableRow>
  );
};
