import { Box, Table, TableBody, TableCell, TableRow,Paper } from "@mui/material"

type Par = { [name: string]: string | number };

const rows: Par =
{
    name: 'macbook',
    cost: 9999,
    processor: 'icore 7',
    raw: '8 gb'
}

const Params = () => {

    const getRows = () => {
        let array = []
        for (let row in rows) {
            array.push(
                <TableRow>
                    <TableCell>{row}</TableCell>
                    <TableCell>{rows[row]}</TableCell>
                </TableRow>
            )
        }
        return array
    }

    return (
        <Box >
            <Table sx={{width:'500px'}} component={Paper}>
                <TableBody>
                    {
                        getRows()
                    }
                </TableBody>
            </Table>
        </Box>
    )
}

export default Params