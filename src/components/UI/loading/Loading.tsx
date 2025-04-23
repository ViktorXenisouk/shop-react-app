import { useLoadData } from '../../hooks/useLoadData'
import { useEffect,useState } from 'react'
import ErrorPage  from '../../pages/ErrorPage'
import React from 'react';
import {JSX} from 'react'

type LoadingProps<T> = {
    getData: (props?: any) => T;
    page: React.ComponentType<any>;  // Убедитесь, что передаете компонент, а не функцию.
    params?: any;
};

const Loading = ({ getData, page, params }: LoadingProps<any|undefined>) => {
    const [isLoaded, data, error] = useLoadData(getData, params);
    const [currentPage, setCurrentPage] = useState<JSX.Element>(<div>Loading...</div>);

    useEffect(() => {
        if (isLoaded) {
            if (data && !error) {
                setCurrentPage(React.createElement(page, {data} ));
            } else if (error || !data) {
                setCurrentPage(<ErrorPage />);
            }
        }
    }, [isLoaded, data, error, page]);

    return currentPage;
};

export {Loading}