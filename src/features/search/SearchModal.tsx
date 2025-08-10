import React from 'react';
import { Box, Modal, IconButton,} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import SearchForm from './SearchForm';

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal = ({ isActive, setIsActive }: Props) => {
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
          bgcolor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1300,
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 600,
            minHeight: 400,
            position: 'relative',
          }}
        >
 <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </IconButton>
          <SearchForm onSubmit={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;
