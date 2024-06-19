import React, { useState } from 'react'
import style from "./ResumeForm.module.css"
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { resumeType } from '../../Recoil'
import { useRecoilState } from 'recoil'
import CustomCursor from '../CustomCursor/CustomCursor'

function ResumeForm() {
 
  const handleResumeType = (data) =>{
      localStorage.setItem("resumetype",JSON.stringify(data))
  }
  return (
    <div className={style.main}>
        <NavBar/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1>How Do you wanna start ?</h1>
        <div className={style.container}>
            <div>
                <h2>Create Resume for Fresher</h2>
               <a href="/CreateResume"><button onClick={()=>handleResumeType("Fresher")}>Get start</button></a> 
            </div>
            <div>
                <h2>Create Resume for Professional</h2>
                <a href="/CreateResume"><button onClick={()=>handleResumeType("Professional")}>Get start</button></a> 
            </div>
        </div>
       
    </div>
  )
}

export default ResumeForm
