import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import style from "./CropImage.module.css";
import { croppedImageState } from '../../Recoil'; // Assuming uploadImage is not needed
import { useRecoilState } from 'recoil';

const MAX_FILE_SIZE_KB = 50; // Maximum allowed file size in kilobytes

const CropImage = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [images, setImages] = useState([]); // Store multiple images
  const [croppedImage, setCroppedImage] = useRecoilState(croppedImageState); // Store the cropped image

  const cropperRef = useRef(null);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImageBase64 = await getCroppedImageBase64(croppedAreaPixels);
    setCroppedImage(croppedImageBase64);
  };

  const getCroppedImageBase64 = async (croppedAreaPixels) => {
    if (images.length === 0) {
      return null;
    }

    const image = images[0];
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        if (file.size > MAX_FILE_SIZE_KB * 1024) {
          // File size exceeds the limit
          alert(`File size must be under ${MAX_FILE_SIZE_KB} KB`);
          continue; // Skip processing this file
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = new window.Image();
          newImage.src = event.target.result;
          newImage.onload = () => {
            setImages([newImage]);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setCroppedImage(null); // Clear previous cropped image
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className={style.main}>
      <div className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload-input"
          multiple // Allow multiple file selection
          id="upload" // Use id "upload"
        />
      </div>
      {images.length > 0 && (
        <>
          <div className={style.crop_container}>
            <Cropper
              image={images[0].src} // Display the first image
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              ref={cropperRef}
            />
          </div>
          <div className={style.control}>
            <input
              type="range"
              value={zoom}
              min={1}
              max={2}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CropImage;
