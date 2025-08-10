import { useSearchParams } from 'react-router-dom';
import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    ToggleButtonGroup,
    ToggleButton,
    Box,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type SortOption = 'price' | 'rating' | 'newest';
type SortOrder = 'asc' | 'desc';

type Props = {
    fullWidth?:boolean
}

const SortSwitcher : React.FC<Props> = ({fullWidth}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortOption = (searchParams.get('sort') as SortOption) || 'price';
    const sortOrder = (searchParams.get('order') as SortOrder) || 'asc';

    console.log(searchParams.get('sort'))

    const handleSortOptionChange = (event: any) => {
        const newSort = event.target.value as SortOption;
        searchParams.set('sort', newSort);
        setSearchParams(searchParams);
    };

    const handleSortOrderChange = (
        _: any,
        newOrder: SortOrder | null
    ) => {
        if (newOrder) {
            searchParams.set('order', newOrder);
            setSearchParams(searchParams);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,justifyContent: fullWidth ? 'space-between' : 'flex-start' }}>
            <FormControl sx={{width:'150px'}} size="small">
                <InputLabel sx={{minWidth:50}} id="sort-by-label">Sort By</InputLabel>
                <Select
                    labelId="sort-by-label"
                    value={sortOption}
                    onChange={handleSortOptionChange}
                    label="sort-by"
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Цене</MenuItem>
                    <MenuItem value="rating">Рейтингу</MenuItem>
                    <MenuItem value="createdAt">Новизне</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup
                value={sortOrder}
                exclusive
                onChange={handleSortOrderChange}
                size="small"
            >
                <ToggleButton value="asc" aria-label="по возрастанию">
                    <ArrowUpwardIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="desc" aria-label="по убыванию">
                    <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default SortSwitcher;