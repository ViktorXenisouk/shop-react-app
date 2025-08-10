import { useEffect, useState } from 'react'
import ErrorPage from '../../pages/ErrorPage'
import React from 'react';
import { JSX } from 'react'
import { HookDataLoaderProps, ResponseDataLoaderProps, PaginationDataLoaderProps } from './types';
import { ComponentType } from 'react';
import { CircularProgress,Box } from '@mui/material';

const simpleProgres = 
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<CircularProgress/>
    </Box>

const DataLoaderSimple = <T,>({ res, page}: ResponseDataLoaderProps<T> & { page: ComponentType<{ data: T | null }> }) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<{ status: number; message: string } | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const result = await res

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError({
          status: result.status || 500,
          message: result.message || 'some mistake'
        })
      }
    }

    fetch()
  }, [res, page])

  if (error) return <ErrorPage status={error.status} message={error.message} />

  return React.createElement(page, { data })
}

const DataLoaderFromHookSimple = <T,>({ res, page }: HookDataLoaderProps<T> & { page: ComponentType<{ data?: T | null }> }) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(React.createElement(page, { data: res[1] }));

  const [isLoaded, data, error] = res;

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(<ErrorPage status={error.status} message={error.message} />);
      } else {
        setTimeout(()=>{
        setCurrentPage(React.createElement(page, { data }));
        },500)
      }
    }
    else{
      setCurrentPage(React.createElement(page, { data:undefined }))
    }
  }, [res, page]);

  return currentPage;
}

const DataLoaderFromHook = <T,>({ res, page,loadingComponent = simpleProgres}: HookDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(loadingComponent);

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

const DataLoaderFromPromise = <T,>({ res, page,loadingComponent = simpleProgres }: ResponseDataLoaderProps<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<{ status: number; message: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const result = await res

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError({
          status: result.status || 500,
          message: result.message || 'some mistake'
        })
      }
      setLoading(false)
    }

    fetch()
  }, [res, page])

  if (loading) return loadingComponent
  if (error) return <ErrorPage status={error.status} message={error.message} />
  if (data) return React.createElement(page, { data })

  return null
}

const DataLoaderFromHookWithPagination = <T,>({ isLoaded, data, error, page, loadingComponent = simpleProgres,errorElement=ErrorPage }: PaginationDataLoaderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(loadingComponent);

  useEffect(() => {
    if (isLoaded) {
      if (error) {
        setCurrentPage(React.createElement(errorElement,{message:error.message||'',status:error.status||500}));
      } else if (data) {
        setCurrentPage(React.createElement(page, { data }));
      }
    }
    else {
      setCurrentPage(loadingComponent)
    }
  }, [isLoaded, data, error, page]);

  return currentPage;
};

export { DataLoaderFromHook, DataLoaderFromPromise, DataLoaderFromHookWithPagination, DataLoaderSimple, DataLoaderFromHookSimple };