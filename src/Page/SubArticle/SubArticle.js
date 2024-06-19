import React, { useState ,useEffect} from 'react'
import style from "./SubArticle.module.css"
import NavBar from '../../Component/NavBar/NavBar'
import { getAllBlog } from '../../Api/Api';
import SecondSection from '../../Sections/SecondSection/SecondSection';
import Footer from '../../Component/Footer/Footer';


function SubArticle() {
const article=JSON.parse(localStorage.getItem("article"))

   

    
      
  return (
    <div className={style.main}>
        <NavBar/>
        <div className={style.container}>
            <div className={style._box}>
            <div className={style.bradcums}>
                <h4>Home / Subject /<span> {article?.title}</span></h4>
            </div>
            <div className={style.head}>
                 <h1>{article?.title}</h1>
            </div>
            </div>
        </div>

        <div>
            <SecondSection/>
        </div>
    
       <div className={style.des_box}>
        <div className={style.inner_container}>
        <div className={style.img_box}>
          <img src={article?.articleImg[0]} alt='img' />
        </div>
        <br/>
       <div dangerouslySetInnerHTML={{ __html: article?.description}} />
        </div>
     
       </div>
       <Footer/>
    </div>
  )
}

export default SubArticle
