import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartIdsQuery } from "store/apiSlice";
import Button from "components/Button";
import PaginationBar from "components/PaginationBar";
import PageSizeSelect from "components/SelectPageSize";
import { CartHeaderRow, CartFilterRow, CartRow, LoadingTable } from "./table";
import { setCurPage, setPageSize } from "./cartSlice";

export default function CartList() {
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.carts.pageSize);
  const curPage = useSelector((state) => state.carts.curPage);
  const filters = useSelector((state) => state.carts.filters);
  const { data: cartIds, isFetching, refetch } = useGetCartIdsQuery(filters);

  const curPageIds = cartIds?.slice(
    pageSize * curPage,
    pageSize * (curPage + 1)
  );

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Cart List</h1>
        <PageSizeSelect
          pageSize={pageSize}
          setPageSize={(num) => dispatch(setPageSize(num))}
        />
        <Button onClick={refetch} color="blue">
          Reload
        </Button>
      </header>

      <div className="mt-10 w-4/5">
        <CartHeaderRow />
        <CartFilterRow />
        {isFetching && <LoadingTable pageSize={pageSize} />}
        {!isFetching &&
          curPageIds.map((id) => <CartRow key={id} cartId={id} />)}
      </div>
      <div className="my-10">
        {!isFetching && (
          <PaginationBar
            totalLength={cartIds.length}
            pageSize={pageSize}
            curPage={curPage}
            setCurPage={(num) => dispatch(setCurPage(num))}
          />
        )}
      </div>
    </div>
  );
}
