import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import style from './Slider.module.css';
import { Link } from 'react-router-dom';
import resume_1 from "../TemplateImages/01.jpg"
import resume_2 from "../TemplateImages/02.jpg"
import resume_3 from "../TemplateImages/03.jpg"
import resume_4 from "../TemplateImages/04.jpg"
import resume_5 from "../TemplateImages/05.jpg"
import resume_6 from "../TemplateImages/06.jpg"
import resume_7 from "../TemplateImages/07.jpg"
import resume_8 from "../TemplateImages/08.jpg"
import resume_9 from "../TemplateImages/09.jpg"
import resume_10 from "../TemplateImages/10.jpg"
import resume_11 from "../TemplateImages/11.jpg"
import resume_12 from "../TemplateImages/12.jpg"
import resume_13 from "../TemplateImages/13.jpg"
import resume_14 from "../TemplateImages/14.jpg"
import resume_15 from "../TemplateImages/15.jpg"
import resume_16 from "../TemplateImages/16.jpg"
import resume_17 from "../TemplateImages/17.jpg"
import resume_18 from "../TemplateImages/18.jpg"
import resume_19 from "../TemplateImages/19.jpg"
import resume_20 from "../TemplateImages/20.jpg"
import resume_21 from "../TemplateImages/21.jpg"
import resume_22 from "../TemplateImages/22.jpg"
import resume_23 from "../TemplateImages/23.jpg"
import resume_24 from "../TemplateImages/24.jpg"
import resume_25 from "../TemplateImages/25.jpg"
import resume_26 from "../TemplateImages/26.jpg"
import resume_27 from "../TemplateImages/27.jpg"
import resume_28 from "../TemplateImages/28.jpg"
import resume_29 from "../TemplateImages/29.jpg"
import resume_30 from "../TemplateImages/30.jpg"
import { useRecoilState } from "recoil";
import { chooseTemplates } from '../../Recoil'; 


const imagePaths = [
  resume_1, 
  resume_2, 
  resume_3,
  resume_4,
  resume_5,
  resume_6,
  resume_7,
  resume_8,
  resume_9,
  resume_10,
  resume_11,
  resume_12,
  resume_13,
  resume_14,
  resume_15,
  resume_16,
  resume_17,
  resume_18,
  resume_19,
  resume_20,
  resume_21,
  resume_22,
  resume_23,
  resume_24,
  resume_25,
  resume_26,
  resume_27,
  resume_28,
  resume_29,
  resume_30,
];

export default function Slider() {
  const carouselRef = useRef(null);

 
  const handleTemNo=(no)=>{
    localStorage.setItem("templateid",JSON.stringify(no))
  }
    
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
    },
  };

  return (
    <div className={style.main}>
      <Carousel ref={carouselRef} responsive={responsive}>
        {imagePaths.map((path, index) => (
        <Link to={"/ResumeForm"}>  <div className={style.item} key={index} onClick={()=>handleTemNo(index)}>
            <img src={path} alt={`resume ${index + 1}`} />
          </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
