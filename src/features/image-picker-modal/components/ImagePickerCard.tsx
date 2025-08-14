import React from "react"
import { Box, Avatar, Typography } from "@mui/material"
import { ImageItem } from "../../../types/Image"

type Props = {
    isSelected: (url: string) => boolean;
    img: ImageItem;
    toggleSelect: (img: ImageItem) => void;
}

const ImagePickerCard: React.FC<Props> = ({ toggleSelect, isSelected, img }) => {

    return (
        <Box
            onClick={() => toggleSelect(img)}
            sx={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isSelected(img.url) ? 'blue' : 'gray',
                borderRadius: 2,
                p: 1,
                cursor: 'pointer',
            }}
        >
            <Avatar
                variant="rounded"
                src={img.url}
                alt={img.name}
                sx={{ width: '100%', height: 100, objectFit: 'cover' }}
            />
            <Typography variant="caption" noWrap>{img.name}</Typography>
        </Box>
    )
}

export default ImagePickerCard