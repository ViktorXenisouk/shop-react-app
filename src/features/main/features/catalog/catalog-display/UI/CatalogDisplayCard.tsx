import React, { useState, Fragment } from 'react';
import { Box, Typography, Button, Collapse, Link as MuiLink, Stack, Grid, Avatar, Paper, AccordionSummary, Accordion, AccordionDetails, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { Catalog } from '../../../../../../types/catalog';
import { PlayList } from '../../../../../../types/play-list';

type Props = {
    name: string,
    path: string,
    subCataloge?: (Catalog | PlayList)[],
    isPlaylist?: boolean
}

const CatalogDisplayCard: React.FC<Props> = ({ name, path, subCataloge, isPlaylist }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded((prev) => !prev);

    const imgURL =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';

    return (
        <Paper sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', py: '10px', alignItems: 'center' }}>
                <Avatar sx={{ ml: '10px' }} src={imgURL}></Avatar>
                <MuiLink
                    component={RouterLink}
                    to={`/${isPlaylist ? 'play-list' : 'products'}/${path}`}
                    underline="hover"
                    sx={{
                        color: theme => theme.palette.text.primary,
                        display: 'block',
                        ml: '10px',
                        fontWeight: 'bold'
                    }}>
                    {name}
                </MuiLink>
            </Box>
            {
                subCataloge && subCataloge.length > 0 &&
                <Accordion expanded={expanded}>
                    <AccordionSummary onClick={() => setExpanded((prev) => !prev)}>
                        {
                            expanded ?
                                <Fragment>
                                    <Box
                                        sx={{
                                            borderBottomWidth: '1px',
                                            borderBottomStyle: '1px',
                                            borderBottomColor: 'divider',
                                            width: '100%',
                                            pb: '20px'
                                        }}>
                                        <ExpandLess />
                                        less
                                    </Box>
                                </Fragment>
                                :
                                <Box><ExpandMore /> more</Box>
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1}
                            sx={{
                                mt: 1
                            }}>
                            {subCataloge.map((item) => (
                                <MuiLink
                                    key={item.path}
                                    component={RouterLink}
                                    to={`/${isPlaylist ? 'play-list' : 'products'}/${item.fullPath}`}
                                    underline="hover"
                                    sx={{
                                        color: theme => theme.palette.text.primary,
                                    }}
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