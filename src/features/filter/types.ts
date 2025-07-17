type FilterTags = {
    tags:string[],
    isHor:boolean,
}

type FilterParams = {
    tags: string[]
}

type FilterData = {[key: string]: FilterTags;}

export {type FilterData,type FilterParams}