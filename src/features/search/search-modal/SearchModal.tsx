import React from 'react';
import { Box, Modal, IconButton, } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import SearchForm from '../search-form/SearchForm';

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal: React.FC<Props> = ({ isActive, setIsActive }) => {
  const handleClose = () => {
    setIsActive(false);
  };
  return (
    <Modal open={isActive} onClose={handleClose}>
      <Box
        onClick={handleClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.69)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          zIndex: 5,
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 1,
            width: '100%',
            maxWidth: 800,
            minHeight: 300,
            position: 'relative',
            mt:3
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'end',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3
            }}>
            <IconButton
              onClick={handleClose}
              aria-label="Close"
              sx={{ mr: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              mx: 5,
              mt: 3,
            }}>
            <SearchForm onSubmit={handleClose} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;
