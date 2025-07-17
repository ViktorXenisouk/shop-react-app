import { Box, Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import CatalogMenu from '../CatalogMenu';
import CatalogDisplay from '../CatalogDisplay';
import { useTimer } from '../../../../../hooks/useTimer'; // кастомный хук

//example how to use component

const Catalog = () => {
    const [currentId, setCurrentId] = useState(-1);
    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false);

    const timer = useTimer(() => setCurrentId(-1), 3000);

    useEffect(() => {
        if (!isCatalogMouseOver) {
            timer('reset');
        } else {
            timer('disactive');
        }
    }, [isCatalogMouseOver]);

    return (
        <Box component='div' display="flex" position="relative" sx={{height:'100%'}}
        onMouseOver={() => setIsCatalogMouseOver(true)}
        onMouseOut={() => setIsCatalogMouseOver(false)}
        >
            <CatalogMenu
                currentId={currentId}
                onCurrentIndexUpdate={setCurrentId}
            />
            <CatalogDisplay currentId={currentId} />
        </Box>
    );
};

//export default Catalog;