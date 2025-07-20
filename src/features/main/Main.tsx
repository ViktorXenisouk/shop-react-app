import { useEffect, useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import MainView from './MainView';

const Main = () => {
    const [currentId, setCurrentId] = useState(-1);
    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false);


    const onClose = () => {
        setCurrentId(-1)
    }

    const timer = useTimer(() => setCurrentId(-1), 10000000);

    useEffect(() => {
        if (!isCatalogMouseOver) {
            timer('reset');
        } else {
            timer('disactive');
        }
    }, [isCatalogMouseOver]);


    return (
        <MainView currentId={currentId} onClose={onClose} setIsCatalogMouseOver={setIsCatalogMouseOver} setCurrentId={setCurrentId}/>
    )
}

export default Main