import React, { useState,useEffect,ComponentType } from "react";
import { ErrorMessage } from "../../../types/fetch";
import { createErrorComponent } from "../util";
import { ResponseDataLoaderProps } from "../types";

const DataLoaderFromPromiseSimple = <T,>({ res, page,errorElement }: ResponseDataLoaderProps<T> & { page: ComponentType<{ data: T | null }> }) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ErrorMessage | null>(null)

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

  if (error) return createErrorComponent(errorElement,error)

  return React.createElement(page, { data })
}

export {DataLoaderFromPromiseSimple}