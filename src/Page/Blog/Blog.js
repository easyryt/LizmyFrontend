import React, { useState ,useEffect} from 'react'
import style from "./Blog.module.css"
import NavBar from '../../Component/NavBar/NavBar'
import { getAllBlog } from '../../Api/Api';
import SecondSection from '../../Sections/SecondSection/SecondSection';
import Footer from '../../Component/Footer/Footer';


function Blog() {
    const [blog,setBlog] = useState([])
    useEffect(() => {
        handleAllBlog();

      }, []);
    
   
    console.log(blog[2],"blog")
    
      const handleAllBlog = async () => {
        try {
          const response = await getAllBlog();
    
          if (response.status === true) {
            setBlog(response?.data);
          } else {
            console.error('Error fetching user profile:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      };
  return (
    <div className={style.main}>
        <NavBar/>
        <div className={style.container}>
            <div className={style._box}>
            <div className={style.bradcums}>
                <h4>Home / Subject /<span> {blog[0]?.title}</span></h4>
            </div>
            <div className={style.head}>
                 <h1>{blog[0]?.title}</h1>
            </div>
            </div>
        </div>

        <div>
            <SecondSection/>
        </div>
       <div className={style.des_box}>
       <div dangerouslySetInnerHTML={{ __html: blog[2]?.description}} />
       </div>
       <Footer/>
    </div>
  )
}

export default Blog
