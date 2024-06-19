import React, { useState } from 'react'
import style from "./ChooseTemplates.module.css"
import NavBar from '../../Component/NavBar/NavBar'
import { Link } from 'react-router-dom'
import Footer from '../../Component/Footer/Footer'
import ColorPlate from '../../Component/ColorPlate/ColorPlate'
import { useSound } from 'use-sound';
import clickSound from "../../Sounds/Click.mp3"

import { imageresumeTemplates ,chooseTemplates} from '../../Recoil'
import { useRecoilState } from 'recoil'
import CustomCursor from '../../Component/CustomCursor/CustomCursor'




function ChooseTemplates() {
  const [play] = useSound(clickSound);

  const [template,setTempletes] = useRecoilState(imageresumeTemplates)

  const [templateNo, setTemplateNo] = useRecoilState(chooseTemplates);

  const handleClick = () => {
    play();
  };


  const handtemp=(id)=>{
    handleClick()
    localStorage.setItem("templateid",JSON.stringify(id))
    setTemplateNo(id)
  }

  return (
    <div className={style.main}>
        <NavBar/>
      <div className={style.container}>
        <div className={style.heading_box}>
        <h1>What do you want your resume to look like ?</h1>
      <p>View all resume template and select a specific style to customize</p>
        </div>

   <div  className={style.template_box}>
   
   {template.map((item,id)=>
   <div className={style.template_card} key={id}>
 
     <Link to={"/ResumeForm"} onClick={()=>handtemp(id)}>
       <img   src={item} className={style._card} />
        </Link>   

   </div>
   )}
</div>
            
      </div >
      <Footer/>
    </div>
  )
}

export default ChooseTemplates
