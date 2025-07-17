import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

type Props = {
    onClose: (value: 'no' | 'yes' | 'no-ask' | 'nothing') => void
    open: boolean
}

const FavouriteDialog = ({ onClose, open }: Props) => {

    return (
        <Dialog open={open} onClose={() => onClose('nothing')}>
            <DialogTitle>Are you sure to remove this item from favourite</DialogTitle>
            <DialogActions>
                <Button onClick={() => onClose('yes')}>
                    Yes
                </Button>
                <Button onClick={() => onClose('no')}>
                    No
                </Button>
                <Button onClick={() => onClose('no-ask')}>
                    Dont ask me again
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FavouriteDialog