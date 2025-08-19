import React from "react"
import { Button } from "@mui/material"
import { Search } from "@mui/icons-material"

type Props = {
    onClick: () => void
}

const SearchCategoryButton: React.FC<Props> = ({ onClick }) => {

    return (
        <Button
            variant='contained'
            onClick={onClick}
            endIcon={<Search/>}
            sx={{
                width: '100%',
                p: 4
            }}>
            Search Category
        </Button>
    )
}

export default SearchCategoryButton