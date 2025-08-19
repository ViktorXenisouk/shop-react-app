import React, { useState,useEffect,JSX } from "react";
import { createErrorComponent,createLoadingComponent } from "../util";
import { PaginationDataLoaderProps } from "../types";

const DataLoaderFromHookWithPagination = <T,>({ isLoaded, data, error, page, loadingComponent, errorElement }: PaginationDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(createLoadingComponent(loadingComponent));

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(createErrorComponent(errorElement,error));
      } else if (data) {
        setCurrentPage(React.createElement(page, { data }));
      }
    }
    else {
      setCurrentPage(createLoadingComponent(loadingComponent))
    }
  }, [isLoaded, data, error, page]);

  return currentPage;
};

export {DataLoaderFromHookWithPagination}