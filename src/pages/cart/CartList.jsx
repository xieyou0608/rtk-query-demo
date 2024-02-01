import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "hooks/useQuery";
import { apiQueryCartIds } from "apis/cartApi";
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
  const {
    data: cartIds,
    isLoading,
    refetch,
  } = useQuery({
    queryFunc: () => apiQueryCartIds(filters),
    queryKeys: [filters],
    initData: [],
  });

  const curPageIds = cartIds.slice(
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
        {isLoading && <LoadingTable pageSize={pageSize} />}
        {!isLoading && curPageIds.map((id) => <CartRow key={id} cartId={id} />)}
      </div>
      <div className="my-10">
        {!isLoading && (
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
