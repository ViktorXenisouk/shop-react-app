import CustomRadio from "./FilterBlock"
import {Container,Typography,Stack} from "@mui/material"

const VerticalFilterList = ({ name, tags }: { name: string, tags: string[] }) => {



    return (
        <Container>
            <Typography variant="h2">{name}</Typography>
            <Stack>
                {tags.map((item,i) => <CustomRadio label={item} value={item} name={`${name}${i}`} />)}
            </Stack>
        </Container>
    )
}

export default VerticalFilterList