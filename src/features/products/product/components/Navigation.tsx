import { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material"
import { Reviews, AddComment, ReadMore, PermMedia,Build } from "@mui/icons-material"

type Props = {
    value:number,
    onChange: (value:number) => void,
}

const Navigation = ({value,onChange}:Props) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'))
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(newValue);
    };

    return (
        <Box display='flex' justifyContent='center' width='100%'>
            <Tabs variant={isSmall? "scrollable" : "fullWidth"} value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<Reviews />} label={isSmall ? undefined : "Reviews"} />
                <Tab icon={<AddComment />} label={isSmall ? undefined : "Write comment"} />
                <Tab icon={<ReadMore />} label={isSmall ? undefined : "Read more"} />
                <Tab icon={<PermMedia />} label={isSmall ? undefined : "Media"} />
                <Tab icon={<Build />} label={isSmall ? undefined : "Params"} />
            </Tabs>
        </Box>
    )
}

export default Navigation