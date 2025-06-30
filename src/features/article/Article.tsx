import { Box, Container, Stack, Typography } from "@mui/material";
import type { ArticleBlock } from "../../types/article"
import GalleryBlock from "./components/GalleryBlock"
import ImageWithTextBlock from "./components/ImageWithTextBlock";
import ParagraphBlock from "./components/ParagraphBlock";

const Article = ({ articles }: { articles: ArticleBlock[] }) => {

    return (
        <Container>
            <Stack>
                {articles.map((block, index) => {
                    switch (block.type) {
                        case 'imageWithText':
                            return (
                                <Box>
                                    <Typography align='center' variant='h5'>Title</Typography>
                                    <ImageWithTextBlock key={index} {...block} />
                                </Box>
                            )
                        case 'paragraph':
                            return (
                                <Box>
                                    <Typography align='center' variant='h5'>Title</Typography>
                                    <ParagraphBlock key={index} {...block} />
                                </Box>
                            )
                        case 'gallery':
                            return (
                                <Box>
                                    <Typography align='center' variant='h5'>Title</Typography>
                                    <GalleryBlock key={index} {...block} />
                                </Box>
                            )
                        default:
                            return null;
                    }
                })}
            </Stack>
        </Container>
    )
}


export default Article