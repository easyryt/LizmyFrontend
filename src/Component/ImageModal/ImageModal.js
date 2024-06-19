import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./ImageModal.module.css"
import CropImage from '../CropImage/CropImage';
import upload from "../../Component/Images/upload.webp"
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ImageModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClicked = (e) => {
    e.preventDefault()
    e.stopPropagation();
    handleOpen();
  }
  return (
    <div>
      <button className={styles.btn} onClick={handleButtonClicked}>Upload Image</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.img_container}>
            <button onClick={handleClose} className={styles.Close_btn}>X</button>
            <div className={styles.left_box}>
              <button onClick={handleClose} className={styles.save_button}>Save</button>
              <CropImage />
            </div>
            <div className={styles.right_box}>
              <div className={styles.Card}>
                <div className={styles.img_box}>
                  <img src={upload} alt='img' />
                </div>
                <div className={style.info_box}>
                  <h2>Make sure to check the application requirements before adding a photo. Some employers won’t consider a resume with photos.</h2>
                  <h3>Want to add a photo?</h3>
                  <ul>
                    <li>Choose a recent color photo in a JPEG, PNG, or GIF format, that’s less than 10MB.</li>
                    <li>Crop your photo so it only shows your head and shoulders.</li>
                    <li>If you already uploaded a photo, uploading another will replace it.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
