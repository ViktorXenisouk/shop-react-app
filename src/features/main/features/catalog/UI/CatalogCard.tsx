import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  catalogIndex: number;
  setCurrentId: (id: number) => void;
  fullPath: string;
};

const CatalogCard = ({ children, isActive, catalogIndex, setCurrentId,fullPath }: Props) => {
  return (
    <Typography
    component={Link}
    to={`/products/${fullPath}`}
      onMouseOver={() => setCurrentId(catalogIndex)}
      sx={{
        pt:1,
        pb:1,
        cursor: 'pointer',
        color: isActive ? 'text.primary' : 'text.secondary',
        backgroundColor: isActive ? grey[300] : grey[50],
        textDecoration: isActive ? 'underline' : 'underline',
        textUnderlineOffset: '4px',
        transition: 'color 0.2s, text-decoration 0.2s'
      }}
    >
      {children}
    </Typography>
  );
};

export default CatalogCard;