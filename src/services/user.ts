import Cookie from "../utils/cookie"

const url = process.env.REACT_APP_API_URL as string

const login = async (email: string, password: string) : Promise<{success:boolean,message?:string}> => {
    if (!email || !password) return { success:false, message: 'no name or password' }

    if (!url) return { success:false, message: 'no server' }

    const body = {
        email: email,
        password: password,
    }


    const options = { body: JSON.stringify(body),method:'POST',headers: {
        'Content-Type': 'application/json' }} as RequestInit

    const response = await fetch(`${url}/auth/login`, options)

    if(response.ok){
        const json = await response.json()
        const token = json.token;

        if(token){
            Cookie.set('user_token',token)
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

const register = async (payload :{username: string,email:string ,password: string}): Promise<{success:boolean,message?:string}> => {
    if (!payload.username || !payload.password || !payload.email) return { success:false, message: 'no name or password' }

    if (!url) return { success:false, message: 'no server' }

    const options = { body: JSON.stringify(payload),
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
      } } as RequestInit

    const response = await fetch(`${url}/auth/register`, options)

    if(response.ok){
        const json = await response.json()
        console.log(json)
        const token = json.token;

        if(token){
            Cookie.set('user_token',token)
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

export {login,register}