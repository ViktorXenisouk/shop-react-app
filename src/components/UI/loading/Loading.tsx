import { useRequest } from '../../hooks/useLoadData'
import { useEffect,useState } from 'react'
import ErrorPage  from '../../pages/ErrorPage'
import React from 'react';
import {JSX} from 'react'

type LoadingProps<T> = {
    url: string,
    requestInit: RequestInit
    page: React.ComponentType<any>;
};


const Loading = ({url,requestInit,page}: LoadingProps<any|undefined>) => {
    const [isLoaded, data, error] = useRequest(url, requestInit);
    const [currentPage, setCurrentPage] = useState<JSX.Element>(<div>Loading...</div>);

    useEffect(() => {
        if (isLoaded) {
            if (error) {
                setCurrentPage(<ErrorPage status={error.status} message={error.message}/>);
            } else if (data) {
                setCurrentPage(React.createElement(page, {data} ));
            }
        }
    }, [isLoaded, data, error, page]);

    return currentPage;
};

export {Loading}