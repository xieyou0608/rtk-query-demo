import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "hooks/useQuery";
import { apiQueryProductIds } from "apis/productApi";
import Button from "components/Button";
import PageSizeSelect from "components/SelectPageSize";
import PaginationBar from "components/PaginationBar";
import {
  ProductHeaderRow,
  ProductFilterRow,
  ProductRow,
  LoadingTable,
} from "./table";
import { setCurPage, setPageSize } from "./productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.products.pageSize);
  const curPage = useSelector((state) => state.products.curPage);
  const filters = useSelector((state) => state.products.filters);

  const {
    data: productIds,
    isLoading,
    refetch,
  } = useQuery({
    queryFunc: () => apiQueryProductIds(filters),
    queryKeys: [filters],
    initData: [],
  });

  const curPageIds = productIds.slice(
    pageSize * curPage,
    pageSize * (curPage + 1)
  );

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Product List</h1>
        <PageSizeSelect
          pageSize={pageSize}
          setPageSize={(num) => dispatch(setPageSize(num))}
        />
        <Button onClick={refetch} color="blue">
          Reload
        </Button>
      </header>

      <div className="mt-10 w-4/5">
        <ProductHeaderRow />
        <ProductFilterRow />
        {isLoading ? (
          <LoadingTable pageSize={pageSize} />
        ) : (
          curPageIds.map((id) => <ProductRow key={id} productId={id} />)
        )}
      </div>
      <div className="my-10">
        {!isLoading && (
          <PaginationBar
            totalLength={productIds.length}
            pageSize={pageSize}
            curPage={curPage}
            setCurPage={(num) => dispatch(setCurPage(num))}
          />
        )}
      </div>
    </div>
  );
}
