import { useLocation, useSearchParams } from "react-router-dom";
import { Box, Typography, Avatar, Paper, TextField } from "@mui/material"
import { autoSaveFetch } from "../services/safe-fetch";
import type { SearchItem } from "../types/search-item"
import { DataLoaderFromPromise } from "../features/loading";
import { Link } from "react-router-dom";
import SearchForm from "../features/search/search-form/SearchForm";
import NoFoundErrorPage from "./NoFoundErrorPage";

const Page = ({ data }: { data: SearchItem[] }) => {

    return (
        <Box>
            {data.length > 0 ? data.map((item) =>
                <Box
                    component="li"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: 'solid 2px', borderColor: 'primary.main', height: '70px' }}
                >
                    <Avatar src={item.icon} alt={item.name} sx={{ width: 32, height: 32 }} />
                    <Box>
                        <Typography>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {item.type}
                        </Typography>
                    </Box>
                </Box>) :
                <NoFoundErrorPage/>}
        </Box>
    )
}

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('s')

    const res = autoSaveFetch<SearchItem[]>(`/search/find/${search}`, { method: 'GET' })

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '600px', mt: {xs:'0px',md:'50px'} }}>
                <Paper sx={{ width: {xs:'100%',md:'700px'}, px: '40px' }}>
                    <Typography align="center" variant="h3" sx={{fontWeight:'bold'}}>{search}</Typography>
                    {
                        search !== '' &&
                        <DataLoaderFromPromise res={res} page={Page} />
                    }
                </Paper>
            </Box>
        </Box>
    )
}

export default SearchPage