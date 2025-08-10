import { useState, useEffect } from "react";
import { FetchHookResponse } from "../types/fetch";
import { autoSaveFetch, AutoSafeFetch } from "../services/safe-fetch";

const useRequest = <T>(url: string, options: AutoSafeFetch): FetchHookResponse<T> => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [paginationInfo, setPaginationInfo] = useState<{ total: number, page: number, totalPages: number } | null>(null)
  const [error, setError] = useState<{ status: number; message: string } | undefined>(undefined);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      setData(undefined)
      setError(undefined)
      setIsLoaded(false);
      try {
        const res = await autoSaveFetch<T>(url, options);
        if (isActive) {
          if (res.success) {
            setData(res.data);
            setPaginationInfo(res.paginationInfo ?? null)
          }
          else {
            setError({ status: res?.status || 0, message: res?.message ?? 'some error' });
          }
        }
      } catch (err: any) {
        if (isActive) {
          setError({ status: err?.status || 500, message: err?.message || "Unknown error" });
        }
      } finally {
        if (isActive) setIsLoaded(true);
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [url, JSON.stringify(options)]);

  return [isLoaded, data, error, paginationInfo];
};

export { useRequest };