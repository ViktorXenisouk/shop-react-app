import { Box,Typography,Button,Paper } from "@mui/material"
import { Link } from "react-router-dom"
import img from "../assets/images/robot-error-404.png"

const NoFoundErrorPage = () => {

    return (
        <Paper variant="outlined" sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',pt:'10px',width:'600px',mx:'auto',mt:'30px',p:'30px'}}>
             <Typography variant="h2">
                Error Page
            </Typography>

            <Box component='img' src={img} sx={{width:'500px',height:'auto'}}/>

            <Typography variant="h3">
                Sorry We can not find this Page Plese go back or go to main Page
            </Typography>

            <Button component={Link} to='/' variant="contained" sx={{mt:'40px'}}>RETURN TO MAIN PAGE</Button>
        </Paper>
    )
}

export default NoFoundErrorPage