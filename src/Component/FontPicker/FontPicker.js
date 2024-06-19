import React from 'react';
import { fontState } from '../../Recoil';
import style from './FontPicker.module.css';
import { useRecoilState } from 'recoil';

function FontPicker() {
  const [selectedFont, setSelectedFont] = useRecoilState(fontState);

  const fontOptions = [
    'Arial, Helvetica, sans-serif',
    'Times New Roman, Times, serif ',
    'Georgia, Times New Roman, Times, serif',
    'Cambria, Cochin, Georgia, Times, Times New Roman, serif',
    'Verdana, Geneva, Tahoma, sans-serif',
    'Palatino, Palatino Linotype, Book Antiqua, Georgia, serif',
  ];

  return (
    <div className={style.font_box}>
      <h5>Choose font</h5>
      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        {fontOptions.map((font, index) => (
          <option key={index} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontPicker;
