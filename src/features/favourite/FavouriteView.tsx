import { DataLoaderFromPromise } from "../loading/Loading"
import { FavouriteCard } from "./components/FavouriteCard"
import { getResponse } from "./api"

const MyFavourite = ({ data }: {data: string[]}) => {
    console.log(data)

    return (
        <div>
            {data && data.length > 0 ? data.map((item) => <FavouriteCard id={item} />) : 'is empty'}
        </div>
    )
}

const FavouriteView = () => {
    const response = getResponse()

    return (
        <DataLoaderFromPromise page={MyFavourite} res={response} />
    )
}

export default FavouriteView