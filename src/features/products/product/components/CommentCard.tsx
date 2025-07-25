import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Rating, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
    author: string;
    comment: string;
    maxLength?: number;
    rate?: number
};

const PaperWithBorder = styled(Paper)(({ theme }) => ({
    borderColor: grey[300],
    borderWidth: '1px',
    borderStyle: 'solid'
}))

const CommentCard: React.FC<Props> = ({ author, comment, rate, maxLength = 100 }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = comment.length > maxLength;
    const displayText = expanded || !isLong
        ? comment
        : comment.slice(0, maxLength) + '...';

    return (
        <PaperWithBorder elevation={3} sx={{ height: '100%' }}>
            <Rating sx={{ p: '12px' }} max={10} value={rate} readOnly />
            <Typography sx={{ p: '12px' }} variant="subtitle2" color="text.secondary" gutterBottom>
                {author}
            </Typography>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', p: '12px' }}>
                {displayText}
            </Typography>

            {isLong && (
                <Box sx={{p:'12px'}}>
                    <Button
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        sx={{ mt: 1, width: '100%', px: '30px' }}
                    >
                        {expanded ? 'Скрыть' : 'Показать полностью'}
                    </Button>
                </Box>
            )}
        </PaperWithBorder>
    );
};

export default CommentCard;