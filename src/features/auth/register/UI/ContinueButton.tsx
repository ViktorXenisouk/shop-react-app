import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const ContinueButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'completed',
})

<{ completed: boolean }>

(({ theme, completed }) => ({
    padding: theme.spacing(1),
    border: '1px solid',
    borderColor: completed ? theme.palette.primary.light : theme.palette.divider ,
    backgroundColor: completed ? theme.palette.primary.main : 'transparent',
    color: completed ? '#fff' : '#000',
    cursor: 'pointer',
}));

export default ContinueButton