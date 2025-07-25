import { Box } from "@mui/material"

const Image = ({imgURL,width,height}:{imgURL:string,width?:number|string,height?:number|string}) => {

    return (
        <Box
        sx={{
            height: height,
            width:width,
            backgroundImage: `url(${imgURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 1,
          }}
        >

        </Box>
    )
}

export default Image