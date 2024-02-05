import React, { useState, useEffect } from "react";
import { apiQueryProductIds } from "apis/productApi";
import { useQuery } from "hooks/useQuery";
import Button from "components/Button";
import PageSizeSelect from "components/SelectPageSize";
import PaginationBar from "components/PaginationBar";
import {
  ProductHeaderRow,
  ProductFilterRow,
  ProductRow,
  LoadingTable,
} from "./table";

const DEFAULT_PAGE_SIZE = 3;

export default function ProductList() {
  const [filters, setFilters] = useState({
    isAsc: true,
    categoryId: "",
  });
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [curPage, setCurPage] = useState(0);
  const {
    data: productIds,
    isLoading,
    refetch,
  } = useQuery({
    queryFunc: () => apiQueryProductIds(filters),
    queryKeys: [filters],
    initData: [],
  });

  useEffect(() => {
    setCurPage(0);
  }, [filters]);

  const currentIds = productIds.slice(
    pageSize * curPage,
    pageSize * (curPage + 1)
  );

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">Product List</h1>
        <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
        <Button onClick={refetch} color="blue">
          Reload
        </Button>
      </header>

      <div className="mt-10 w-4/5">
        <ProductHeaderRow />
        <ProductFilterRow filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <LoadingTable pageSize={pageSize} />
        ) : (
          currentIds.map((id) => <ProductRow key={id} productId={id} />)
        )}
      </div>
      <div className="my-10">
        {!isLoading && (
          <PaginationBar
            totalLength={productIds.length}
            pageSize={pageSize}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        )}
      </div>
    </div>
  );
}
