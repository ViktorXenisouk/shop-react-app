import type { BasketItem } from "./basket"

type User = {
    _id:string
    username:string,
    email:string,
    basketInfo:BasketItem[],
    favourite:string[],
    isBlocked?:boolean
}

export type {User}