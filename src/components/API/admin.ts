import dotenv from "dotenv"
import * as Cookie from "../utils/cookie"

const url = process.env.REACT_APP_API_URL as string

const getAdminInfo = async () => {
    
}

const loginAdmin = async (name: string, password: string) => {
     if (!name || !password) return { success:false, message: 'no name or password' }
    
        if (!url) return { success:false, message: 'no server' }
    
        const body = {
            name: name,
            password: password,
        }
    
    
        const options = { body: JSON.stringify(body),method:'POST',headers: {
            'Content-Type': 'application/json' }} as RequestInit
    
        const response = await fetch(`${url}/admin/login`, options)
    
        if(response.ok){
            const json = await response.json()
            const token = json.token;
    
            if(token){
                Cookie.set('admin_token',token)
                return {
                    success:true,
                }
            }
            else{
                return{
                    success:false,
                    message:'can not find your token'
                }
            }
        }
        else{
            return{
                success:false,
                message:''
            }
    
        }
}

export {loginAdmin}