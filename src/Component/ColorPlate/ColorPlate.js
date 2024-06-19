import React from 'react';
import { useRecoilState } from 'recoil';
import { ChooseColor, ChooseColorSecond, ChooseColorThird } from '../../Recoil';
import style from './ColorPlate.module.css';

function ColorPlate() {
  const [color1, setColor1] = useRecoilState(ChooseColor);
  const [color2, setColor2] = useRecoilState(ChooseColorSecond);
  const [color3, setColor3] = useRecoilState(ChooseColorThird);

  const handleColorChange1 = (e) => {
    const newColor = e.target.value;
    setColor1(newColor);
  };
  const handleColorChange2 = (e) => {
    const newColor = e.target.value;
    setColor2(newColor);
  };
  const handleColorChange3 = (e) => {
    const newColor = e.target.value;
    setColor3(newColor);
  };

  return (
    <div className={style.colorplates_box}>
      <h2 >Choose color</h2>
      <ul>

        <li>
          <input
            className={style.customColor_btn}
            type="color"
            value={color1}
            onChange={handleColorChange1}
          />
        </li>
        <li>
          <input
            className={style.customColor_btn}
            type="color"
            value={color2}
            onChange={handleColorChange2}
          />
        </li>
        <li>
          <input
            className={style.customColor_btn}
            type="color"
            value={color3}
            onChange={handleColorChange3}
          />
        </li>
      </ul>
    </div>
  );
}

export default ColorPlate;
