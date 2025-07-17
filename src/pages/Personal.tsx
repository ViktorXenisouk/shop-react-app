import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import Favourite from "../features/personal/Favourite";
import Basket from "../features/personal/Basket";
import Me from "../features/personal/Me";
import PersonalNavigation from "../features/personal/PersonalNavigation";


const Personal = () => {
    const params = useParams()
    const page = params.page

    const getPage = () => {
        switch (page) {
            case 'me':
                return <Me/>
            case 'basket':
                return <Basket />
            case 'favourite':
                return <Favourite />
        }
    }

    return (
        <Box >
           <PersonalNavigation/>
            <Box>
                {getPage()}
            </Box>
        </Box>
    )
}

export default Personal