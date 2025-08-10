import { Box } from "@mui/material"
import React from "react"

type Props = {
    icon: React.ReactNode,
    title: string,
    end?: boolean,
    other?:any
}

const MyLabel: React.FC<Props> = ({ icon, title, end,other }) => {

    return (
        <Box {...other} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!end && icon}
            {title}
            {end && icon}
        </Box>)
}

export default MyLabel