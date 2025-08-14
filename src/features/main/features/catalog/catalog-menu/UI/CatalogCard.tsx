import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  catalogIndex: number;
  setCurrentId: (id: number) => void;
  fullPath: string;
  isPlaylist?: boolean
};

const CatalogCard: React.FC<Props> = ({ children, isActive, catalogIndex, setCurrentId, fullPath, isPlaylist }) => {
  return (
    <Typography
      component={Link}
      to={`/${isPlaylist ? 'play-list' : 'products'}/${fullPath}`}
      onMouseOver={() => setCurrentId(catalogIndex)}
      sx={{
        pl:3,
        py: 1,
        cursor: 'pointer',
        color: theme => isActive ? theme.palette.getContrastText(theme.palette.action.selected) : theme.palette.getContrastText(theme.palette.background.paper),
        backgroundColor: theme => isActive ? theme.palette.action.selected : theme.palette.background.paper,
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