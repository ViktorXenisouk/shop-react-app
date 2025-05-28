import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const SelectedButton = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
    padding: theme.spacing(1),
    border: '1px solid',
    borderColor: isActive ? theme.palette.primary.dark : 'transparent',
    backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
    color: isActive ? '#fff' : '#000',
    cursor: 'pointer',
}));

export default SelectedButton