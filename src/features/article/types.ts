import { ArticleBlock } from "../../types/article"

type ArticleVariant = "imageWithText" | "paragraph" | "gallery"

type Block = ArticleBlock & { id: string }

export type {ArticleVariant,Block}
