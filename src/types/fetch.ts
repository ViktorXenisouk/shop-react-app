type FetchHookResponse<T> = [boolean, T | undefined, { status: number, message: string } | undefined,{ total: number, page: number, totalPages: number } | null]

type FetchRequest = {url:string,requestInit:RequestInit}

type ErrorMessage = {
    status?: number;
    message?: string;
};

type FetchResponse<T> = {data?:T,success:boolean,message?:string,status?:number,paginationInfo?:{total: number,page: number,totalPages: number;}}

export type {FetchHookResponse,FetchRequest,FetchResponse,ErrorMessage}