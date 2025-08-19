import React, { useState,useEffect,ComponentType,JSX } from "react";
import { ErrorMessage } from "../../../types/fetch";
import { createErrorComponent,createLoadingComponent } from "../util";
import { ResponseDataLoaderProps,HookDataLoaderProps } from "../types";

const DataLoaderFromHook = <T,>({ res, page, loadingComponent,errorElement }: HookDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(createLoadingComponent(loadingComponent));

  const [isLoaded, data, error] = res;

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(createErrorComponent(errorElement,error));
      } else if (data) {
        setCurrentPage(React.createElement(page, { data }));
      }
    }
  }, [isLoaded, data, error, page]);

  return currentPage;
};

export {DataLoaderFromHook}