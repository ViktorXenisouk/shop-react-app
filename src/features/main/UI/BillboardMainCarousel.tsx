import BillboardCarousel from "../../../components/billboard-carousel/BillboardCarousel"
import { Box } from "@mui/material"

const BillboardMainCarousel = () => {

    const items = [
        {
            title: 'Новинки недели',
            imgUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753537558/my-pet-project/hcphvusk6w8ybrg7flo3.png?w=300&h=150&fit=crop&auto=format',
            url: '/new',
        },
        {
            title: 'Лучшие предложения',
            imgUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753537558/my-pet-project/hcphvusk6w8ybrg7flo3.png?w=300&h=150&fit=crop&auto=format',
            url: '/sale',
        },
        {
            title: 'Категории',
            imgUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753537558/my-pet-project/hcphvusk6w8ybrg7flo3.png?w=300&h=150&fit=crop&auto=format',
            url: '/categories',
        },
    ]

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center',width:'100%' }}>
            <BillboardCarousel
                interval={5000}
                items={items}
                width={{xs:'100%',sm:'500px',md:'600px',lg:'800px'}}
                height={{xs:'50vh',sm:'400px',md:'500px',lg:'600px'}}
            />
        </Box>
    )
}

export default BillboardMainCarousel