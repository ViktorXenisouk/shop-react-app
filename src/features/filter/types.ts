type FilterTags = {
    tags:string[];
    isHor:boolean
}

type FilterData = {
    data:{[key: string]: FilterTags;}
}

export {type FilterData}