import { useState, useEffect } from "react";

const DataStatus = Object.freeze({
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

export const useQuery = ({
  queryFunc,
  queryKeys = [],
  initData = null,
  isEnabled = true,
}) => {
  const [data, setData] = useState(initData);
  const [status, setStatus] = useState(DataStatus.LOADING);
  const [error, setError] = useState(null);
  const [refetchNum, setRefetchNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(DataStatus.LOADING);
        setError(null);
        const result = await queryFunc();
        setStatus(DataStatus.SUCCESS);
        setData(result);
      } catch (e) {
        setStatus(DataStatus.ERROR);
        setError(e);
      }
    };
    if (isEnabled) {
      fetchData();
    }
  }, [refetchNum, isEnabled, ...queryKeys]);

  const refetch = () => {
    setRefetchNum(refetchNum + 1);
  };

  const isLoading = status === DataStatus.LOADING;
  const isSuccess = status === DataStatus.SUCCESS;
  const isError = status === DataStatus.ERROR;

  return { data, status, isLoading, isSuccess, isError, error, refetch };
};
