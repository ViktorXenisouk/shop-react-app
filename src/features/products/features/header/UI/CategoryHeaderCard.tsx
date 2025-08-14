import { styled, Paper } from "@mui/material";

const CategoryHeaderCard = styled(Paper)(({ theme }) => ({
    variant: "outlined",
    elevation: 24,
    minHeight: '40px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth:'1px',
    borderStyle:'solid',
    borderColor:theme.palette.divider,
    ':hover': {
            borderColor:theme.palette.action.selected,
    }
}))

//export default CategoryHeaderCard