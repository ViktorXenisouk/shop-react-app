import { useEffect, useState } from "react"
import { parseTag } from "../utils"

import { Box, Radio, Typography } from "@mui/material"


const FilterBlock = ({ children }: { children: string }) => {

    const [isEnable, setIsEnable] = useState(false)

    const onClick = () => {
        setIsEnable((previousValue) => !previousValue)
    }

    useEffect(() => {
        const onFilterRestart = () => {
            setIsEnable(false)
        }

        document.addEventListener('restart-filter', onFilterRestart)
        return () => document.removeEventListener('restart-filter', onFilterRestart)
    }, [])

    return (
            <Box component='div' onClick={onClick} display='flex' justifyContent='start' className='unselectable'>
                <Radio checked={isEnable} value={children}/>
                <Typography alignContent='center'>{parseTag(children)}</Typography>
            </Box>
    )
}

export default FilterBlock