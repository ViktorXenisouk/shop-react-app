import { srcset } from "../../../utils/src-set";
import { ImageList,ImageListItem } from "@mui/material";

const MyImageList = () => {

    return (
 <ImageList
            variant="quilted"
            cols={2}
            rowHeight={300}
            sx={{mx:'30px'}}
            >
            <ImageListItem rows={1} cols={2}>
                <img {...srcset("https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png", 150, 1, 2)} />
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