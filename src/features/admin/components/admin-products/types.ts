import { ImageItem } from "../../../../types/Image"
import { ArticleBlock } from "../../../../types/article"

type ProductBody = {
    name?: string,
    tags?: string[],
    discription?: string,
    imgs?: ImageItem[],
    category?: string,
    blocks: ArticleBlock[]
}


export { type ProductBody }