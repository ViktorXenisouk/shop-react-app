import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminCategoryCard from "../components/AdminPlayListCard";
import { ArrowBack, Add } from "@mui/icons-material"
import { Box, Stack, Button } from "@mui/material"
import { PlayList } from '../../../../../types/play-list';
import CategoryParser from '../components/CategoryParser';

const Loader: React.FC<{ data: PlayList[] }> = ({ data }) => {

    const [params, setParams] = useSearchParams()
    const parentPath = params.get('parentPath');

    const selectHandler = (path: string) => {
        params.set('parentPath', path)
        setParams(params)
    }

    const getIfInLastElement = () => {
        if (parentPath) {
            const parts = parentPath.split('/')

            if (parts && parts.length > 0 && parts[0] != '#root') {
                return false
            }
            else {
                return true
            }
        }
        return true
    }

    const backHandler = () => {
        if (parentPath) {
            const parts = parentPath.split('/')

            if (parts && parts.length > 0 && parts[0] != '#root') {
                parts.pop()
                if (parts.length == 0) {
                    params.set('parentPath', '#root')
                    setParams(params)
                    return
                }
                params.set('parentPath', parts.join('/'))
                setParams(params)
            }
            else {
                alert('you are on first segment')
            }
        }
    }

    return (
        <Box>
            <CategoryParser category={parentPath || ''} />
            <Button disabled={getIfInLastElement()} startIcon={<ArrowBack />} onClick={backHandler}>Back</Button>
            <Stack direction='column'>
                {data.map((body) => <AdminCategoryCard body={body} onSelect={selectHandler} />)}
            </Stack>
        </Box>
    )
}

export default Loader