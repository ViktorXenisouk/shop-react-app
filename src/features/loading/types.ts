import { FetchHookResponse, FetchResponse } from '../../types/fetch';
import { ErrorMessage } from '../../types/fetch';

type HookDataLoaderProps<T> = {
    res: FetchHookResponse<T>
    page: React.ComponentType<{ data: T }>;
    loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<{ message:string,status:number }>;
};

type ResponseDataLoaderProps<T> = {
    res: Promise<FetchResponse<T>>;
    page: React.ComponentType<{ data: T }>;
     loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<{ message:string,status:number }>;
}

type PaginationDataLoaderProps<T> = {
    isLoaded:boolean,
    data:T,
    error?:ErrorMessage|null,
    page:React.ComponentType<{ data: T }>;
       loadingComponent?:React.JSX.Element,
    errorElement?:React.ComponentType<{ message:string,status:number }>;
}

export type { HookDataLoaderProps, ResponseDataLoaderProps,PaginationDataLoaderProps}