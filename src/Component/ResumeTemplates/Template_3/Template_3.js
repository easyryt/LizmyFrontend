import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import mail from "../../Images/mail.png"
import call from "../../Images/call.png"
import dp from "../../Images/dp2.jpg"
import { Divider } from "@mui/material";
import style from "./Template_3.module.css";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { useRecoilState } from "recoil";
import {
  ChooseColor,
  chooseTemplates,
  ChooseColorSecond,
  croppedImageState,
  resumeData,
  ChooseColorThird,
  fontState,
  fontSizeState,
  imageSizeState,
  authenticateduser,
} from "../../../Recoil";
import downloadimg from "../../Images/download.gif"
import downloadpdf from "../../Images/pdf-download-2617.svg"
import downloaddoc from "../../Images/google-docs-icon-2.svg"
import downloadtext from "../../Images/icons8-text-500.svg"
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";




const Template_3= () => {
  const [color, setColor] = useRecoilState(ChooseColor);
  const [color2, setColor2] = useRecoilState(ChooseColorSecond);
  const [color3, setColor3] = useRecoilState(ChooseColorThird);
  const [fontStyle, setFontStyle] = useRecoilState(fontState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [imgSize, setImgSize] = useRecoilState(imageSizeState);
  const [templateNo, setTemplateNo] = useRecoilState(chooseTemplates);
  const [croppedImage, setCroppedImage] = useRecoilState(croppedImageState);
  const [formData, setFormData] = useRecoilState(resumeData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [base64Image1, setBase64Image1] = useState('');
  const [base64Image2, setBase64Image2] = useState('');
  const [base64Image3, setBase64Image3] = useState('');
  const [base64Image4, setBase64Image4] = useState('');
  const [base64Image5, setBase64Image5] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ checkAuth, setCheckAuth] = useRecoilState(authenticateduser);
  const navigate = useNavigate()

  const handleDate = (data) => {
    console.log(data, "data");

    const startYear = new Date(data).getFullYear();

    return startYear;
  };



  
  useEffect(() => {
    const imageLocations = [
      location,
      linkedin,
      croppedImage ? croppedImage : dp,
      mail,
      call,
    ];
  
    const handleImageChange = async () => {
      try {
        const promises = imageLocations.map(async (location, index) => {
          const response = await fetch(location);
          const blob = await response.blob();
          const reader = new FileReader();
  
          return new Promise((resolve) => {
            reader.onloadend = () => {
              // The result property contains the base64-encoded string
              const base64String = reader.result;
              resolve({ index, base64String });
            };
  
            // Read the image file as a data URL
            reader.readAsDataURL(blob);
          });
        });
  
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
  
        // Update state based on index
        results.forEach(({ index, base64String }) => {
          if (index === 0) {
            setBase64Image1(base64String);
          } else if (index === 1) {
            setBase64Image2(base64String);
          }else if (index === 2) {
            setBase64Image3(base64String);
          }
          else if (index === 3) {
            setBase64Image4(base64String);
        
          }else if (index === 4) {
            setBase64Image5(base64String);
          }
        });
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
  
    handleImageChange();
  }, []);

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  
  const getCSS = () =>{
    return `
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
      box-sizing: border-box;
      background-color: white;
  }
  .main {
      width: 850px;
 
      background-color: white;
      display: grid;
      grid-template-columns: 1fr 2fr;
  }
  
.Left_container{
display: flex;
flex-direction: column;
margin:0;
height: 1100px;
}

.container {
padding: 13px 0 0 0;
}

.name {
color: white;
}

.hr {
margin-left: 0.5rem ; /* 0.5rem */
margin-right: 4.375rem; /* 4.375rem */
color:white;
}

.iconContainer {
width: 1.5625rem ; /* 1.5625rem */
height: 1.5625rem ; /* 1.5625rem */
background-color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;

}

.icon {
color: black;
}

.email {
color: white;
}

.phoneIcon {
font-size: 12px;
}


.contactInfo {
display: flex;
gap: .5rem;
align-items:center;
}
.skillsHeader {
padding: 1.5rem;
display: flex;
flex-direction: column;
gap: .5rem;
}

.skillsHeader h3{
margin-left: .5rem;
}
.skill h3{
margin-left: 2rem;
}

.skillsHeader ul{
list-style: none;
padding: 0rem 2rem 0rem 0rem;
margin-top:-.5rem;

}
.skillsHeader ul li{
display: grid;
grid-template-columns: 1fr 1fr;
padding: 0rem 1rem;

}
.skillsHeader2{
padding: 1.5rem;
}
.skillsHeader2 h2{
display: flex;
align-items: center;
gap: .5rem;
}
.skillsHeader2 ul{
margin-left: 1.5rem;
}
.professionalSkillsHeader ul{
margin-left: 1.5rem;
}

.info_box{
display: flex;
flex-direction: column;
gap: .5rem;
padding: 0rem 2rem;
}
.info_box h3{
margin-left: .5rem;
}

.educationHeader{
padding: 1.5rem;
}
.objectiveHeader{
padding: 1rem;
height: 9rem;
display: flex;
flex-direction: column;
justify-content: center;
gap: .5rem;
}
.workHeader{
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
gap: .5rem;
}
.skillsHeader2{
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
gap: .5rem;
margin-top:-4rem;
}
.professionalSkillsHeader{
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
}
.professionalSkillsHeader h2{
display: flex;
align-items: center;
gap: .5rem;

}
.img_container{
padding: .4rem;
display: flex;
align-items: center;
justify-content: center;
}
.img_box{
height: 10rem;
width: 10rem;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background-color: white;
padding: .3rem;
}
.img_box img{
height: 100%;
width: 100%;
border-radius: 50%;
}
.person_name{
font-size: 3rem;
}
.person_name span{

}
.company_name{
display: flex;
justify-content: space-between;

}
.work_des{
display: flex;
flex-direction: column;
gap:.5rem ;
padding: 0rem 1rem;
}
.img_container{
display: flex;
align-items: center;
justify-content: center;
height: 10rem;
}
.contactInfo p{
margin:0rem;
}
.edu-list h4,h5,p{
  margin:0rem;
}
.skill-info{
display:grid;
grid-template-columns: 1fr ;
gap:.8rem;
margin-top:-2em;
margin-left: .8rem;
}

.divider{
margin-top:-2rem;
margin-left: .5rem;
}
.Profile-divider{
margin-top:-2rem;
}
.work-divider{
margin-top:-1rem;
}
.objectiveHeader p,h1{
margin:0rem; 
}

.skill-list  li{
width:100%;
padding:.2rem;
list-style:none;
}
.skill-list{
  margin-top:-.5rem;
  margin-left:-.5rem;

}
.skill-divider{
margin-top:-1rem;
width:80%;
margin-left: 2rem;
}
.lang-list{
  margin-top:-2rem;
  margin-left:-.5rem;
}
.work-ul{
margin-top:-1rem;
margin-left: -3rem!important;
}
.icon{
height:1rem;
width:1rem;
}
ul{
  list-style: none;
}
.skillsHeader{
  margin-top:-2rem!important;
}
.skill{
  margin-top:-2rem!important;
}
    `
  }
  


  const getHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css"> 

        <title>Your Page Title</title>
    </head>
    
    <body>
        <div class="main">
            <div class="Left_container" style="background-color: ${color}; color: ${color3};  ;">
                <div class="img_container">
                    <div class="img_box" style="height: ${imgSize}px; width: ${imgSize}px;">
                        <img src=${base64Image3} alt="dp">
                    </div>
                </div>
    
                <div class="info_box">
                    <h3 >CONTACT</h3>
                   <div class="divider"><hr ></div> 
                    <div class="contactInfo" style="color:${color3}">
                        <div class="iconContainer" >
                        <img class="icon" src=${base64Image4} alt="dp" />
                        </div>
                        <p class="email" style="color:${color3}"> ${formData.resume.contact.email}</p>
                    </div>
                    <div class="contactInfo">
                        <div class="iconContainer" >
                        <img class="icon" src=${base64Image5} alt="dp" />
                        </div>
                        <p class="email"style="color:${color3}" > ${formData.resume.contact.phone}</p>
                    </div>
                    <div class="contactInfo">
                        <div class="iconContainer" >
                     
                        <img class="icon" src=${base64Image1} alt="dp" />
                 
                        </div>
                        <p class="email" style="color:${color3}" > 
                        ${formData.resume.address.address},
                        ${formData.resume.address.state },
                        ${formData.resume.address.postalCode }
                        </p>
                    </div>
                </div>
               <br/>
               ${formData.resume.education.length > 0 ?
                `<div class="skillsHeader">
                    <h3 >EDUCATION</h3>
                    <div class="divider"><hr ></div> 
                    <ul class="skill-info">
                    ${formData.resume.education.map((item) => `
                    <div  class="edu-list">
                        <h4>${item.degree}</h4>
                        <h5>${item.startYear} - ${item.endYear}</h5>
                        <p>${item.collegeName}</p>
                    </div>
                `).join('')}
                       
                    </ul>
                </div>`:""
                }


               ${formData.resume.skillsAndLevel.length > 0 ? 
                `<div class="skill">
                    <h3 >PERSONAL SKILLS</h3>
                    <div class="skill-divider"><hr ></div> 
                    <ul class="skill-list">
                    ${formData.resume.skillsAndLevel.map((item) => `
                    <li> ${item.skills}</li>
                    `).join('')}
                        
                    </ul>
                </div>`:""
                }
    
           ${formData.resume.knownLanguages.length > 0 ? 
                `<div class="skillsHeader">
                    <h3 >LANGUAGES</h3>
                    <div class="divider"><hr ></div> 
                    <ul class="lang-list">
                    ${formData.resume.knownLanguages.map((item) => `
                <li >
                <span>${item?.lang}</span>
                 </li>
            `).join('')}
                       
                    </ul>
                </div>`:""
                }
            </div>
    
            <div>
                <div class="objectiveHeader">
                    <h1 class="person_name"  style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;">
                    ${formData.resume.name}
                    </h1>
                    <p class="objectiveText"> ${formData.resume.jobTitle}</p>
                </div>
                    <br/>
                    <br/>
                <div class="skillsHeader2">
                    <h3>PROFILE</h3>
                    <div class="Profile-divider"><hr ></div> 
                    <p>
                    ${formData.resume.summary}
                      </p>
                </div>
    
                ${formData.resume.work.length > 0 ?
                `<div class="professionalSkillsHeader">
                    <div>
                        <h3>WORKING EXPERIENCE</h3>
                        <div class="work-divider"><hr ></div> 
                    </div>
                    <ul class="work-ul">
                    ${formData.resume.work.map((item) => `
                    <li>
                    <div class="work_des">
                    <h4 class="customerService">${item?.title}</h4>
                    <h5 class="company_name" style="color:${color2}"><span>${item?.company} - ${item?.location}</span> <span>${formatDate(item?.startDate)} - ${formatDate(item?.endDate)}</span>
                    </h5>
                    <p>
                       ${item?.description}
                      </p>
                </div>
                </li>
            `).join('')}     
                    </ul>
                </div>`:""
                }
                ${formData.resume.projects.length > 0 ?
                `<div class="professionalSkillsHeader">
                    <div>
                        <h3>PROJECTS</h3>
                        <div class="work-divider"><hr ></div> 
                    </div>
                    <ul class="work-ul">
                    ${formData.resume.projects.map((item) => `
                    <li>
                    <div class="work_des">
                    <h4 class="customerService">${item?.title}</h4>
                    <h5 class="company_name" style="color:${color2}"><span>${item?.link}</span> <span>${item?.year}</span>
                    </h5>
                    <p>
                       ${item?.description}
                      </p>
                </div>
                </li>
            `).join('')}     
                    </ul>
                </div>`:""
                }
            </div>
        </div>
    </body>
    
    </html>
    
    `;
  };

  const handleResume = async () => {
    localStorage.setItem("submit",true)
    localStorage.setItem("pendingData",JSON.stringify(formData) )
    if (!checkAuth) {
      navigate("/Form");
      return; // Stop further execution if authentication check fails
    }

    setLoading(true);
    setError("");

    const axiosConfig = {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://www.voizyy.com/convert/htmlCssToPdf",
        {
          html: getHTML(),
          cssStyles: getCSS(), // Include your CSS data here
        },
        axiosConfig
      );

      setLoading(false);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lizmy.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  const handleDownloadDoc = async () => {
    localStorage.setItem("submit",true)
    localStorage.setItem("pendingData",JSON.stringify(formData) )
    if (!checkAuth) {
      navigate("/Form");
      return; // Stop further execution if authentication check fails
    }
    setLoading(true);
    setError("");
    try {
      // Step 1: Convert HTML and CSS to PDF
      const pdfResponse = await axios.post(
        "https://www.voizyy.com/convert/htmlCssToPdf",
        {
          html: getHTML(),
          cssStyles: getCSS(), // Include your CSS data here
        },
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/json",
          },
        }
      );

      // Step 2: Convert PDF to DOCX
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfResponse.data], { type: "application/pdf" })
      );

      const docxResponse = await axios.post(
        "https://www.voizyy.com/convert/pdftodocx",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      setLoading(false);
      // Create a Blob from the response data
      const docxBlob = new Blob([docxResponse.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Save the Blob as a file using FileSaver.js
      saveAs(docxBlob, "lizmy.docx");

      return "Conversion successful";
    } catch (error) {
      setLoading(false);
      throw new Error("Error converting HTML and CSS to DOCX");
    }
  };

  const handleDownloadTxt = async () => {
    localStorage.setItem("submit",true)
    localStorage.setItem("pendingData",JSON.stringify(formData) )
    if (!checkAuth) {
      navigate("/Form");
      return; // Stop further execution if authentication check fails
    }
    setLoading(true);
    setError("");

    try {
      // Step 1: Convert HTML and CSS to PDF
      const pdfResponse = await axios.post(
        "https://www.voizyy.com/convert/htmlCssToPdf",
        {
          html: getHTML(),
          cssStyles: getCSS(), // Include your CSS data here
        },
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/json",
          },
        }
      );

      /// Step 2: Convert PDF to text using your PDF to text API
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfResponse.data], { type: "application/pdf" })
      );

      const textResponse = await axios.post(
        "https://pdfsummary.onrender.com/lizmyPdfToText",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "text/plain", // Update the responseType to 'text/plain'
        }
      );

      setLoading(false);
      // Create a Blob from the response data
      const textBlob = new Blob([textResponse.data], {
        type: "text/plain",
      });

      // Save the Blob as a file using FileSaver.js
      saveAs(textBlob, "lizmy.txt");

      return "Conversion successful";
    } catch (error) {
      setLoading(false);
      throw new Error(`Error converting HTML and CSS to TXT: ${error.message}`);
    }
  };
  
  const ResumeModal = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className={style.overlay}>
        <div className={style.modal}>
  

       {loading ?   
       <div  className={style.down_img_box}>
           <img src={downloadimg } alt="downloading" />
           {error && <p style={{ color: "red" }}>{error}</p>}
       </div>
       :
       <div className={style.download_box}>
       <button className={style.closeButton} onClick={onClose}>Close
       </button>
       <div  className={style.down_btn_box}>
       <div  onClick={handleResume} className={style.icon_download}><img src={downloadpdf } alt="pdf"/>PDF</div>
        <div  onClick={handleDownloadDoc} className={style.icon_download}><img src={downloaddoc } alt="doc"/> DOC</div>
         <div  onClick={handleDownloadTxt} className={style.icon_download}><img src={downloadtext } alt="text"/>TEXT</div>
       </div>
       </div>
       }
         
        

        </div>
      </div>
    );
  };

  const handleDownloadClick = () => {
    // Handle the download logic
    // For now, let's just open the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
         <div className={style.download_btn} >
    <button onClick={handleDownloadClick}>Download</button>
      <ResumeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
    <div className={style.main}>
      <div className={`${style.Left_container} `} style={{ height: "1210px" ,backgroundColor:color ,color:color3}}>
        <div className={style.img_container}>
          <div className={style.img_box} style={{ height: imgSize, width: imgSize }}>
            <img src={base64Image3} alt="dp" />
          </div>
        </div>

        <div className={style.info_box} >
          <h3 className={style.heading}>CONTACT</h3>
          <div className={style.divider}>&ensp;</div>
          <div className={style.contactInfo}>
            <div className={`${style.iconContainer} `}>
              <img className={style.icon} src={base64Image4} alt="dp" />
            </div>
            <p className={style.email} style={{color:color3}}>{formData.resume.contact.email}</p>
          </div>
          <div className={style.contactInfo}>
            <div className={`${style.iconContainer} ${style.color}`}>
              <img className={style.icon} src={base64Image5} alt="dp" />
            </div>
            <p className={style.email} style={{color:color3}}>{formData.resume.contact.phone}</p>
          </div>
          <div className={style.contactInfo}>
            <div className={`${style.iconContainer} ${style.color}`}>
              <img className={style.icon} src={base64Image1} alt="dp" />
            </div>
            <p className={style.email} style={{color:color3}}>
              {formData.resume.address.address},
              {formData.resume.address.state},
              {formData.resume.address.postalCode}
            </p>
          </div>
        </div>

        {formData.resume.education.length > 0 &&
             <div className={style.skillsHeader}>
             <h3 className={style.heading}>EDUCATION</h3>
             <div className={style.divider}>&ensp;</div>
             <ul className={style.skillInfo}>
               {formData.resume.education.map((item, index) => (
                 <div key={index} className={style.edu}>
                   <h4>{item.degree}</h4>
                   <h5>{item.startYear} - {item.endYear}</h5>
                   <p>{item.collegeName}</p>
                 </div>
               ))}
             </ul>
           </div>
        }
   
      {formData.resume.skillsAndLevel.length > 0 && 
       <div className={style.skill}>
       <h3 className={style.heading}>PERSONAL SKILLS</h3>
       <div className={style.divider}>&ensp;</div>
       <ul className={style.skill_list}>
         {formData.resume.skillsAndLevel.map((item, index) => (
           <li key={index}>{item.skills}</li>
         ))}
       </ul>
     </div>
      }
       
       {formData.resume.knownLanguages.length > 0 && 
           <div className={style.skillsHeader}>
           <h3 className={style.heading}>LANGUAGES</h3>
           <div className={style.divider}>&ensp;</div>
           <ul>
             {formData.resume.knownLanguages.map((item, index) => (
               <li key={index}>
                 <span>{item?.lang}</span>
               </li>
             ))}
           </ul>
         </div>
       }
    
      </div>

      <div>
        <div className={style.objectiveHeader}>
          <h1 className={style.person_name} style={{ fontFamily: fontStyle ,fontSize: fontSize}} >{formData.resume.name}</h1>
          <p className={style.objectiveText}>{formData.resume.jobTitle}</p>
        </div>

        <div className={style.skillsHeader2}>
          <h3 className={style.heading}>PROFILE</h3>
          <div className={style.divider}>&ensp;</div>
          <p>{formData.resume.summary}</p>
        </div>

        {formData.resume.work.length > 0 &&
          <div className={style.professionalSkillsHeader}>
          <div>
            <h3 className={style.heading}>WORKING EXPERIENCE</h3>
            <div className={style.divider}>&ensp;</div>
          </div>
          <ul className={style.workUl}>
            {formData.resume.work.map((item, index) => (
              <li key={index}>
                <div className={style.work_des}>
                  <h4 className={style.customerService}>{item?.title}</h4>
                  <h5 className={style.company_name} style={{color:color2}}>
                    <span>{item?.company} - {item?.location}</span> <span>{formatDate(item?.startDate)} - {formatDate(item?.endDate)}</span>
                  </h5>
                  <p>{item?.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        }
      {formData?.resume?.projects.length > 0 && 
        <div className={style.professionalSkillsHeader}>
        <div>
          <h3 className={style.heading}>PROJECTS</h3>
          <div className={style.divider}>&ensp;</div>
        </div>
        <ul className={style.workUl}>
        {formData?.resume?.projects.map((item, index) => (
            <li key={index}>
              <div className={style.work_des}>
                <h4 className={style.customerService}>{item?.title}</h4>
                <h5 className={style.company_name} style={{color:color2}}>
                  <span>{item?.link}</span> <span>  {item?.year}</span>
                </h5>
                <p>{item?.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      }
      
      </div>
    </div>
    </>

  );
};

export default Template_3;
