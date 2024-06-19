import React from 'react'
import style from "./Home.module.css"
import resume  from "../../Component/Images/navy-resume.png"
import { Link } from 'react-router-dom'
import { useSound } from 'use-sound';
import clickSound from "../../Sounds/Click.mp3"

function Home() {
  const [play] = useSound(clickSound);
  const handleClick = () => {
    play();
  };

  return (
    <div className={style.main}>
     
            <div className={style.heading}>
            <h1><span className={style.span}>Unlock </span>Your Potential, One Resume at a Time</h1>
             <h4 >Create Your Resume For Free</h4>
            <Link to={"/ChooseTemplates"}><button onClick={handleClick}>Create Resume</button></Link> 
            </div>

    
        <div className={style.right_box}>
            <div className={style.img_box}>
                <img src={resume} alt='resume' />
            </div>
        </div>
   
    </div>
  )
}

export default Home
