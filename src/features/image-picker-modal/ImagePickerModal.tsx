import React, { useEffect, useState } from 'react';
import { AddPhotoAlternate } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import type { ImageItem } from '../../types/Image';
import { autoSaveFetch, safeFetch }
  from '../../services/safe-fetch';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Grid, Typography, IconButton, Box, Avatar,
} from '@mui/material';
import ImagePickerCard from './components/ImagePickerCard';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (images: ImageItem[]) => void; // теперь массив
  folder: string
  deafultImages?: { name: string, url: string }[]
};

const ImagePickerModal: React.FC<Props> = ({ open, onClose, onSelect, folder, deafultImages }) => {
  const [availableImages, setAvailableImages] = useState<{ url: string, name: string }[]>([])
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>(deafultImages ?? []);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    autoSaveFetch<{ url: string, name: string }[]>(`/images/${folder}`, { method: 'GET' }).then((result) => {
      console.log('data')
      console.log(result.data)
      setAvailableImages(result.data ?? [])
    })

  }, [folder])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadPreview(URL.createObjectURL(file));

    const formData = new FormData();

    formData.append('image', file);

    setUploading(true);

    const result = await safeFetch<{ url: string }>(
      `/images/upload/${folder}`,
      {
        method: 'POST',
        body: formData,
      });

    if (!result.success || !result.data) {
      alert('some error during')
      setUploading(false);
      return
    }

    setUploading(false);
    const newImage = { url: result.data.url, name: file.name };
    setSelectedImages(prev => [...prev, newImage]);
  };

  const toggleSelect = (image: ImageItem) => {
    setSelectedImages(prev =>
      prev.find(img => img.url === image.url)
        ? prev.filter(img => img.url !== image.url)
        : [...prev, image]
    );
  };

  const handleConfirm = () => {
    onSelect(selectedImages);
    onClose();
  };

  const isSelected = (url: string) => selectedImages.some(img => img.url === url);

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>
        Selecter of Images
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {selectedImages.map((img) =>
            <Grid size={{ xs: 4, sm: 3, md: 2 }} >
              <ImagePickerCard
                isSelected={isSelected}
                toggleSelect={toggleSelect}
                img={img}
              />
            </Grid>)}
        </Grid>
        <Typography variant="h6" gutterBottom>Available Images</Typography>
        <Grid container spacing={2}>
          {availableImages.length > 0 ? availableImages.map((img) => (
            <Grid size={{ xs: 4, sm: 3, md: 2 }} key={img.url}>
              <ImagePickerCard
                isSelected={isSelected}
                toggleSelect={toggleSelect}
                img={img}
              />
            </Grid>
          )) : null}
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Загрузить новое</Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternate />}
            disabled={uploading}
          >
            Загрузить
            <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
          </Button>

          {uploadPreview && (
            <Box mt={2}>
              <Typography variant="caption">Priview:</Typography>
              <Avatar
                src={uploadPreview}
                alt="preview"
                variant="rounded"
                sx={{ width: 120, height: 120, mt: 1 }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleConfirm} disabled={selectedImages.length === 0} variant="contained">
          Выбрать {selectedImages.length > 0 ? `(${selectedImages.length})` : ''}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePickerModal;
