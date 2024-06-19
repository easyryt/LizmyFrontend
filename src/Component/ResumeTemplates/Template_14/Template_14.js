import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import mail from "../../Images/mail.png"
import call from "../../Images/call.png"
import dp from "../../Images/dp2.jpg"
import { Divider } from "@mui/material";
import styles from "./Template_14.module.css";
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



const Template_14 = () => {
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
         width: 794px ;
         height: 1000px;
        
    }

    .main {
    
      background-color: white;
      
    }

        .container{
          display: grid;
          grid-template-columns: 1fr 2fr;
       }
       .img_box{
          height: 10rem;
          width: 10rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-left: 4rem;
       }
       .profession_box{
           position: absolute;
           bottom: 61%;
           background-color: white;
           border: 1px black solid;
           padding: .2rem;
       
       }
       .img_box img{
          height: 100%;
          width: 100%;
       
       }
       .left_section{
          display: flex;
          flex-direction: column;
          padding: .5rem 2rem;
       
          text-align: left;
       
       }
       
       .info_box{
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 1rem;
       }
       .education{
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 1rem;
       }
       .img_container{
          display: flex;
          align-items: center;
          justify-content: center;
       }
       .right_section{
          display: flex;
          flex-direction: column;
          gap: .2rem;
         border-right: 1px black solid;
         width: 18rem;
         margin-top: 1rem;
       }
       .right_section p{
          width: 95%!important;
          display: flex;
          flex-direction: column;
          text-align: left;
          list-style: none;
       }
       .right_section ul li{
          margin-left:1.5rem ;
         
       }
       .right_section ul li {
          width: 95%!important;
       }
       .work_history{
          display: flex;
          flex-direction: column;
          gap: 1rem;
       }
       .user_header{
       
         padding:  0!important;
         display: grid;
         grid-template-columns: 1fr 2fr;
     
     
       }
       
       .certifications{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
       }
  
       .professional_summary{
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: .5rem;
       }
       .work{
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: .5rem;
       }
       hr{
          margin-left: 1rem;
       }
       .info_box p{
          display: flex;
          gap: .5rem;
          align-items: center;
       }
       .certifications ul{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
       }
       .header{
       
          height: 8rem;
          display: flex;
        align-items: center;
          justify-content: space-between;
          padding: 0rem 1rem;
       }
       .img_box{
           border-radius: 50%;
           margin-right: 4rem;
       }
       .section{
          display: flex;
          flex-direction: column;
          gap: .5rem;
          border-bottom: 1px rgb(0, 0, 0) solid;
          padding: 0rem 1rem;
     

       }
       .work_entry{
          display: grid;
          grid-template-columns: 1fr 3fr;
          place-items: baseline;
    
       
       }
       .edu_entry{
         margin-left: 1rem;
         padding-top:.5rem ;
       }
       .ul{
           display: flex;
           flex-direction: column;
           gap: .5rem;
       }
       .section_title{
          margin-left: -1rem;
     
       }
       .description{
           width: 25rem;
       }
       .contact_value{
           display: flex;
           align-items: center;
           gap:.2rem;
       }
       
       .contact_label{
           font-size: small;
          
           margin:0rem;
       }
       .contact_label span,p{
    
        margin:0rem;
       }
       .contact_info{
         display: flex;
         flex-direction: column;
         gap: .5rem;
         border-bottom: 1px rgb(0, 0, 0) solid;
         padding: .2rem 1rem;
         margin:0rem;
       }
       .skills_list{
       display: flex;
       flex-direction: column;
     
       }
  
      
       .name_box{
           width: 100%;
           height: 15rem;
           padding: 1rem;
           border-bottom: 1px black solid;
           margin: 0rem 1rem;
       }
       .image_box{
           display: flex;
           align-items: center;
           justify-content: center;
          border-right:1px black solid ;
          border-bottom:1px black solid ;
          border-radius: 10px 0px 10px 0px;
        
       }
        .icon {
            height: 1rem;
            width: 1rem;
            margin:.2rem;
        }

        .icon img {
            height: 1rem;
            width: 1rem;
        }
  
        .ul li{
          list-style: circle;
        }
        .award_section{
     
          padding-left:.5rem;
        }
        .skills_section{
          padding: 0rem 1rem;
     
          margin-top:-1rem;
        }
        .skills_section ul{
     
          margin-top:-1rem;
          margin-left:-2.6rem;
        }
        .award_section h4,h5,p{
         margin:0rem;
        }
        .award_section ul{
          margin-left:-2.6rem;
          margin-top:-1rem;
        }
        .ul{
          margin-top:-2rem;
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
        <title>Your Resume</title>

    </head>
    
    <body>
        <div class="main">
            <div class="user_header">
                <div class="image_box">
                    <div class="img_box" style="height: ${imgSize}px; width: ${imgSize}px;">
                        <!-- Replace with actual base64 encoded image -->
                        <img src=${base64Image3} alt="demo_dp" />
                    </div>
                 
                </div>
                <div class="name_box">
                    <h1 class="name" style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;">${formData.resume.name}</h1>
                    <h5 class="name" style="color: ${color3};" >${formData.resume.jobTitle}</h5>
                    <p class="section-content">
                    ${formData.resume.summary}
                    </p>
                </div>
            </div>
            <div class="container">
                <div class="right_section">
                    <div class="contact_info">
               
                        <div class="contact_value">
                            <span class="contact_label">
                                <span style="font-size:20px" class="icon">
                                    <img src=${base64Image5} />
                                </span>
                            </span>
                            <p class="contact-value">${formData.resume.contact.phone}</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <span style="font-size:20px" class="icon">
                                    <img src=${base64Image4} />
                                </span>
                            </span>
                            <p class="contact-value">${formData.resume.contact.email}</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <span style="font-size:20px" class="icon">
                                    <img src=${base64Image2} />
                                </span>
                            </span>
                            <p class="contact-value">${formData.resume.socialLinks.linkedin}</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <span style="font-size:20px" class="icon">
                                    <img src=${base64Image1} />
                                </span>
                            </span>
                            <p class="contact-value">  
                             ${formData.resume.address.address},
                            ${formData.resume.address.state },
                            ${formData.resume.address.postalCode }
                            </p>
                        </div>
                    </div>
                    <br />
                    ${formData.resume.skillsAndLevel.length > 0 ? 
                    `<div class="skills_section">
                        <h3 class="section-title">SKILLS</h3>
                        <ul class="skills_list">
                        ${formData.resume.skillsAndLevel.map((item) => `
                        <li> ${item.skills}</li>
                        `).join('')}
                        </ul>
                    </div>`:""
                    }
                    ${formData.resume.knownLanguages.length > 0 ?
                    `<div class="skills_section">
                        <h3 class="section-title">LANGUAGE</h3>
                        <ul class="skills_list">
                        ${formData.resume.knownLanguages.map((item) => `
                        <li>
                        ${item?.lang}
                      </li>
                   `).join('')}
                        </ul>
                    </div>`:""
                    }
                    ${formData.resume.awards.length > 0 ?
                    `<div class="award_section">
                        <h3 class="award">AWARDS</h3>
                        <ul>
                        ${formData.resume.awards.map((item) => `
                         <li class="award-list">
                                <h5>${item?.date}</h5>
                                <h4>${item?.title}</h4>
                                <p>${item?.issuingOrganization}</p>
                            </li>
                    `).join('')} 
                        </ul>
                    </div>` :""
                    }
                </div>
    
                <div class="left_section">
                ${formData.resume.work.length > 0 ?
                    `<div class="section">
                        <h3 class="section_title">PROFESSIONAL EXPERIENCE</h3>
                        <ul class="ul" style="margin-left:-20px">
                        ${formData.resume.work.map((item) => `
                    <li>
                    <div class="work_entry">
                        <h5 class="date">${formatDate(item?.startDate)} - ${formatDate(item?.endDate)} </h5>
                        <div>
                            <h4 class="degree">${item?.title}</h4>
                            <p class="university">${item?.company} - ${item?.location}</p>
                            <p>
                            ${item?.description}
                            </p>
                        </div>
                    </div>
                </li>
                    `).join('')}  

                    </ul>
                        
                    </div>`:""
                }
                ${formData.resume.projects.length > 0 ?
                    `<div class="section">
                        <h3 class="section_title">PROJECTS</h3>
                        <ul class="ul" style="margin-left:-20px">
                        ${formData.resume.projects.map((item) => `
                    <li>
                    <div class="work_entry">
                        <h5 class="date">${item?.year} </h5>
                        <div>
                            <h4 class="degree">${item?.title}</h4>
                            <p class="university">${item?.link}</p>
                            <p>
                            ${item?.description}
                            </p>
                        </div>
                    </div>
                </li>
                    `).join('')}  

                    </ul>
                        
                    </div>` :""
                }

                ${formData.resume.education.length > 0 ?
                    `<div class="sections">
                        <h3>EDUCATION</h3>
                        <ul class="ul">
                        ${formData.resume.education.map((item) => `
                    <li>
                    <div class="work_entry">
                        <h5 class="date">${item.startYear} - ${item.endYear}</h5>
                        <div>
                            <h4 class="degree">${item.degree}</h4>
                            <p class="university">${item.collegeName}</p>
                        </div>
                    </div>
                </li>
                    `).join('')}
                        </ul>
                    </div>`:""
                }
                </div>
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
      <div className={styles.overlay}>
        <div className={styles.modal}>
  

       {loading ?   
       <div  className={styles.down_img_box}>
           <img src={downloadimg } alt="downloading" />
           {error && <p style={{ color: "red" }}>{error}</p>}
       </div>
       :
       <div className={styles.download_box}>
       <button className={styles.closeButton} onClick={onClose}>Close
       </button>
       <div  className={styles.down_btn_box}>
       <div  onClick={handleResume} className={styles.icon_download}><img src={downloadpdf } alt="pdf"/>PDF</div>
        <div  onClick={handleDownloadDoc} className={styles.icon_download}><img src={downloaddoc } alt="doc"/> DOC</div>
         <div  onClick={handleDownloadTxt} className={styles.icon_download}><img src={downloadtext } alt="text"/>TEXT</div>
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
             <div className={styles.download_btn} >
    <button onClick={handleDownloadClick}>Download</button>
      <ResumeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>


    <div className={styles.main}>
    <div className={styles.user_header}>
      <div className={styles.image_box} >
        <div className={styles.img_box} style={{ height: imgSize, width: imgSize }}>
          {/* Replace with actual base64 encoded image */}
          <img src={base64Image3} alt="demo_dp" />
        </div>
      </div>
      <div className={styles.name_box}>
        <h1 className={styles.name} style={{ fontFamily:fontStyle ,color:color3,fontSize: fontSize  }}>{formData.resume.name}</h1>
        <h5 className={styles.name} style={{color:color3}}>{formData.resume.jobTitle}</h5>
        <p className={styles.section_content}>{formData.resume.summary}</p>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.right_section}>
        <div className={styles.contact_info}>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.icon}>
                {/* Replace with actual base64 encoded image */}
                <img src={base64Image5} alt="Phone" />
              </span>
            </span>
            <p className={styles.contact_value}>{formData.resume.contact.phone}</p>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.icon}>
                {/* Replace with actual base64 encoded image */}
                <img src={base64Image4} alt="Email" />
              </span>
            </span>
            <p className={styles.contact_value}>{formData.resume.contact.email}</p>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.icon}>
                {/* Replace with actual base64 encoded image */}
                <img src={base64Image2} alt="LinkedIn" />
              </span>
            </span>
            <p className={styles.contact_value}>{formData.resume.socialLinks.linkedin}</p>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.icon}>
                {/* Replace with actual base64 encoded image */}
                <img src={base64Image1} alt="Address" />
              </span>
            </span>
            <p className={styles.contact_value}>
              {formData.resume.address.address},
              {formData.resume.address.state},
              {formData.resume.address.postalCode}
            </p>
          </div>
        </div>
        <br />
        {formData.resume.skillsAndLevel.length > 0 &&
        <div className={styles.skills_section}>
          <h3 className={styles.section_title}>SKILLS</h3>
          <ul className={styles.skills_list}>
            {formData.resume.skillsAndLevel.map((item, index) => (
              <li key={index}>{item.skills}</li>
            ))}
          </ul>
        </div>
}
{formData.resume.knownLanguages.length > 0 &&
        <div className={styles.skills_section}>
          <h3 className={styles.section_title}>LANGUAGE</h3>
          <ul className={styles.skills_list}>
            {formData.resume.knownLanguages.map((item, index) => (
              <li key={index}>{item?.lang}</li>
            ))}
          </ul>
        </div>
}
{formData.resume.awards.length > 0 &&
        <div className={styles.award_section}>
          <h3 className={styles.award}>AWARDS</h3>
          <ul>
            {formData.resume.awards.map((item, index) => (
              <li key={index} className={styles.award_list}>
                <h5>{item?.date}</h5>
                <h4>{item?.title}</h4>
                <p>{item?.issuingOrganization}</p>
              </li>
            ))}
          </ul>
        </div>
}
      </div>

      <div className={styles.left_section}>
      {formData.resume.work.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>PROFESSIONAL EXPERIENCE</h3>
          <ul className={styles.ul}>
            {formData.resume.work.map((item, index) => (
              <li key={index} className={styles.work_entry}>
                <h5 className={styles.date}>        {formatDate(item?.startDate)} - {formatDate(item?.endDate)}</h5>
                <div>
                  <h4 className={styles.degree}>{item?.title}</h4>
                  <p className={styles.university}>{item?.company} - {item?.location}</p>
                  <p>{item?.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
}
{formData.resume.projects.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>PROJECTS</h3>
          <ul className={styles.ul}>
            {formData.resume.projects.map((item, index) => (
              <li key={index} className={styles.work_entry}>
                <h5 className={styles.date}>        {item?.year}</h5>
                <div>
                  <h4 className={styles.degree}>{item?.title}</h4>
                  <p className={styles.university}>{item?.link}</p>
                  <p>{item?.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
}
{formData.resume.education.length > 0 &&
        <div className={styles.sections}>
          <h3>EDUCATION</h3>
          <ul className={styles.ul}>
            {formData.resume.education.map((item, index) => (
              <li key={index} className={styles.work_entry}>
                <h5 className={styles.date}>{item.startYear} - {item.endYear}</h5>
                <div>
                  <h4 className={styles.degree}>{item.degree}</h4>
                  <p className={styles.university}>{item.collegeName}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
}
      </div>
    </div>
  </div>
    
    </>
   
  );
};

export default Template_14;
