import { styled, Paper } from "@mui/material";
import Link from "@mui/material";

const CategoryHeaderCard = styled(Paper)(({ theme }) => ({
    component: typeof Link,
    variant: "outlined",
    elevation: 24,
    minHeight: '40px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    ':hover': {
        border: 'grey.400 solid 1px'
    }
}))

export default CategoryHeaderCard