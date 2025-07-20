import { create } from "zustand"
import { autoSaveFetch } from "../services/safe-fetch"
import type { User } from "../types/user";
import { persist } from "zustand/middleware";
import type { BasketItem } from "../types/basket";

type Set = {
    (partial: AuthUserState | Partial<AuthUserState> | ((state: AuthUserState) => AuthUserState | Partial<AuthUserState>), replace?: false): void;
    (state: AuthUserState | ((state: AuthUserState) => AuthUserState), replace: true): void;
}

type Get = () => AuthUserState

type Guest = {
    basketInfo:BasketItem[]
    favourite: string[];
    username:string,
    email?:undefined
}

type AuthUserState = {
    user: User | Guest,
    token: string | null;
    createOrChangeBasketItem: (basketItem: BasketItem) => void
    addOrRemoveFavourite: (id: string, value: boolean) => void
    login: (email: string, password: string) => Promise<{ success: boolean, token?: string, message?: string }>;
    logout: () => void;
};

const useAuthUserStore = create<AuthUserState>()(persist(
    (set, get) => ({
        user: {basketInfo:[],favourite:[],username:'guest'},
        token: null,
        login: async (email: string, password: string) => {
            return await login(email, password, set);
        },
        logout: () => {
            set({ token: null,user:{basketInfo:[],favourite:[],username:'guest'} })
        },
        createOrChangeBasketItem: (basketItem: BasketItem) => {
            createOrUpdateBasketInfo(basketItem, set, get)
        },
        addOrRemoveFavourite: (id: string, value: boolean) => {
            setOrUpdateFavourite(id, value, set, get)
        }
    }),

    { name: 'user-storage' }
))

const login = async (email: string, password: string, set: Set): Promise<{ success: boolean, message: string }> => {
    if (!email || !password) return { success: false, message: 'no name or password' }

    try {
        const response = await autoSaveFetch<{ token: string, user: User }>('/auth/login', { method: "POST", body: { email, password } })

        if (response.success && response.data) {
            const token = response.data.token;
            const user = response.data.user

            if (token && user) {
                set({ token: token,user:user })
                return { success: true, message: '' }
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

const createOrUpdateBasketInfo = (basketItem: BasketItem, set: Set, get: Get) => {
    const store = get();

    if (!store.user) return;

    const oldItems = store.user.basketInfo;
    const index = oldItems.findIndex((v) => v.id === basketItem.id);

    let newItems: BasketItem[];

    if (index !== -1) {
        // Заменяем существующий элемент
        newItems = [...oldItems];
        newItems[index] = basketItem;
    } else {
        // Добавляем новый элемент
        newItems = [...oldItems, basketItem];
    }

    newItems = newItems.filter((v) => v.count > 0 && v.id !== '')

    console.log(newItems)
    set({
        user: {
            ...store.user,
            basketInfo: newItems
        }
    });
}

const setOrUpdateFavourite = (id: string, value: boolean, set: Set, get: Get) => {
    const store = get();

    if (!store.user) return

    const oldItems = store.user.favourite

    const include = oldItems.includes(id)

    let newItems: string[] = [...oldItems]

    if (value === true && !include) {
        newItems = [...oldItems, id]
    }
    if (value === false && include) {
        newItems = oldItems.filter((v) => v !== id)
    }

    set({
        user: {
            ...store.user,
            favourite: newItems
        }
    });
}

export { useAuthUserStore }