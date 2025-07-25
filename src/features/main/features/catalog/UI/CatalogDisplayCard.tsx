import { useState } from 'react';
import { Box, Typography, Button, Collapse, Link as MuiLink, Stack, Grid, Avatar, Paper, AccordionSummary, Accordion, AccordionDetails, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material'

const CatalogDisplayCard = ({ name, path, subCataloge }: { name: string, path: string, subCataloge?: any[] }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded((prev) => !prev);

    const imgURL =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';

    return (
        <Paper sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', py: '10px',alignItems:'center' }}>
                <Avatar sx={{ ml: '10px' }} src={imgURL}></Avatar>
                <MuiLink
                    component={RouterLink}
                    to={`/products/${path}`}
                    underline="hover"
                    color="primary"
                    sx={{ display: 'block', ml: '10px', fontWeight: 'bold' }}>
                    {name}
                </MuiLink>
            </Box>
            {
                subCataloge && subCataloge.length > 0 &&
                <Accordion expanded={expanded}>
                    <AccordionSummary onClick={() => setExpanded((prev) => !prev)}>
                        {
                            expanded ?
                                <>
                                    <Box sx={{borderBottom:'#ccc solid 1px',width:'100%',pb:'20px'}}><ExpandLess /> less</Box>
                                </>
                                :
                                <Box><ExpandMore /> more</Box>
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1} sx={{ mt: 1 }}>
                            {subCataloge.map((item) => (
                                <MuiLink
                                    key={item.path}
                                    component={RouterLink}
                                    to={`/products/${item.fullPath}`}
                                    underline="hover"
                                >
                                    {item.name}
                                </MuiLink>
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            }
        </Paper>
    );
};

export default CatalogDisplayCard;