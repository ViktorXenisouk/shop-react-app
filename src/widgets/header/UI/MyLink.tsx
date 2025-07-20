import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

interface MyLinkProps{
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
}

const MyLink = ({ children, to, onClick, ...rest }: MyLinkProps) => {
  return (
    <Button
      component={RouterLink}
      to={to}
      onClick={onClick}
      sx={{ textTransform: 'none', color: 'inherit' }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MyLink;