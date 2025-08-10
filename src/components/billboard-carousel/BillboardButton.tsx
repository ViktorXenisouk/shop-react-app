import { Button } from "@mui/material"
import React from "react"

type Props = {
    onClick: () => void,
    disabled: boolean,
    left?: string,
    right?: string,
    icon: React.ReactNode,
}

const BillboardButton : React.FC<Props> = (
    { onClick, left, right, icon }) => {

    return (
        <Button
            startIcon
            onClick={onClick}
            sx={{
                minHeight:'50px',
                minWidth:'50px',
                height: '50px',
                width: '50px',
                zIndex: 1,
                borderColor:'divider',
                borderStyle:'solid',
                borderWidth:'1px',
                color: 'text.secondary',
                bgcolor: 'secondary.main',
                p:'3px',
                m:'3px',

                ':hover': {
                                    color: 'primary.main',
                    borderColor:'none',
                    backgroundColor: 'grey.200'
                },
            }}
        >
            {icon}
        </Button>
    )
}

export default BillboardButton