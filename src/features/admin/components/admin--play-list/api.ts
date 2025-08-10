import { autoSaveFetch } from "../../../../services/safe-fetch"
import { sanitizePayload } from "../../../../utils/sanitizePayload"
import { Body } from "./types"

const createPlayList = async (token: string, payload: Body) => {
    const updatedPayload = sanitizePayload(payload)

    const res = await autoSaveFetch('/play-list/', { method: 'POST', token: token, body: updatedPayload })
    console.log(res)
}

const editPlayList = async (token: string, name: string, payload: Body) => {
    const updatedPayload = sanitizePayload(payload)

    const res = await autoSaveFetch(`/play-list/${name}`, { method: 'PATCH', token: token, body: updatedPayload })

    console.log(res)
}

export { createPlayList ,editPlayList}