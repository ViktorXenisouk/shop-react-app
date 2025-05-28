import { useEffect, useState } from 'react'
import ErrorPage from '../../pages/ErrorPage'
import React from 'react';
import { JSX } from 'react'
import { HookDataLoaderProps,ResponseDataLoaderProps,PaginationDataLoaderProps} from './types';

const DataLoaderFromHook = <T,>({ res, page }: HookDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<div>Loading...</div>);

  const [isLoaded, data, error] = res;

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(<ErrorPage status={error.status} message={error.message} />);
      } else if (data) {
        setCurrentPage(React.createElement(page, { data }));
      }
    }
  }, [isLoaded, data, error, page]);

  return currentPage;
};

const DataLoaderFromPromise = <T,>({ res, page }: ResponseDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<div>Loading...</div>);

  const fetch = async () => {
    const result = await res

    if (result.success && result.data) {
      setCurrentPage(React.createElement(page, { data:result.data }));    }
    else{
      setCurrentPage(<ErrorPage status={result.status || 500} message={result.message || 'some mistake'} />)
    }
  }

  useEffect(() => {
    fetch()
  },[res,page])

  return currentPage;
}

const DataLoaderFromHookWithPagination = <T,>({ isLoaded,data,error, page }: PaginationDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<div>Loading...</div>);

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(<ErrorPage status={error?.status||500} message={error?.message||'some mistake'} />);
      } else if (data) {
        setCurrentPage(React.createElement(page, { data }));
      }
    }
    else{
      setCurrentPage(<div>Loading...</div>)
    }
  }, [isLoaded, data, error, page]);

  return currentPage;
};

export { DataLoaderFromHook ,DataLoaderFromPromise,DataLoaderFromHookWithPagination};