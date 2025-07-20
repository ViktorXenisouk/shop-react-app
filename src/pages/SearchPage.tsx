import { useLocation } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material"
import { autoSaveFetch } from "../services/safe-fetch";
import type { SearchItem } from "../types/search-item"
import { DataLoaderFromPromise } from "../features/loading/Loading";
import { Link } from "react-router-dom";
import SearchForm from "../features/search/SearchForm";

const Page = ({ data }: { data: SearchItem[] }) => {

    return (
        <Box>
            {data.length>0 ? data.map((item) =>
                <Box
                    component={Link}
                    to={item.url}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <Avatar src={item.icon} alt={item.name} sx={{ width: 32, height: 32 }} />
                    <Box>
                        <Typography>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {item.type}
                        </Typography>
                    </Box>
                </Box>) : 
                <Typography>no find</Typography>}
        </Box>
    )
}

const SearchPage = () => {

    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);

    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/search\//, '')

    const res = autoSaveFetch<SearchItem[]>(`/search/find/${subPath}`, { method: 'GET' })

    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <SearchForm />
            </Box>
            <DataLoaderFromPromise res={res} page={Page} />
        </Box>
    )
}

export default SearchPage