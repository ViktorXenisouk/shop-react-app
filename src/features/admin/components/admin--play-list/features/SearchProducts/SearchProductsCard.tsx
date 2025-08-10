import { Product } from "../../../../../../types/product"
import { Box, Typography, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { autoSaveFetch } from "../../../../../../services/safe-fetch"

const SearchProductsCard: React.FC<(Product | { id: string }) & { onClick?: (id: string) => void, isSelected?: boolean }> = ({ isSelected, onClick, ...productData }) => {
    const [product, setProduct] = useState<Product | null>(typeof productData == 'object' && !('id' in productData) ? productData as Product : null)

    const fetchProduct = async (id: string) => {
        const res = await autoSaveFetch<Product>(`/products/${id}`, { method: 'GET' })

        if (res.success && res.data) {
            setProduct(res.data as Product)
        }
        else {
            setProduct(null)
        }
    }

    useEffect(() => {
        if ('id' in productData) {
            fetchProduct(productData.id)
        }
    }, [])

    const clickHandler = () => {
        const id = 'id' in productData ? productData.id : productData._id
        console.log('onCLick')
        if (onClick)
            onClick(id)

    }

    console.log(product)

    return (
        <Box component='div' sx={{ borderTop: '#ccc solid 1px', boxShadow: isSelected ? 5 : undefined, }} onClick={clickHandler}>
            <Grid container>
                <Grid size={{ xs: 6 }}>
                    <Typography sx={{ display: 'block', mt: 1, fontWeight: 'bold', color: 'GrayText', textDecoration: 'underline', minHeight: '3em', textAlign: 'center' }}>
                        id:{product?._id}
                    </Typography >
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography sx={{ display: 'block', mt: 1, fontWeight: 'bold', color: 'GrayText', textDecoration: 'underline', minHeight: '3em', textAlign: 'center' }}>
                        {product?.name}
                    </Typography >
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box
                        component="img"
                        alt={product?.imgs[0]?.name ?? ''}
                        height="170px"
                        width='auto'
                        src={product?.imgs[0]?.url}
                    />
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography sx={{ mt: 1, color: 'GrayText', maxHeight: '10em', maxWidth: '400px', mx: '20px' }}>
                        {product?.discription.slice(0, 100).length === product?.discription.length ? product?.discription : product?.discription.slice(0, 100) + '....'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchProductsCard