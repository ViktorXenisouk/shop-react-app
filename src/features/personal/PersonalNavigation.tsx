import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { ShoppingBasketRounded, Person, Favorite } from "@mui/icons-material"

const PersonalNavigation : React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()

    const handleChange = (
        event: any,
        value: any,
    ) => {
        navigate(`/me/${value}`);
    };

    const page = params.page
    return (
        <BottomNavigation
            showLabels
            value={page}
            onChange={handleChange}
            aria-label="Platform"
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <BottomNavigationAction value='me' label="Me" icon={<Person />} />
            <BottomNavigationAction value='basket' label="Shoping" icon={<ShoppingBasketRounded />} />
            <BottomNavigationAction value='favourite' label="Favorites" icon={<Favorite />} />
        </BottomNavigation>
    )
}

export default PersonalNavigation