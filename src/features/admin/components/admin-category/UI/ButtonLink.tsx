import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
    children: any, 
    to: string, 
    onClick?: () => void
}

const ButtonLink : React.FC<Props> = ({ children, to, onClick }) => {
    return (
        <Button
            component={Link}
            to={to}
            sx={{ textTransform: 'none', color: 'inherit' }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default ButtonLink