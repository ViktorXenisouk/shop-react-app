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
<Box sx={{display:'flex', justifyContent:'center'}}>
 <BillboardCarousel
            interval={5000}
            items={items}
        />
</Box>
    )
}

export default BillboardMainCarousel