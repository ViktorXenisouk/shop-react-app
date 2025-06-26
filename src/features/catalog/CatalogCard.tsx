import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  catalogIndex: number;
  setCurrentId: (id: number) => void;
};

const CatalogCard = ({ children, isActive, catalogIndex, setCurrentId }: Props) => {
  return (
    <Typography
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