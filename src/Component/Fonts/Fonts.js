import React from 'react'
import style from "./Fonts.module.css"
import FontPicker from '../FontPicker/FontPicker'
import FontSizePicker from '../FontSizePicker/FontSizePicker'
import ImageSizePicker from '../ImageSizePicker/ImageSizePicker'

function Fonts() {
  return (
    <div className={style.main}>
        <div>
        <FontPicker/>
        </div>
      
       <div>
       <FontSizePicker/>
       </div>
       <div>
        <ImageSizePicker/>
       </div>
    </div>
  )
}

export default Fonts
