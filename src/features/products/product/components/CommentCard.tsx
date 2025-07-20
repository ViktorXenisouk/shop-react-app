import React, { useState } from 'react';
import { Box, Typography, Button, Paper,Rating } from '@mui/material';

type Props = {
    author: string;
    comment: string;
    maxLength?: number;
    rate?:number
};

const CommentCard: React.FC<Props> = ({ author, comment,rate, maxLength = 100 }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = comment.length > maxLength;
    const displayText = expanded || !isLong
        ? comment
        : comment.slice(0, maxLength) + '...';

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2,height:'100%' }}>
            <Rating max={10} value={rate} readOnly/>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {author}
            </Typography>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {displayText}
            </Typography>

            {isLong && (
                <Button
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                    sx={{ mt: 1 }}
                >
                    {expanded ? 'Скрыть' : 'Показать полностью'}
                </Button>
            )}
        </Paper>
    );
};

export default CommentCard;