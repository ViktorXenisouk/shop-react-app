import React from "react"
import { Button } from "@mui/material"

type Props = {
    onClick: () => void,
    disabled: boolean,
    left?: string,
    right?: string,
    icon: React.ReactNode,
}

const BillboardButton: React.FC<Props> = (
    { onClick, left, right, icon }) => {

    return (
        <Button
            startIcon
            onClick={onClick}
            sx={{
                minHeight: '50px',
                minWidth: '50px',
                height: '50px',
                width: '50px',
                zIndex: 1,
                borderColor: 'divider',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderRadius:10,
                color: 'text.secondary',
                bgcolor: theme => theme.palette.background.paper,
                p: '3px',
                m: '3px',

                ':hover': {
                    color: 'primary.main',
                    backgroundColor: theme => theme.palette.action.hover
                },
            }}
        >
            {icon}
        </Button>
    )
}

export default BillboardButton