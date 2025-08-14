import React, { Fragment } from "react";
import CountBlock from "./CountBlock";
import { Button, Paper, styled } from "@mui/material"
import { ShoppingBasket, ShoppingBasketOutlined } from "@mui/icons-material"

const StyledPaper = styled(Paper)(({ theme }) => ({
    border: 'rgba(0, 113, 227, 0.5) solid 1px'
}))

type Props = {
    count: number,
    setCount?: React.Dispatch<React.SetStateAction<number>>,
    onChange?: (count: number) => void,
    simple?: boolean,
    color?:"primary" | "secondary" | "success" | "error" | "info" | "warning"
}

const BasketCountButton: React.FC<Props> = ({ count, setCount, onChange, simple,color='primary' }) => {

    const bucketHandler = () => {
        if (count <= 0) {
            onChange?.(1)
        }
        else if (simple) {
            onChange?.(0)
        }
    }

    const changeHandler = (count: number) => {
        onChange?.(count)
    }

    return (
        <Fragment>
            {
                !count || count <= 0 ?
                    <Button
                        variant="outlined"
                        endIcon={<ShoppingBasketOutlined />}
                        onClick={bucketHandler}
                        color={color}
                        sx={{
                            width: '100%',
                            m: '0px!important'
                        }}>
                        add to
                    </Button>
                    :
                    simple ?
                        <Button
                            variant="outlined"
                            endIcon={<ShoppingBasket />}
                            onClick={bucketHandler}
                            color={color}
                            sx={{
                                width: '100%',
                                m: '0px!important'
                            }}>
                            added
                        </Button>
                        :
                        <StyledPaper
                        color={color}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                borderWidth:'1px',
                                borderStyle:'1px',
                                borderColor:color,
                                py: '1px'
                            }}>
                            <CountBlock onChange={changeHandler} count={count} setCount={setCount} />
                        </StyledPaper>
            }
        </Fragment>
    )
}

export default BasketCountButton