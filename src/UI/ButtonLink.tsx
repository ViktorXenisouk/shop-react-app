import { Link } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

interface MyLinkProps extends ButtonProps{
  to: string;
}

const ButtonLink = ({ children, to, onClick, ...rest }: MyLinkProps) => {
  return (
    <Button
      component={Link}
      to={to}
      onClick={onClick}
      sx={{ textTransform: 'none', color: 'inherit' }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonLink