"use client"; // Mark this file as a client component

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFinanceStart,
  fetchFinanceSuccess,
  fetchFinanceFailure,
} from "../store/slices/financeSlice";
import { fetchFinanceData } from "../services/financeService";
import { RootState } from "../store/store";

const useStockData = (symbol: string) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.finance
  );

  useEffect(() => {
    const getStockData = async () => {
      dispatch(fetchFinanceStart());
      try {
        const response = await fetchFinanceData(symbol);
        if (response) {
          dispatch(fetchFinanceSuccess(response));
        } else {
          throw new Error("No data found in the response");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        dispatch(fetchFinanceFailure(errorMessage));
      }
    };

    getStockData();
  }, [symbol, dispatch]);

  return { data, loading, error };
};

export default useStockData;
