import { create } from "zustand"
import Cookie from "../utils/cookie";
import { safeFetch } from "../services/safeFetch";

type AuthUserState = {
    token: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean, token?: string, message?: string }>;
    logout: () => void;
};

const useAuthUserStore = create<AuthUserState>((set) => ({
    token: null,
    login: async (email: string, password: string) =>{
        const result = await login(email, password);
        if(result.token){
            set({token:result.token})
        }
        return result;
    },
    logout: () =>
        set({ token: null }),
}));


const login = async (email: string, password: string): Promise<{ success: boolean, token?: string, message?: string }> => {
    if (!email || !password) return { success: false, message: 'no name or password' }

    const body = {
        email: email,
        password: password,
    }


    const options = {
        body: JSON.stringify(body), method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    } as RequestInit

    try{
        const response = await safeFetch<{token:string}>('/auth/login',options)

        if (response.success && response.data) {
            const token = response.data.token;
    
            if (token) {
                Cookie.set('user_token', token)
                return {
                    token: token,
                    success: true,
                    message: response?.message || ''
                }
            }
            else {
                return {
                    success: false,
                    message: 'can not find your token'
                }
            }
        }
        else {
            return {
                success: false,
                message: response?.message || 'bad response'
            }
        }
    }
    catch{
        return {
            success: false,
            message: 'global error'
        }
    }
}

export { useAuthUserStore }