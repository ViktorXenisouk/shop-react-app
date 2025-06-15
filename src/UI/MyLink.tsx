import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { SxProps,Theme } from '@mui/material';
import { ReactNode } from 'react';
import {styled} from '@mui/material';

// Используем styled MuiLink и указываем component=RouterLink
const MyLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== 'to',
})<MuiLinkProps & { to: string }>({
  // Тут можно задать стили по умолчанию
  fontWeight: 'bold',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function StyledMyLink(props: MuiLinkProps & { to: string }) {
  return <MyLink {...props} component={RouterLink} />;
}