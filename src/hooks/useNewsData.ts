"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
} from "../store/slices/newsSlice";
import { fetchNewsData, getMockNewsData } from "../services/newsService";
import { RootState } from "../store/store";

const useNewsData = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.news
  );
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const getNewsData = async () => {
      // Only fetch if we don't already have data
      if (!loading && data.length === 0) {
        dispatch(fetchNewsStart());

        try {
          let responseData;

          if (useMockData) {
            // Use mock data if API is unavailable
            responseData = getMockNewsData();
            console.log("Using mock data due to previous API failure");
          } else {
            // Try the real API
            responseData = await fetchNewsData();
          }

          if (responseData && responseData.articles) {
            dispatch(fetchNewsSuccess(responseData.articles));
          } else {
            throw new Error("No articles found in the response");
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          dispatch(fetchNewsFailure(errorMessage));
          console.error("News API error:", errorMessage);

          // If we haven't already tried mock data, try it now
          if (!useMockData) {
            setUseMockData(true);
          }
        }
      }
    };

    getNewsData();
  }, [dispatch, data.length, loading, useMockData]);

  return { data, loading, error };
};

export default useNewsData;
