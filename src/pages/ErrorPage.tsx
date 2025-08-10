import imgSrc from "../assets/images/robot-error-404.png"
import { Box,Typography,Paper } from "@mui/material";
import RobotWithMessage from "../assets/interactive-svg/RobotWithMessage"
import NoFoundErrorPage from "./NoFoundErrorPage";

type ErrorPageProps = {
    status:number;
    message:string;
}

const ErrorPage = ({status,message}:ErrorPageProps) => {

    if(status === 404){
        return <NoFoundErrorPage/>
    }

    let index = 0

    if(status >= 300 && status < 400){
index = 0
    }
    if(status >= 400 && status < 500){
        index = 1
    }
    if(status >= 500){
        index = 2
    }

    const text = ['Some error due to Redirections','It is a Client Error, plese check if your Input is Correct','Server Error, We are very sorry and we are working about it']
    [index]

    return (
        <Paper variant="outlined" sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',pt:'10px',width:'600px',mx:'auto',mt:'30px',p:'30px'}}>
              <Typography variant="h2">
                Error Page : {status}
            </Typography>

            <RobotWithMessage message={status.toString()}/>

              <Typography variant="h3">
                {text}
            </Typography>

            <Typography sx={{mt:'50px'}} variant="h3">message: {message}</Typography>
        </Paper>
    )
}

export default ErrorPage