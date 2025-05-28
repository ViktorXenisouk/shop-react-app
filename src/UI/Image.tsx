import { Box } from "@mui/material"

const Image = ({imgURL,weight,height}:{imgURL:string,weight:number|string|null,height:number|string|null}) => {

    return (
        <Box
        sx={{
            height: weight,
            weight:height,
            backgroundImage: imgURL,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 1,
          }}
        >

        </Box>
    )
}

export default Image