type PlayList = {
    name: string,
    path: string,
    tags: string[],
    fullPath: string,
    parentPath: string | null,
    discription: string,
    ids: string[],
        subCategories?:PlayList[];
}

export type {PlayList}