import React from "react"
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Box, Divider, IconButton, Paper } from "@mui/material";
import { ClearRounded } from "@mui/icons-material";
import imgPath from "../../../assets/images/delete-item-from-favourite.png"

type Props = {
    onClose: (value: 'no' | 'yes' | 'no-ask' | 'nothing') => void
    open: boolean
}

const FavouriteDialog: React.FC<Props> = ({ onClose, open }) => {

    return (
        <Dialog open={open} onClose={() => onClose('nothing')}>
            <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <IconButton onClick={() => onClose('no')}>
                        <ClearRounded />
                    </IconButton>
                </Box>
                <DialogTitle>Are you sure to remove this item from favourite</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component='img'
                        src={imgPath}
                        alt="img-delete-item-from-basket"
                        sx={{
                            width: '300px',
                            height: 'auto'
                        }} />
                </DialogContent>
                <Divider variant="middle" sx={{ mt: 3, mb: 2 }} />

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => onClose('yes')}>
                        Yes
                    </Button>
                    <Button variant='contained' onClick={() => onClose('no')}>
                        No
                    </Button>
                    <Button variant='contained' onClick={() => onClose('no-ask')}>
                        Dont ask me again
                    </Button>
                </DialogActions>
            </Paper>
        </Dialog>
    )
}

export default FavouriteDialog