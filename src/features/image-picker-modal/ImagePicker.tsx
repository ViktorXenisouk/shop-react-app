import ImagePickerModal from "./ImagePickerModal"
import { ImageItem } from "../../types/Image";
import { useState } from "react";
import { Button } from "@mui/material";
import {Image} from "@mui/icons-material"

type Props = {
  onSelect: (images: ImageItem[]) => void; // теперь массив
  folder: string
  deafultImages?: { name: string, url: string }[]
};

const ImagePicker = (props:Props) => {

    const [open,setOpen] = useState(false)

    const onClose = () => setOpen(false)

    return (
        <>
        <Button onClick={() => setOpen(true)} startIcon={<Image/>}>Select Imgs</Button>
        <ImagePickerModal open={open} onClose={onClose} deafultImages={props.deafultImages} folder={props.folder} onSelect={props.onSelect}/>
        </>
    )
}

export default ImagePicker