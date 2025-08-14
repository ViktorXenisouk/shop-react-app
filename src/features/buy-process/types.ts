import { Address } from "../../types/adress"

type Body = {
    username: string,
    email: string,
    tel: string,
    adress: Address,
    card: string,
    randomInfo: string,
}

type PropsCnd = {
    index: number,
    body: Body,
    setBody: (updates: Partial<Body>) => void,
    setCompleted: (index: number, value: boolean) => void,
    isCompleted: boolean
}

export type {Body, PropsCnd}