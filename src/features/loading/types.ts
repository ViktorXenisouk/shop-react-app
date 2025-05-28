import { FetchHookResponse, FetchResponse } from '../../types/fetch';
import { ErrorMessage } from '../../types/fetch';

type HookDataLoaderProps<T> = {
    res: FetchHookResponse<T>
    page: React.ComponentType<{ data: T }>;
};

type ResponseDataLoaderProps<T> = {
    res: Promise<FetchResponse<T>>;
    page: React.ComponentType<{ data: T }>;
}

type PaginationDataLoaderProps<T> = {
    isLoaded:boolean,
    data:T,
    error:ErrorMessage,
    page:React.ComponentType<{ data: T }>;
}

export type { HookDataLoaderProps, ResponseDataLoaderProps,PaginationDataLoaderProps}