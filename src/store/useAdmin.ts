import { create } from "zustand"
import { persist } from 'zustand/middleware'
import Cookie from "../utils/cookie";
import { safeFetch } from "../services/safe-fetch";
import type { Admin } from "../types/admin";

type AdminAuthState = {
    admin: Admin | null
    token: string | null;
    setAdmin: (admin: Admin | null) => void,
    login: (email: string, password: string) => Promise<{ success: boolean, token?: string, message?: string,admin?:Admin }>;
    logout: () => void;
};

const useAdminAuthStore = create<AdminAuthState>()(persist(
    (set) => ({
        admin: null,
        setAdmin: (admin) => {
            set({ admin: admin })
        },
        token: null,
        login: async (name: string, password: string) => {
            const result = await login(name, password);
            if (result.token) {
                console.log('tok:' + result.token)
                set({ token: result.token })
            }
            return result;
        },
        logout: () =>
            set({ token: null }),
    }), {
    name: 'admin-storage', // ключ в localStorage
}

))

const login = async (name: string, password: string) => {
    if (!name || !password) return { success: false, message: 'no name or password' }

    const body = {
        name: name,
        password: password
    }


    const options = {
        body: JSON.stringify(body), method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    } as RequestInit

    try {
        const response = await safeFetch<{ token: string, admin: Admin }>('/admins/login', options)

        if (response.success && response.data) {
            const token = response.data.token;
            const admin = response.data.admin
            if (token) {
                Cookie.set('admin_token', token)
                return {
                    token: token,
                    success: true,
                    message: response?.message || '',
                    admin
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
    catch {
        return {
            success: false,
            message: 'global error'
        }
    }
}

export { useAdminAuthStore }