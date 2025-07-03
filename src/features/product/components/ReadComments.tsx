import CommentCard from "./CommentCard"
import { useMemo, useState } from "react";
import { Box, Button, Grid, Modal, Stack, Select, MenuItem, Paper } from '@mui/material';
import CarouselWithButtons from "../../carouselWithButtons/CarouselWithButtons";
import ItemForCarousel from "../../carouselWithButtons/ItemForCarousel";

const comment = {
    author: 'vasa adjnfc',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi hic autem quae distinctio ipsa dolorem laborum, molestiae incidunt vel repellendus dicta laudantium. Cumque, eveniet deserunt qui alias quia distinctio eos.'
}

const commments = Array.from({ length: 30 }, (_, i) => { return { ...comment, rate: i % 10 } })

type Props = {
    open: boolean,
    onClose: () => void
}

const ReadCommentsModal = ({ open, onClose }: Props) => {

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
            <Box sx={{ overflowY: 'scroll', width: '600px' }}>
                <Paper>
                    <Select value={sort} onChange={handleChange}>
                        <MenuItem value={'0'}>Worsest</MenuItem>
                        <MenuItem value={'1'}>Best</MenuItem>
                    </Select>
                </Paper>
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
                    {c.map((v) => <Grid size={{ xs: 3 }}><CommentCard {...v} /></Grid>)}
                </Grid>
                <Button onClick={() => setOpen(true)}>See All of {commments.length} comments</Button>
            </Box>
            <ReadCommentsModal open={open} onClose={closeHandler} />
        </>
    )
}

export default ReadComments