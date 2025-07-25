import Carousel from "../../../UI/Carousel";
import { Box } from "@mui/material";
import Image from "../../../UI/Image";

const Item = ({color}:{color:string}) => {

    return (
        <Box sx={{width:'100%', height:'400px', backgroundColor:color}}>
            

        </Box>
    )
}

const MyCarousel = () => {


    return (
        <Carousel loop>
            <Item color="yellow"/>
            <Item color="blue"/>
            <Item color="green"/>
            <Item color="grey"/>
            <Item color="black"/>
        </Carousel>
    )
}

export default MyCarousel