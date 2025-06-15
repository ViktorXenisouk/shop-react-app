const inputHandler = (callback:(value:string)=>void) => {

    const changeHandler : React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        callback(ev.target.value)
    }

    return changeHandler
} 

const inputBodyHandler= <T>(setBody:React.Dispatch<React.SetStateAction<T>>,callback:(prev:T,value:string)=>any) => {

    const changeHandler : React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        setBody((prev) => {
            callback(prev,ev.target.value)
            return prev
        })
    }

    return changeHandler
} 

export {inputHandler,inputBodyHandler}