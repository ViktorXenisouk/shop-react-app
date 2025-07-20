type Body = {
    username: string,
    email: string,
    tel: string,
    password:string
}

type childrenProps = {
    index: number,
    body: Body,
    setBody: (updates: Partial<Body>) => void,
    next:()=>void
}

export {type Body, type childrenProps}