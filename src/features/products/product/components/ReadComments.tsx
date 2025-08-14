import CommentCard from "./CommentCard"
import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Modal, Stack, Select, MenuItem, Paper, IconButton } from '@mui/material';
import { Remove } from "@mui/icons-material"

const comment = {
    author: 'vasa adjnfc',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi hic autem quae distinctio ipsa dolorem laborum, molestiae incidunt vel repellendus dicta laudantium. Cumque, eveniet deserunt qui alias quia distinctio eos.'
}

const commments = Array.from({ length: 30 }, (_, i) => { return { ...comment, rate: i % 10 } })

type Props = {
    open: boolean,
    onClose: () => void
}

const ReadCommentsModal : React.FC<Props> = ({ open, onClose }) => {

    const [sort, setSort] = useState('0')

    const handleChange = (event: any) => {
        setSort(event.target.value as string);
    };

    const com = useMemo(() => {
        console.log(sort)
        if (sort === '0') {
            return commments.sort((a, b) => a.rate - b.rate)
        }
        else {
            return commments.sort((a, b) => b.rate - a.rate)
        }

    }, [sort])

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: 'background.default', overflowY: 'scroll', width: '600px', px: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',alignContent:'center' }}>
                    <Select sx={{ backgroundColor: 'background.paper' }} variant="outlined" value={sort} onChange={handleChange}>
                        <MenuItem value={'0'}>Worsest</MenuItem>
                        <MenuItem value={'1'}>Best</MenuItem>
                    </Select>
                    <IconButton sx={{width:'60px',height:'60px'}} onClick={onClose}>
                        <Remove />
                    </IconButton>
                </Box>
                <Stack>
                    {com.map((v) => <CommentCard {...v} />)}
                </Stack>
            </Box>
        </Modal>
    )
}



const ReadComments = () => {
    const [open, setOpen] = useState(false)

    const closeHandler = () => setOpen(false)

    const c = commments.slice(0, 8)

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={4}>
                    {c.map((v) => <Grid size={{ xs: 12, md: 4, lg: 3 }}><CommentCard {...v} /></Grid>)}
                </Grid>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                <Button sx={{ mt: '40px', textDecoration: 'underline' }} variant="text" onClick={() => setOpen(true)}>See All of {commments.length} comments</Button>
                </Box>
            </Box>
            <ReadCommentsModal open={open} onClose={closeHandler} />
        </>
    )
}

export default ReadComments