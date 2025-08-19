import React, { useEffect, useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import MainView from './MainView';

const Main: React.FC = () => {
    const [currentId, setCurrentId] = useState(-1);
    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false);

    const onClose = () => {
        setCurrentId(-1)
    }

    const timer = useTimer(() => setCurrentId(-1), 1500);

    useEffect(() => {
        if (!isCatalogMouseOver) {
            timer('reset');
        } else {
            timer('disactive');
        }
    }, [isCatalogMouseOver]);


    return (
        <MainView
            onClose={onClose}
            currentId={currentId}
            setIsCatalogMouseOver={setIsCatalogMouseOver}
            setCurrentId={setCurrentId}
        />
    )
}

export default Main