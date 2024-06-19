import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import mail from "../../Images/mail.png"
import call from "../../Images/call.png"
import dp from "../../Images/dp2.jpg"
import { Divider } from "@mui/material";
import style from "./Template_2.module.css";
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


const PDFRenderer = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const Template_2= () => {
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
      dp,
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
gap: 1rem;
height: 1100px;
}

.name_container{
display: flex;
flex-direction: column;
gap: 1rem;
padding: 1.5rem;
background-color: #c2c3c4;
height: 14rem;
}
.container {
padding: 13px 0 0 0;
}

.name {
color: white;
}

.hr {
margin-left: 2px;
margin-right: 30px;
color: #A2A2A2;
margin-top:-1rem;
}

.iconContainer {
width: 20px;
height: 20px;
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

}
.skillsHeader {
padding: 0rem 1.5rem;
}


.skillsHeader ul{
margin-left: -1.2rem;


}

.skillsHeader2 ul{
margin-left: -1.5rem;
}
.professionalSkillsHeader ul{
margin-left: 1.5rem;
}

.info_box{
display: flex;
flex-direction: column;
gap:.5rem;
}

.educationHeader{
padding: 1.5rem;
}
.objectiveHeader{
padding: 1rem;
height: max-content;
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
}
.professionalSkillsHeader{
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
gap: .5rem;
}
.work_history{
list-style: none;
padding: 0rem 1rem;
}
.Projects{
list-style: none;
padding: 0rem 1rem;
}
.project_title{
display:flex ;
justify-content: space-between;
}
.contactInfo p{
  margin:0rem;
}
.edu-ul h4,p{
margin:0rem; 
}
.work-ul li h4,p{
margin:0rem; 
} 
.work-ul {
  margin:-1rem;
  flex-direction: column;
  display: flex;
  gap:.5rem;
}
.edu-ul{
    flex-direction: column;
    display: flex;
    gap:.5rem;
}
.Projects-ul li h4,p{
margin:0rem; 
}

.Projects-ul{
  margin-top:-1rem;
  flex-direction: column;
  display: flex;
  gap:.5rem;
}
.icon{
height:1rem;
width:1rem;

}
ul{
  list-style: none;
  margin-left: -2.3rem!important;
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
    <link rel="stylesheet" href="styles.css"> <!-- You may link your stylesheet if you have one -->

    <title>Your Page Title</title>
</head>

<body>
    <div class="main">
        <div class="Left_container" style="background-color:${color}; color:${color3};">
            <div class="name_container" style="background-color:${color2}; color:white;">
                <h1 class="name" style="color: white; font-family: ${fontStyle}; font-size:${fontSize}px;">
                ${formData.resume.name}
                </h1>
                <hr class="hr" style=" color:white;" />
                <div class="info_box">
                    <div class="contactInfo">
                    <div class="iconContainer" style="color: black;">
                    <img class="icon" src=${base64Image4} alt="dp" />
                    </div>
                        <p class="email">
                        ${formData.resume.contact.email}
                        </p>
                    </div>
                    <div class="contactInfo">
                    <div class="iconContainer" style="color: black;">
                    <img class="icon" src=${base64Image5} alt="dp" />
                    </div>
                        <p class="email">
                        ${formData.resume.contact.phone}
                        </p>
                    </div>
                    <div class="contactInfo">
                    <div class="iconContainer" style="color: black;">
                    <img class="icon" src=${base64Image1} alt="dp" />
                    </div>
                        <p class="email">
                        ${formData.resume.address.address},
                        ${formData.resume.address.state },
                        ${formData.resume.address.postalCode },
                        </p>
                    </div>
                </div>
            </div>

            ${formData.resume.skillsAndLevel.length > 0 ? 
            `<div class="skillsHeader">
                <h3>SKILLS</h3>
                <ul>
                ${formData.resume.skillsAndLevel.map((item) => `
                <li>
               ${item.skills }
                </li>
      
        `).join('')}
                   
                </ul>
            </div>`:""
            }
            ${formData.resume.knownLanguages.length > 0 ?
            `<div class="skillsHeader">
                <h3>SKILLS</h3>
                <ul>
                ${formData.resume.knownLanguages.map((item) => `
                <li>
               ${item.lang }
                 </li>
        `).join('')}      
                </ul>
            </div>`:""
            }
            ${formData.resume.education.length >0 ?
            `<div class="educationHeader">
                <h3>EDUCATION</h3>
                ${formData.resume.education.map((item) => `
                <div class="edu-ul">
                <h4>${item.collegeName}</h4>
                <p>${item.degree}</p>
                <p>${item.startYear} - ${item.endYear}</p>
                </div>
            `).join('')}
            </div>`:""
            }
        </div>
        <div>
            <div class="objectiveHeader" style="background-color: ${color}">
                <h3 style="color: ${color3}">CAREER OBJECTIVE</h3>
                <p class="objectiveText"  style="color: ${color3}">
                ${formData.resume.summary}
                </p>
            </div>
   
            ${formData.resume.projects.length > 0 ? 
            `<div class="workHeader">
                <h3>Projects</h3>
                <ul class="Projects-ul">
                ${formData.resume.projects.map((item) => `
                <li>
                <h4 class="project_title">
                <span>${item?.title}</span> <span>${item?.year}</span>
            </h4>
            <p>${item?.link}</p>
            <p>${item?.description}</p>
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
         <div  onClick={handleDownloadTxt } className={style.icon_download}><img src={downloadtext } alt="text"/>TEXT</div>
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
      <div className={style.Left_container} style={{ backgroundColor: color, color: color3 }}>
        <div className={style.name_container} style={{ backgroundColor: color2, color: "white" }} >
          <h1 className={style.name} style={{ color: "white", fontFamily: fontStyle ,fontSize: fontSize}} >{formData.resume.name}</h1>
          <hr  style={{borderColor: "white", borderWidth: "1px"}} />
          <div className={style.info_box}>
            <div className={style.contactInfo}>
              <div className={style.iconContainer} style={{ color: "black" }}>
                <img className={style.icon} src={base64Image4} alt="dp" />
              </div>
              <p className={style.email}>{formData.resume.contact.email}</p>
            </div>
            <div className={style.contactInfo}>
              <div className={style.iconContainer} style={{ color: "black" }}>
                <img className={style.icon} src={base64Image5} alt="dp" />
              </div>
              <p className={style.email}>{formData.resume.contact.phone}</p>
            </div>
            <div className={style.contactInfo}>
              <div className={style.iconContainer} style={{ color: "black" }}>
                <img className={style.icon} src={base64Image1} alt="dp" />
              </div>
              <p className={style.email}>{formData.resume.address.address}, {formData.resume.address.state}, {formData.resume.address.postalCode}</p>
            </div>
          </div>
        </div>
        {formData.resume.skillsAndLevel.length > 0 &&
               <div className={style.skillsHeader}>
               <h3>SKILLS</h3>
               <ul>
                 {formData.resume.skillsAndLevel.map((item) => (
                   <li key={item.skills}>{item.skills}</li>
                 ))}
               </ul>
             </div>
        }
        {formData.resume.knownLanguages.length > 0 && 
           <div className={style.skillsHeader}>
           <h3>LANGUAGES</h3>
           <ul>
             {formData.resume.knownLanguages.map((item) => (
               <li key={item.skills}>{item.lang}</li>
             ))}
           </ul>
         </div>
        }
         {formData.resume.education.length > 0 && 
           <div className={style.educationHeader}>
           <h3>EDUCATION</h3>
           {formData.resume.education.map((item) => (
             <div key={item.collegeName} className={style.edu_ul}>
               <h4>{item.collegeName}</h4>
               <p>{item.degree}</p>
               <p>{item.startYear} - {item.endYear}</p>
             </div>
           ))}
         </div>
         }
      
      </div>
      <div>
        <div className={style.objectiveHeader} style={{ backgroundColor: color }}>
          <h3 style={{color:color3}}>CAREER OBJECTIVE</h3>
          <p className={style.objectiveText} style={{color:color3}}>{formData.resume.summary}</p>
        </div>
       
         {formData.resume.projects.length > 0 && 
                 <div className={style.workHeader}>
                 <h3>Projects</h3>
                 <ul className={style.Projects_ul}>
                   {formData.resume.projects.map((item) => (
                     <li key={item.title}>
                       <h4 className={style.project_title}>
                         <span>{item.title}</span> <span>{item.year}</span>
                       </h4>
                       <p>{item.link}</p>
                       <p>{item.description}</p>
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

export default Template_2;
