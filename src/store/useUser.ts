import { create } from "zustand"
import * as Cookie from "../utils/cookie";
import { BasketInfo } from "../features/basket/types";
import { safeFetch } from "../services/safeFetch";

interface UserState {
    basket:BasketInfo[]|null;
    favourite:string[]|null;
    setBasket:(basket:BasketInfo[]) => void;
    setFavourite:(favourites:string[]) => void;
}

const useUser = create<UserState>((set) => ({
   basket:null,
   favourite:null,
   setBasket: setBasket,
   setFavourite,
}));

const setBasket = (basket:BasketInfo[]) => {
    const requestInit : RequestInit = {}

    
    const result = safeFetch('/user/basket',requestInit)

}

const setFavourite = () => {
    
}