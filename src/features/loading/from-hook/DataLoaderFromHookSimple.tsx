import React, { useState, useEffect, ComponentType, JSX } from "react";
import { createErrorComponent } from "../util";
import { HookDataLoaderProps } from "../types";

const DataLoaderFromHookSimple = <T,>({ res, page, errorElement }: HookDataLoaderProps<T> & { page: ComponentType<{ data?: T | null }> }) => {
    const [currentPage, setCurrentPage] = useState<JSX.Element>(React.createElement(page, { data: res[1] }));

    const [isLoaded, data, error] = res;

    useEffect(() => {
        if (isLoaded) {
            if (error) {
                setCurrentPage(createErrorComponent(errorElement, error));
            } else {
                setCurrentPage(React.createElement(page, { data }));
            }
        }
        else {
            setCurrentPage(React.createElement(page, { data: undefined }))
        }
    }, [res, page]);

    return currentPage;
}

export { DataLoaderFromHookSimple }