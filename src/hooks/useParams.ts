import { useNavigate, useLocation } from "react-router-dom"

const useMyParams = (baseUrl: string) => {
    const navigate = useNavigate()
    const location = useLocation()

    const get = (name:string) => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get(name)
    }

    const set = (name: string, value: string) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(name, value);
        navigate(`${location.pathname}/?${queryParams.toString()}`);
    }

    return {get,set}
}

export {useMyParams}