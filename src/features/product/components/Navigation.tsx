import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material"
import { Reviews, AddComment, ReadMore, PermMedia,Build } from "@mui/icons-material"

type Props = {
    value:number,
    onChange: (value:number) => void,
}

const Navigation = ({value,onChange}:Props) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(newValue);
    };

    return (
        <Box display='flex' justifyContent='center'>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<Reviews />} label="Reviews" />
                <Tab icon={<AddComment />} label="Add Comment" />
                <Tab icon={<ReadMore />} label="Read More" />
                <Tab icon={<PermMedia />} label="Media" />
                <Tab icon={<Build />} label="Params" />
            </Tabs>
        </Box>
    )
}

export default Navigation