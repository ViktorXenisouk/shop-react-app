import { Catalog } from '../../types/Catalog';
import { useState } from 'react';
import { Box, Typography, Button, Collapse, Link as MuiLink, Stack, Grid, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import Image from '../../UI/Image';
import MyLink from "../navigation/features/MyLink";

const CatalogDisplayCard = ({ name, path, subCataloge }: { name: string, path: string, subCataloge?: any[] }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded((prev) => !prev);

    const imgURL =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';

    return (
            <Grid size={4} sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', p: 1 }}>
                <Box display={'flex'}>
                    <Avatar src={imgURL}></Avatar>
                    <MuiLink
                        component={RouterLink}
                        to={`/products/${path}`}
                        underline="hover"
                        color="primary"
                        sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                        {name}
                    </MuiLink>
                </Box>
                {subCataloge && subCataloge?.length > 0 && !expanded && (
                    <Button endIcon={<ExpandMore />} variant="text" size="small" onClick={toggleExpanded} sx={{ mt: 1 }}>
                        more
                    </Button>
                )}

                {subCataloge && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                        <Button variant="text" size="small" onClick={toggleExpanded} endIcon={<ExpandLess />} sx={{ mt: 1 }}>
                            less
                        </Button>
                    </Collapse>
                )}
            </Grid>
    );
};

export default CatalogDisplayCard;