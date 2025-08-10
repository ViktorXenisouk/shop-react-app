import { srcset } from "../../../utils/src-set";
import { ImageList,ImageListItem } from "@mui/material";

const MyImageList = () => {

    return (
 <ImageList
            variant="quilted"
            cols={2}
            rowHeight='auto'
            sx={{mx:'auto',width:{xs:'100%',sm:'500px',md:'600px',lg:'500px'}}}
            >
            <ImageListItem rows={1} cols={2}>
                <img {...srcset("https://res.cloudinary.com/djdxksokm/image/upload/v1753537558/my-pet-project/hcphvusk6w8ybrg7flo3.png", 150, 1, 2)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png", 150, 1, 1)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png", 150, 1, 1)} />
            </ImageListItem>
        </ImageList>
    )
}
    
export default MyImageList