import { create } from "zustand"
import { BasketInfo } from "../features/basket/types";
import { autoSaveFetch } from "../services/safeFetch";

interface UserState {
    basket:BasketInfo[]|null;
    favourite:string[]|null;
    setBasket:(basket:BasketInfo[],token:string) => void;
    setFavourite:(favourites:string[],token:string) => void;
}

const useUserStore = create<UserState>((set) => ({
   basket:null,
   favourite:null,
   setBasket: async (basket:BasketInfo[],token:string) => {
        const result = await autoSaveFetch('/users/basket',{method:'POST',body:basket,token:token})
   },
   setFavourite : async (favourites:string[],token:string) => {
        const result = await autoSaveFetch('/users/favourite',{method:'POST',body:favourites,token:token})
   },
}));

export { useUserStore }