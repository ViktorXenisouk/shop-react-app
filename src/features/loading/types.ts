import { FetchHookResponse, FetchResponse } from '../../types/fetch';
import { ErrorMessage } from '../../types/fetch';

type HookDataLoaderProps<T> = {
    res: FetchHookResponse<T>
    page: React.ComponentType<{ data: T }>;
    loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<ErrorMessage>;
};

type ResponseDataLoaderProps<T> = {
    res: Promise<FetchResponse<T>>;
    page: React.ComponentType<{ data: T }>;
     loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<ErrorMessage>;
}

type PaginationDataLoaderProps<T> = {
    isLoaded:boolean,
    data:T,
    error?:ErrorMessage|null,
    page:React.ComponentType<{ data: T }>;
       loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<ErrorMessage>;
}

export type { HookDataLoaderProps, ResponseDataLoaderProps,PaginationDataLoaderProps}