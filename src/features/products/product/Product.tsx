import React from "react"
import { useParams } from "react-router-dom"
import { DataLoaderFromPromise } from "../../loading"
import { type Product } from "../../../types/product"
import { autoSaveFetch } from "../../../services/safe-fetch"
import ProductLoader from "./ProductLoader"

const ProductPage : React.FC = () => {
    const params = useParams()

    const id = params.id as string;

    const res = autoSaveFetch<Product>(`/products/${id}`, { method: 'GET' })

    return (
        <DataLoaderFromPromise page={ProductLoader} res={res} />
    )
}

export default ProductPage