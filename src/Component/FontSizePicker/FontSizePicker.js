import React from 'react';
import { fontSizeState } from '../../Recoil';
import style from './FontSizePicker.module.css';
import { useRecoilState } from 'recoil';
import Slider from '@mui/material/Slider';

function FontSizePicker() {
  const [selectedFontSize, setSelectedFontSize] = useRecoilState(fontSizeState);



  const fontSizeOptions = [ 18, 20, 24, 28,30,35,40,70];

  return (
    <div className={style.font_box}>
      <h5>Choose font size</h5>
          <Slider
        defaultValue={selectedFontSize}
        min={Math.min(...fontSizeOptions)}
        max={Math.max(...fontSizeOptions)}
        aria-label="Default"
        onChange={(e) => setSelectedFontSize(parseInt(e.target.value))}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default FontSizePicker;
