
type Article = {

}

type ArticleBlock = {
    title:string,
    text:string,
    imgUrl:string,
    variant:string,
    type:'imageWithText' | 'paragraph' | 'gallery'
}

export type {Article,ArticleBlock}