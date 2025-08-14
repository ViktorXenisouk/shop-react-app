import React from "react"
import { Button } from "@mui/material"
import RobotWithMessage from "../../../../../../assets/interactive-svg/RobotWithMessage"

type Props = {
    onClick: () => void
}

const SearchCategoryButton: React.FC<Props> = ({ onClick }) => {

    return (
        <Button
            variant='contained'
            onClick={onClick}
            sx={{
                display:'flex',
                justifyContent:'center',
                flexDirection:{xs:'row',sm:'column'},
                width: '100%',
                height: '200px',
                p: 4
            }}>
            <RobotWithMessage message="item"/>
            Search Category
        </Button>
    )
}

export default SearchCategoryButton