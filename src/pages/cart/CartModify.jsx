import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiQueryCartDetail, apiUpdateCart } from "apis/cartApi";
import { apiQueryUserDetail } from "apis/userApi";
import { apiQueryProductDetail } from "apis/productApi";
import Button from "components/Button";
import FullScreenLoading from "components/FullScreenLoading";
import { TableCell, TableHeaderRow, TableRow } from "components/table";

export default function CartModify() {
  const navigate = useNavigate();
  const params = useParams();
  const cartId = params.cartId;

  const [cartInfo, setCartInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cartDetail = await apiQueryCartDetail(cartId);
        const userDetail = await apiQueryUserDetail(cartDetail.userId);
        const productDetailList = await Promise.all(
          cartDetail.products.map((item) =>
            apiQueryProductDetail(item.productId),
          ),
        );
        setCartInfo(cartDetail);
        setUserInfo(userDetail);
        setProductList(productDetailList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cartId]);

  const handleSaveCart = async () => {
    setIsSaving(true);
    try {
      await apiUpdateCart(cartId, cartInfo);
      alert("Save successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdd = (id) => {
    const newProducts = cartInfo.products.map((item) => {
      if (item.productId === id) {
        const newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setCartInfo({ ...cartInfo, products: newProducts });
  };
  const handleSubtract = (id) => {
    const newProducts = cartInfo.products.map((item) => {
      if (item.productId === id && item.quantity !== 0) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setCartInfo({ ...cartInfo, products: newProducts });
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-10">
        <h1 className="text-2xl font-bold">Cart Info</h1>
      </header>

      {isLoading && <div className="m-10">Loading...</div>}
      {!isLoading && (
        <div className="w-[80vw] lg:w-[60vw]">
          <div className="my-5 grid grid-cols-2 gap-5">
            <div>Cart Id</div>
            <div>{cartId}</div>

            <div>Buyer</div>
            <div className="w-fit rounded-md bg-gray-300 p-3 shadow">
              <div className="w-fit rounded-sm bg-sky-700 px-2 text-white">
                No. {userInfo.id}
              </div>
              <div>
                <div>
                  Name: {userInfo.name?.firstname} {userInfo.name?.lastname}
                </div>
                <div>Phone: {userInfo.phone}</div>
                <div>Email: {userInfo.email}</div>
              </div>
            </div>

            <div>Date</div>
            <div>{new Date(cartInfo.date).toLocaleString()}</div>

            <div>ProductList</div>
          </div>
          <div>
            <TableHeaderRow>
              <TableCell className="w-1/6">No</TableCell>
              <TableCell className="w-3/6">Title</TableCell>
              <TableCell className="w-1/6">Quantity</TableCell>
              <TableCell className="w-1/6">Action</TableCell>
            </TableHeaderRow>

            {productList.map((product, idx) => (
              <TableRow key={product.id}>
                <TableCell className="w-1/6">{product.id}</TableCell>
                <TableCell className="w-3/6">{product.title}</TableCell>
                <TableCell className="w-1/6">
                  {cartInfo.products[idx].quantity}
                </TableCell>
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
    </div>
  );
}
