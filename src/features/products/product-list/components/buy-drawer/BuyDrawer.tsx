import React, { useEffect, useState } from "react"
import { Box, Drawer, CircularProgress, Typography, Button, Grid, Paper, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { useRequest } from "../../../../../hooks/useRequest";
import { Product } from "../../../../../types/product";
import CountBlock from '../../../../basket/UI/CountBlock';
import { useAuthUserStore } from "../../../../../store/useAuth";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string | null;
    onClose: () => void;
}

type Props2 = { loading: boolean, src?: string, width: any, height: any }

const MyImage: React.FC<Props2> = ({ loading, src, width, height }) => {

    if (loading)
        return (
            <Box
                sx={{
                    width: width,
                    height: height,
                }}>
                <CircularProgress />
            </Box>
        )

    return (
        <Box
            component='img'
            src={src}
            sx={{
                width,
                height
            }} />
    )
}

const BuyDrawer: React.FC<Props> = ({ id, onClose }) => {

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.only('xs'))

    const store = useAuthUserStore()

    const navigate = useNavigate()

    const [loaded, data, error] = useRequest<Product>(`/products/${id}`, { method: 'GET' })

    const [count, setCount] = useState(store.user.basketInfo.find((item) => item.id === id)?.count || 1)

    useEffect(() => {
        const value = store.user.basketInfo.find((item) => item.id === id)?.count || 1
        setCount(value)
    }, [id])

    const countHandler = (value: number) => {
        setCount(value)
    }

    const continueShoppingHandler = () => {
        if (id)
            store.createOrChangeBasketItem({ id: id, count: count })
        onClose()
    }

    const deleteHandler = () => {
        if (id)
            store.createOrChangeBasketItem({ id: id, count: 0 })
        onClose()
    }

    const addAndContinueToBasketHandler = () => {
        if (id) {
            store.createOrChangeBasketItem({ id: id, count: count })
            onClose()
            navigate('/me/basket')
        }
    }

    return (
        <Drawer
            role="presentation"
            anchor="bottom"
            open={id ? true : false}
            onClose={onClose}
            sx={{ height: '350px' }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                height: { xs: '250px', sm: '350px' }
            }}>
                <Grid container spacing={2} sx={{ width: { xs: '100%', sm: '600px', md: '900px', lg: '1000px' }, mt: 2 }}>
                    <Grid size={{ xs: 'auto', sm: 'auto', md: 'auto', lg: 6 }}>
                        <Paper sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height:{xs:'210px',sm:'auto'}
                        }}>
                            <MyImage
                                loading={!loaded}
                                src={data?.imgs[0].url}
                                width={{ xs: '150px', sm: '300px', md: '300px', lg: '300px' }}
                                height={{ xs: 'auto', }}
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 'grow', sm: 'grow', md: 'grow', lg: 6 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: { xs: '150px', sm: '300px' }
                        }}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                gap: 3,
                            }}>
                                <Typography color='text.primary'
                                    sx={{ 
                                        width:{xs:'100%',sm:'auto'},
                                        fontSize: { xs: 'smaller', sm: 'small', md: 'medium', lg: 'medium' } }}>
                                    NAME: <Box component='span' color='text.secondary'>{data?.name}</Box>
                                </Typography>
                                {
                                    !isMobile &&
                                    <Typography color="text.primary"
                                        sx={{ fontSize: { xs: 'smaller', sm: 'small', md: 'medium', lg: 'medium' } }}
                                        >
                                        DISCRIPTION: <Box color='text.secondary' component='span'>{data?.discription}</Box>
                                    </Typography>
                                }
                            </Paper>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    gap: '30px',
                                    flexDirection: 'column',
                                    mt: 2,
                                    p: 2,
                                }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                    <CountBlock count={count} onChange={countHandler} />
                                    <IconButton onClick={deleteHandler}>
                                        <Delete />
                                    </IconButton>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    gap: 3
                                }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={continueShoppingHandler}
                                        sx={{
                                            width: '100%',
                                        }}>
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={addAndContinueToBasketHandler}
                                        sx={{
                                            width: '100%'
                                        }}>
                                       { isMobile ? 'BUY' : 'Buy Now'}
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    )
}

export default BuyDrawer