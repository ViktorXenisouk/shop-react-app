import React, { useState,useEffect } from "react";
import { createErrorComponent,createLoadingComponent } from "../util";
import { ResponseDataLoaderProps } from "../types";

const DataLoaderFromPromise = <T,>({ res, page, loadingComponent,errorElement }: ResponseDataLoaderProps<T>) => {
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

  if (loading) return createLoadingComponent(loadingComponent)
  if (error) return createErrorComponent(errorElement,error)
  if (data) return React.createElement(page, { data })

  return null
}

export {DataLoaderFromPromise}