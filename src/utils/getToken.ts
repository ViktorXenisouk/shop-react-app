import Cookie from "./cookie"

const getAdminToken = () => {
    const token = Cookie.get('admin_token')
    return token
}

export {getAdminToken}