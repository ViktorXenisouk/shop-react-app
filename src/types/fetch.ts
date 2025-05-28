type FetchHookResponse<T> = [boolean, T | undefined, { status: number, message: string } | undefined]

type FetchRequest = {url:string,requestInit:RequestInit}

type ErrorMessage = {
    status?: number;
    message?: string;
};

type FetchResponse<T> = {data?:T,success:boolean,message?:string,status?:number}

export type {FetchHookResponse,FetchRequest,FetchResponse,ErrorMessage}