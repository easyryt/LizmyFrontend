import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import mail from "../../Images/mail.png"
import call from "../../Images/call.png"
import dp from "../../Images/dp2.jpg"
import { Divider } from "@mui/material";
import styles from "./Template_12.module.css";
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

const Template_12= () => {
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
      height: 1000px;
      background-color: white;
  }

  .container {
      display: grid;
      grid-template-columns: 2fr 1fr;
  }

  .img_box {
      height: 7rem;
      width: 7rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
  }

  .img_box img {
      height: 100%;
      width: 100%;
  }

  .left_section {
      display: flex;
      flex-direction: column;
      padding: 2rem 1rem;
      gap: 1rem; /* Reduced gap */
      text-align: left;
  }



  .education {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem; /* Reduced gap */
      padding: 1rem 1rem;
  }

  .img_container {
      display: flex;
      align-items: center;
      justify-content: center;
  }

  .right_section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
      padding: 0rem 1rem;
      height: 954px;
  }

  .right_section p {
      width: 95%!important;
      display: flex;
      flex-direction: column;
      text-align: left;
      list-style: none;
  }

  .right_section ul li {
      margin-left: 1.5rem;
  }

  .right_section ul li {
      width: 95%!important;
  }

  .work_history {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }

  .heading {
      background-color: aliceblue;
      padding: 3rem 1rem;
  }

  .certifications {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
  }

  .skills {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
  }

  .skills ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem; /* Reduced gap */
  }

  .professional_summary {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
  }

  .work {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
  }



  .info_box p {
      display: flex;
      gap: 0.25rem; /* Reduced gap */
      align-items: center;
  }

  .certifications ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem; /* Reduced gap */
  }

  .header {
      background-color: rgb(163, 163, 163);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem 1rem;
      height:5rem;
  }

  .section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem; /* Reduced gap */
  }

  .work_entry {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap:.5rem;
  }
  .work-info{
    margin:0;
    padding:0;
  }
  .work-info h4{
    margin:0;
  }

  .education {
      display: grid;
      grid-template-columns: 1fr 1fr;
  }

  .header h2,
  h5 {
      margin: 0;
  }
  .certi-li h4,h5,p{
    margin: 0;
  }
  .ul{
    margin-top:-1rem;
    display:grid;
    grid-template-columns: 1fr 1fr;
 
  }
  .exp-ul{
    margin-top:-1rem; 
  }
  .ul-certi{
    margin-top:-2rem;
    display:grid;
    grid-template-columns: 1fr 1fr;
  }
  .education-entry h4,h5,p{
    margin: 0;
  }
  .contact-entry h4,p{
    margin: 0;
  }
  .contact-info{
    display:flex;
    flex-direction:column;
    gap:.5rem;
  }
  .award-list h4,h5,p{
    margin: 0;
  }
  .ul-skill{
    margin-top:-1rem;
    margin-left:-2.5rem;
  }
  .ul-skill li{
    margin-left:-2.5rem;
  }
  *{
    list-style: none;
  }
  ul{
    margin-left:-2.5rem;
  }
  .ul-skill li{
         
    margin-left:0rem!important;
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
            <div class="header" style="background-color:${color}; color: ${color3}; ">
                <h2 class="name" style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;"> ${formData.resume.name}</h2>
                <h4  style="color: ${color3};" >${formData.resume.jobTitle}</h4>
            </div>
            <div class="container">
                <div class="left_section">
                    <div class="section">
                        <p class="section-content">
                        ${formData.resume.summary}
                        </p>
                    </div>
       
                    ${formData.resume.projects.length > 0 ?
                    `<div class="section">
                        <h3 class="section-title">Projects</h3>
                        <ul class="exp-ul">
                        ${formData.resume.projects.map((item) => `
                    <li>
                    <div class="work_entry">
                        <h5> ${item?.year} </h5>
                        <div class="work-info">
                            <h4 class="position">${item?.title}</h4>
                            <p class="company">${item?.link}</p>
                            <p class="description">
                            ${item?.description}
                            </p>
                        </div>
                    </div>
                </li>
                `).join('')}  
                        </ul>
                    </div>`  :""
                    }
                    ${formData.resume.education.length > 0 ?
                    `<div class="section">
                        <h3 class="section-title">Education</h3>
                        <ul class="ul">
                        ${formData.resume.education.map((item) => `
                        <li>
                        <div class="education-entry">
                            <h4 class="degree">${item.degree}</h4>
                            <p class="university">${item.collegeName}</p>
                            <p class="date">${item.startYear} - ${item.endYear}</p>
                        </div>
                    </li>
                    `).join('')}
                        </ul>
                    </div>` :""
                    }

                    ${formData.resume.certifications.length > 0 ?
                    `<div class="section">
                        <h3 class="section-title">Certification</h3>
                        <hr class="divider" />
                        <ul class="ul-certi">
                        ${formData.resume.certifications.map((item) => `
                        <li>
                        <div class="education-entry">
                            <h4 class="degree">${item?.title}</h4>
                            <p class="university">${item?.issuingOrganization }</p>
                            <p class="date">${item?.date}</p>
                        </div>
                    </li>
                    `).join('')}
                        </ul>
                    </div>` :""
                    }
                </div>
                <div class="right_section" style="background-color:${color2}; color: ${color3}; ">
                    <h4 class="section-title">Personal Info</h4>
                    <div class="contact-info">
                        <div class="contact-entry">
                            <h5 class="contact-label">Address</h5>
                            <p class="contact-value">  
                            ${formData.resume.address.address},
                            ${formData.resume.address.state },
                            ${formData.resume.address.postalCode }
                            </p>
                        </div>
                        <div class="contact-entry">
                            <h5 class="contact-label">Phone</h5>
                            <p class="contact-value">${formData.resume.contact.phone}</p>
                        </div>
                        <div class="contact-entry">
                            <h5 class="contact-label">E-mail</h5>
                            <p class="contact-value"> ${formData.resume.contact.email}</p>
                        </div>
                        <div class="contact-entry">
                            <h5 class="contact-label">LinkedIn</h5>
                            <p class="contact-value">${formData.resume.socialLinks.linkedin}</p>
                        </div>
                    </div>
                    ${formData.resume.skillsAndLevel.length > 0 ?
                    `<div class="section">
                        <h4 class="section-title">Skill</h4>
                        <ul class="ul-skill">
                        ${formData.resume.skillsAndLevel.map((item) => `
                        <li> ${item.skills}</li>
                        `).join('')}
                        </ul>
                    </div>`  :""
                    }
                    ${formData.resume.knownLanguages.length > 0 ?
                    `<div class="section">
                        <h4 class="section-title">Language</h4>
                        <ul class="ul-skill">
                        ${formData.resume.knownLanguages.map((item) => `
                         <li>
                         ${item?.lang}
                       </li>
                    `).join('')}
                            
                        </ul>
                    </div>` :""
                    }
                    ${formData.resume.awards.length > 0 ?
                    `<div class="section">
                        <h4 >Awards</h4>
                        <ul class="ul-skill">
                        ${formData.resume.awards.map((item) => `
                         <li class="award-list">
                                <h5>${item?.date}</h5>
                                <h4>${item?.title}</h4>
                                <p>${item?.issuingOrganization}</p>
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
      <div className={styles.header} style={{backgroundColor:color}}>
        <h2 className={styles.name} style={{ fontFamily:fontStyle ,color:color3,fontSize: fontSize }}>{formData.resume.name}</h2>
        <h5 className={styles.name} style={{color:color3}}>{formData.resume.jobTitle}</h5>
      </div>
      <div className={styles.container}>
        <div className={styles.left_section} >
          <div className={styles.section}>
            <p className={styles.section_content}>{formData.resume.summary}</p>
          </div>
   
{formData.resume.projects.length > 0 &&
          <div className={styles.section}>
            <h3 className={styles.section_title}>Projects</h3>
            <ul className={styles.exp_ul}>
              {formData.resume.projects.map((item, index) => (
                <li key={index} className={styles.work_entry}>
                  <h5> {item?.year}</h5>
                  <div className={styles.work_info}>
                    <h4 className={styles.position}>{item?.title}</h4>
                    <p className={styles.company}>{item?.link}</p>
                    <p className={styles.description}>{item?.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
}
{formData.resume.education.length > 0 &&
          <div className={styles.section}>
            <h3 className={styles.section_title}>Education</h3>
            <ul className={styles.ul}>
              {formData.resume.education.map((item, index) => (
                <li key={index} className={styles.education_entry}>
                  <h4 className={styles.degree}>{item.degree}</h4>
                  <p className={styles.university}>{item.collegeName}</p>
                  <p className={styles.date}>{item.startYear} - {item.endYear}</p>
                </li>
              ))}
            </ul>
          </div>
}
{formData.resume.certifications.length > 0 && 
          <div className={styles.section}>
            <h3 className={styles.section_title}>Certification</h3>
            <ul className={styles.ul_certi}>
              {formData.resume.certifications.map((item, index) => (
                <li key={index} className={styles.education_entry}>
                  <h4 className={styles.degree}>{item?.title}</h4>
                  <p className={styles.university}>{item?.issuingOrganization}</p>
                  <p className={styles.date}>{item?.date}</p>
                </li>
              ))}
            </ul>
          </div>
}
        </div>
        <div className={styles.right_section} style={{backgroundColor:color2,color:color3}}>
          <h4 className={styles.section_title}>Personal Info</h4>
          <div className={styles.contact_info}>
            <div className={styles.contact_entry}>
              <h5 className={styles.contact_label}>Address</h5>
              <p className={styles.contact_value}>
                {formData.resume.address.address},
                {formData.resume.address.state},
                {formData.resume.address.postalCode}
              </p>
            </div>
            <div className={styles.contact_entry}>
              <h5 className={styles.contact_label}>Phone</h5>
              <p className={styles.contact_value}>{formData.resume.contact.phone}</p>
            </div>
            <div className={styles.contact_entry}>
              <h5 className={styles.contact_label}>E-mail</h5>
              <p className={styles.contact_value}>{formData.resume.contact.email}</p>
            </div>
            <div className={styles.contact_entry}>
              <h5 className={styles.contact_label}>LinkedIn</h5>
              <p className={styles.contact_value}>{formData.resume.socialLinks.linkedin}</p>
            </div>
          </div>
          {formData.resume.skillsAndLevel.length > 0 &&
          <div className={styles.section}>
            <h4 className={styles.section_title}>Skill</h4>
            <ul className={styles.ul_skill}>
              {formData.resume.skillsAndLevel.map((item, index) => (
                <li key={index}>{item.skills}</li>
              ))}
            </ul>
          </div>
}
{formData.resume.knownLanguages.length > 0 && 
          <div className={styles.section}>
            <h4 className={styles.section_title}>Language</h4>
            <ul className={styles.ul_skill}>
              {formData.resume.knownLanguages.map((item, index) => (
                <li key={index}>{item?.lang}</li>
              ))}
            </ul>
          </div>
}
{formData.resume.awards.length > 0 &&
          <div className={styles.section}>
            <h4>Awards</h4>
            <ul className={styles.ul_skill}>
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
      </div>
    </div>
    </>

  );
};

export default Template_12;
