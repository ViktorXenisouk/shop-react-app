import { styled, Typography } from "@mui/material";

const HeaderText = styled(Typography)(({ theme }) => ({
    variant: 'h2',
    textAlign: 'center',
    textDecoration: 'underline',
    color: theme.palette.text.primary,
    fontSize: '30px',
    marginTop: '40px',
    marginBottom: '30px',
}))

export default HeaderText