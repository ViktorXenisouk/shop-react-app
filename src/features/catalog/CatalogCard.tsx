import { Button } from '@mui/material';

const CatalogCard = ({ children, isActive, catalogIndex, setCurrentId } : any) => {
    return (
        <Button
            onMouseOver={() => setCurrentId(catalogIndex)}
            variant={isActive ? 'contained' : 'text'}
            sx={{ justifyContent: 'flex-start', width: '100%', textTransform: 'none' }}
        >
            {children}
        </Button>
    );
};

export default CatalogCard;