import React from "react";
import { imageSizeState } from "../../Recoil";
import style from "./ImageSizePicker.module.css";
import { useRecoilState } from "recoil";
import Slider from "@mui/material/Slider";

function ImageSizePicker() {
  const [selectedImageSize, setSelectedImageSize] =
    useRecoilState(imageSizeState);

  const fontSizeOptions = [
    40, 45, 50, 60, 65, 70, 100, 120, 130, 150, 160, 170, 180, 200,
  ];

  return (
    <div className={style.Img_box}>
      <h5>Choose Image Size</h5>
      <Slider
        defaultValue={selectedImageSize}
        min={Math.min(...fontSizeOptions)}
        max={Math.max(...fontSizeOptions)}
        aria-label="Default"
        onChange={(e) => setSelectedImageSize(parseInt(e.target.value))}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default ImageSizePicker;
