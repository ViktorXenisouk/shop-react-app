

const parseParams = (location:string,names:string[]) => {

    const queryParams = new URLSearchParams(location);

    let params: { [name: string]: string } | null = null

    for(let i = 0; i < names.length; i++){
        const value = queryParams.get(names[i])

        if(value){
            if(params == null)
                params = {}
            params[names[i]] = value
        }
    }

    let parsedParams = ''
    if (params) {
        parsedParams = '?'
        let isFirst = true
        for (const item in params) {
            if(!isFirst){
                parsedParams += '&'
            }
            else isFirst = false 
             parsedParams += `${item}=${encodeURIComponent(params[item])}`
        }
    }

    return parsedParams
}

export {parseParams}