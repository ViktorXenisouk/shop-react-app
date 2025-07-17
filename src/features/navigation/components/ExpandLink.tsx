import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import { Link } from 'react-router-dom';

type ExpandLinkProps = {
  title: string;
  links: { title: string; to: string }[];
};

const ExpandLink = ({ title, links }: ExpandLinkProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {links.map((link) => (
          <MenuItem
            key={link.to}
            component={Link}
            to={link.to}
            onClick={handleClose}
          >
            {link.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ExpandLink;