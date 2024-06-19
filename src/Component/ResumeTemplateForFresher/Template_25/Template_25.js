import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import { useRecoilState } from "recoil";
import styles from "./Template_25.module.css"
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

const Template_25 = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ checkAuth, setCheckAuth] = useRecoilState(authenticateduser);
  const navigate = useNavigate()

  useEffect(() => {
    const imageLocations = [
      location,
      linkedin,
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
    }

    .main {
      width: 850px;
      height: 1130px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #333;
      color: white;
      padding: 20px;
      text-align: center;
      height:8rem;
    }

    .name_box {
      text-align: center;
    }

    .name {
      color: white;
    }

    .container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      padding: 20px;
      // border:1px red solid;
    }
    .section {
      margin-bottom: 20px;
      // border:1px red solid;
    }

    .section_title {
      position: relative;
      font-size: 1.5em;
      margin-bottom: 10px;
    }

    .section_title span {
      font-size: 1.2em;
      margin-right: 5px;
    }

    .divider {
      border: 1px solid #333;
      margin: 5px 0;
    }

    .skills_list,
    .ul {
      list-style: none;
      padding: 0;
    }

    .skills_list li,
    .ul li {
      margin-bottom: 5px;
    }

    .ul .work_entry {
      margin-bottom: 10px;
    }

    .ul .title_ {
      display: flex;
      justify-content: space-between;
    }

    .ul .position,
    .ul .degree {
      margin: 0;
    }

    .university,
    .company,
    .date,
    .description {
      margin: 0;
    }

    .section-content {
      line-height: 1.6;
    }

    .contact_info,
    .work_entry,
    .contact_value {
  
      align-items: center;
    }

    .contact_label {
      margin-right: 10px;
      display: flex;
      align-items: center;
      gap: .5rem;
      padding:.5rem .5rem .5rem 0rem  ;
    }

    .contact-value {
      margin: 0;

    }
    .left_section{
      // border:1px red solid;
      width:30rem;
    }
    .img_box {
height:1rem;
width:1rem;
    }
    .img_box  img{
      height:1rem;
      width:1rem;
    }
    `
  }

  const getHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    </head>
    
    <body>
    
      <div class="main">
          <div class="header"  style="background-color:${color}; color: ${color3}; ">
             <div class="name_box">
                 <h1 class="name"  style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;">${formData.resume.name}</h1>
                       <h4 style="color: ${color3};"> ${formData.resume.jobTitle}</h4>
          </div>
        </div>
    
        <div class="container">
          <div class="left_section">
            <div class="section">
                <h3 class="section_title">
                    ABOUT
                </h3>
                <hr class="divider">
                <p class="section-content">
                ${formData.resume.summary}
                </p>
            </div>

            ${formData.resume.projects.length > 0 ?
              `<div class="section">
                   <h3 class="section_title">
                    PROJECTS
                    </h3>
                    <hr class="divider">
                      <ul class="ul">
                      ${formData.resume.projects.map((item) => `
                  
                  <li>
                  <div class="work_entry">
                      <div>
                          <div class="title_">
                              <h4 class="position">${item?.title}</h4>
                              <p class="date">${item?.year}</p>
                          </div>

                          <p class="company">${item?.link} </p>
                          <p class="description">
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
            `<div class="section">
                <h3 class="section_title">
                   EDUCATION
                </h3>
                <hr class="divider">
                <ul class="ul">
                ${formData.resume.education.map((item) => `

                <li>
                <div class="work_entry">
                    <p class="date">${item.startYear} - ${item.endYear}</p>
                    <div>
                        <h3 class="degree">${item.degree}</h3>
                        <p class="university">${item.collegeName}</p>
                    </div>
                </div>
            </li>
                `).join('')}
                  
                </ul>
            </div>` :""
            }
        </div>
        <div class="right_section">
  
        <div class="contact_info">
            <h3 class="section_title">CONTACT</h3>
            <hr class="divider">
            <div class="contact_value">
                <span class="contact_label">
                    <span style="font-size:20px">&#9990;</span>
                    <p class="contact-value">${formData.resume.contact.phone}</p>
                </span>
          
            </div>
            <div class="contact_value">
                <span class="contact_label">
                    <span style="font-size:20px">&#9993;</span>
                    <p class="contact-value">${formData.resume.contact.email}</p>
                </span>
              
            </div>
            <div class="contact_value">
                <span class="contact_label">
                <span style="font-size:20px"  class="img_box"><img src=${base64Image2} /></span>
                <p class="contact-value">${formData.resume.socialLinks.linkedin}</p>
                </span>
         
            </div>
            <div class="contact_value">
                <span class="contact_label">
                    <span style="font-size:20px"  class="img_box"><img src=${base64Image1} /></span>
                    <p class="contact-value">
                    ${formData.resume.address.address},
                    ${formData.resume.address.state },
                    ${formData.resume.address.postalCode }
                    </p>
                </span>
               
            </div>
        </div>

        ${formData.resume.skillsAndLevel.length > 0 ?
        `<div class="section">
            <h3 class="section_title">SKILLS</h3>
            <hr class="divider">
            <ul class="skills_list">
            ${formData.resume.skillsAndLevel.map((item) => `
            <li> ${item.skills}</li>
            `).join('')}
            </ul>
        </div>`:""
}
        <br>

        ${formData.resume.knownLanguages.length > 0 ?
        `<div class="section">
            <h3 class="section_title">LANGUAGE</h3>
            <hr class="divider">
            <ul class="skills_list">
            ${formData.resume.knownLanguages.map((item) => `
            <li>
            ${item?.lang}
          </li>
       `).join('')}
            </ul>
        </div>`:""
}
        <br>

        ${formData.resume.awards.length > 0 ?
        `<div class="section">
            <h3 class="section_title">AWARDS</h3>
            <hr class="divider">
            <ul class="skills_list">
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
      <div className={styles.name_box}>
        <h1 className={styles.name} style={{ fontWeight: 100 ,fontFamily:fontStyle ,color:color3,fontSize: fontSize }}>{formData.resume.name}</h1>
        <h4 style={{color:color3}}>{formData.resume.jobTitle}</h4>
      </div>
    </div>

    <div className={styles.container}>
      <div className={styles.left_section}>
        <div className={styles.section}>
          <h3 className={styles.section_title}>ABOUT</h3>
          <hr className={styles.divider} />
          <p className={styles.section_content}>{formData.resume.summary}</p>
        </div>


{formData.resume.projects.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>PROJECTS</h3>
          <hr className={styles.divider} />
          <ul className={styles.ul}>
            {formData.resume.projects.map((item, index) => (
              <li key={index}>
                <div className={styles.work_entry}>
                  <div>
                    <div className={styles.title_}>
                      <h4 className={styles.position}>{item?.title}</h4>
                      <p className={styles.date}>{item?.year}</p>
                    </div>

                    <p className={styles.company_name}>{item?.link} </p>
                    <p className={styles.description}>{item?.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
}
{formData.resume.education.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>EDUCATION</h3>
          <hr className={styles.divider} />
          <ul className={styles.ul}>
            {formData.resume.education.map((item, index) => (
              <li key={index}>
                <div className={styles.work_entry}>
                  <p className={styles.date}>
                    {item.startYear} - {item.endYear}
                  </p>
                  <div>
                    <h3 className={styles.degree}>{item.degree}</h3>
                    <p className={styles.university}>{item.collegeName}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
}
      </div>
      <div className={styles.right_section}>
        <div className={styles.contact_Info}>
          <h3 className={styles.section_title}>CONTACT</h3>
          <hr className={styles.divider} />
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }}>&#9990;</span>
              <p className={styles.contact_value}>{formData.resume.contact.phone}</p>
            </span>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }}>&#9993;</span>
              <p className={styles.contact_value}>{formData.resume.contact.email}</p>
            </span>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.img_box}>
                <img src={base64Image2} alt="LinkedIn" />
              </span>
              <p className={styles.contact_value}>{formData.resume.socialLinks.linkedin}</p>
            </span>
          </div>
          <div className={styles.contact_value}>
            <span className={styles.contact_label}>
              <span style={{ fontSize: '20px' }} className={styles.img_box}>
                <img src={base64Image1} alt="Address" />
              </span>
              <p className={styles.contactValue}>
                {formData.resume.address.address},
                {formData.resume.address.state},
                {formData.resume.address.postalCode}
              </p>
            </span>
          </div>
        </div>

        {formData.resume.skillsAndLevel.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>SKILLS</h3>
          <hr className={styles.divider} />
          <ul className={styles.skills_list}>
            {formData.resume.skillsAndLevel.map((item, index) => (
              <li key={index}> {item.skills}</li>
            ))}
          </ul>
        </div>
}
        <br />

        {formData.resume.knownLanguages.length > 0 &&
        <div className={styles.section}>
          <h3 className={styles.section_title}>LANGUAGE</h3>
          <hr className={styles.divider} />
          <ul className={styles.skills_list}>
            {formData.resume.knownLanguages.map((item, index) => (
              <li key={index}>{item?.lang}</li>
            ))}
          </ul>
        </div>
    }
        <br />
        {formData.resume.awards.length > 0 && 
        <div className={styles.section}>
          <h3 className={styles.section_title}>AWARDS</h3>
          <hr className={styles.divider} />
          <ul className={styles.skills_list}>
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

export default Template_25;
