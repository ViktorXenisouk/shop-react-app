import { srcset } from "../../../utils/src-set";
import { ImageList,ImageListItem } from "@mui/material";

const MyImageList = () => {

    return (
 <ImageList
            variant="quilted"
            cols={2}
            rowHeight={300}>
            <ImageListItem rows={1} cols={2}>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 2)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 1)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 1)} />
            </ImageListItem>
        </ImageList>
    )
}
    
export default MyImageList