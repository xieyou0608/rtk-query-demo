import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import PageSizeSelect from "components/SelectPageSize";
import PaginationBar from "components/PaginationBar";
import {
  ProductHeaderRow,
  ProductFilterRow,
  ProductRow,
  LoadingTable,
} from "./table";
import {
  fetchProductIds,
  fetchProductDetails,
  fetchCategoryOptions,
} from "./productSlice";
import { setCurPage, setPageSize } from "./productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const productIds = useSelector((state) => state.products.productIds);
  const isLoadingIds = useSelector((state) => state.products.isLoadingIds);
  const pageSize = useSelector((state) => state.products.pageSize);
  const curPage = useSelector((state) => state.products.curPage);
  const filters = useSelector((state) => state.products.filters);
  const [refetchNum, setRefetchNum] = useState(0);

  useEffect(() => {
    dispatch(fetchProductIds(filters));
  }, [refetchNum, filters]);

  useEffect(() => {
    if (productIds.length > 0) {
      const curPageIds = productIds.slice(
        pageSize * curPage,
        pageSize * (curPage + 1)
      );
      dispatch(fetchProductDetails(curPageIds));
    }
  }, [productIds, pageSize, curPage]);

  useEffect(() => {
    dispatch(fetchCategoryOptions());
  }, []);

  const refetch = () => {
    setRefetchNum(refetchNum + 1);
  };

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
        {isLoadingIds ? (
          <LoadingTable pageSize={pageSize} />
        ) : (
          curPageIds.map((id) => <ProductRow key={id} productId={id} />)
        )}
      </div>
      <div className="my-10">
        {!isLoadingIds && (
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
