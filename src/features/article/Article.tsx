import { Stack } from "@mui/material";
import type { ArticleBlock } from "../../types/article"
import GalleryBlock from "./components/GalleryBlock"
import ImageWithTextBlock from "./components/ImageWithTextBlock";
import ParagraphBlock from "./components/ParagraphBlock";

const Article = ({ articles }: { articles: ArticleBlock[] }) => {

    return (
        <Stack>
            {articles.map((block, index) => {
                switch (block.type) {
                    case 'imageWithText':
                        return <ImageWithTextBlock key={index} {...block} />;
                    case 'paragraph':
                        return <ParagraphBlock key={index} {...block}/>;
                    case 'gallery':
                        return <GalleryBlock key={index} {...block} />;
                    default:
                        return null;
                }
            })}
        </Stack>
    )
}


export default Article