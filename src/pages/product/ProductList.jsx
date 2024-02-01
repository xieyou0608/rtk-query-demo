import React, { useState, useEffect } from "react";
import { apiQueryProductDetail, apiQueryProductIds } from "apis/productApi";
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
  const [productIds, setProductIds] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [isLoadingIds, setIsLoadingIds] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [refetchNum, setRefetchNum] = useState(0);
  const [filters, setFilters] = useState({
    isAsc: true,
    categoryId: "",
  });
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    const fetchAllIds = async () => {
      setCurPage(0);
      setIsLoadingIds(true);
      try {
        const ids = await apiQueryProductIds(filters); // [0, 1, 2, ...]
        setProductIds(ids);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingIds(false);
      }
    };
    fetchAllIds();
  }, [refetchNum, filters]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoadingDetails(true);
        const curPageIds = productIds.slice(
          pageSize * curPage,
          pageSize * (curPage + 1)
        );
        const detailList = await Promise.all(
          curPageIds.map((id) => apiQueryProductDetail(id)) // [{id: 0, name: 'backpack'}, {id: 1, name: 'shirts'}, ...]
        );
        setProductDetails(
          detailList.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}) // {0: {id: 0, name: 'backpack'}, 1:{id: 1, name: 'shirts'}, ...}
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    if (productIds.length > 0) {
      fetchDetails();
    }
  }, [productIds, pageSize, curPage]);

  const refetch = () => {
    setRefetchNum(refetchNum + 1);
  };

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
        {isLoadingIds || isLoadingDetails ? (
          <LoadingTable pageSize={pageSize} />
        ) : (
          productIds.map(
            (id) =>
              productDetails[id] && (
                <ProductRow key={id} product={productDetails[id]} />
              )
          )
        )}
      </div>
      <div className="my-10">
        {!isLoadingIds && (
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
