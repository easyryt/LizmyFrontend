import React, { useState,useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png"
import linkedin from "../../Images/linkedin.png"
import mail from "../../Images/mail.png"
import call from "../../Images/call.png"
import dp from "../../Images/dp2.jpg"
import { Divider } from "@mui/material";
import styles from "./Template_7.module.css";
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

const Template_7= () => {
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
.heading{
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
height: 5rem;
}
.summary h2{
border-top: 1px  rgb(112, 111, 111) solid;
border-bottom: 1px rgb(112, 111, 111) solid;
width: 90%;
}
.para{
width: 90%;

}
.summary {
display: flex;
align-items: center;
flex-direction: column;

}
.Experience{
display: flex;
align-items: center;
flex-direction: column;
}
.Experience h2{
border-top: 1px  rgb(112, 111, 111) solid;
border-bottom: 1px rgb(112, 111, 111) solid;
width: 90%;
}
.Experience ul{
width: 90%;
}
.ul {
display: grid;
grid-template-columns: 1fr 1fr;
gap:.5rem;
}
.Skills h2{
border-top: 1px  rgb(112, 111, 111) solid;
border-bottom: 1px rgb(112, 111, 111) solid;
width: 90%
}
.Skills {
display: flex;
align-items: center;
flex-direction: column;
}
.Skills ul{
width: 90%;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap:1rem;


}
.heading h1,p{
margin:0rem;
}
.ul{
margin-left:-1rem;
margin-top:-1rem;
}
.work_des h3,h5{
margin:0rem;
}
*{
  list-style: none;

}
.ul li{
  margin-left:-.5rem;

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
        <!-- Include any necessary stylesheets or meta tags here -->

    </head>
    
    <body>
        <div class="main">
            <div class="heading">
                <h1 style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;">${formData.resume.name}</h1>
                <p>${formData.resume.contact.email} | ${formData.resume.contact.phone}</p>
            </div>
            <div class="summary">
                <h2>Summary</h2>
                <p class="para">
                ${formData.resume.summary}
                </p>
            </div>
    
            ${formData.resume.projects.length > 0 ? 
            `<div class="Experience">
                <h2>Projects</h2>
                <ul class="ul">
                ${formData.resume.projects.map((item) => `
            <li>
            <div class="work_des">
                <h3 class="customerService">${item?.title}</h3>
                <h5 class="company_name"><span>${item?.link}</span> <span>${item?.year} </span></h5>
                <p>${item?.description}</p>
            </div>
        </li>
        `).join('')}       
                </ul>
            </div>`:""
            }
            ${formData.resume.education.length > 0 ?
            `<div class="Experience">
                <h2>Education</h2>
                <ul class="ul">
                ${formData.resume.education.map((item) => `
                <li>
                    <h5>${item.degree}</h5>
                    <p>${item.startYear} - ${item.endYear}</p>
                    <p>${item.collegeName}</p>
                </li>
            `).join('')}     
                </ul>
            </div>`:""
            }

            ${formData.resume.skillsAndLevel.length > 0 ?
            `<div class="Skills">
                <h2>Skills</h2>
                <ul class="ul">
                ${formData.resume.skillsAndLevel.map((item) => `
                <li >
                <span>${item.skills}</span>
                <ProgressBar bgcolor="orange" progress="40" height="5" />
            </li>
        `).join('')}
   
                </ul>
            </div>`:""
            }
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
      <div className={styles.heading}>
        <h1 style={{ fontFamily:fontStyle ,color:color,fontSize: fontSize }}>{formData.resume.name}</h1>
        <p>{formData.resume.contact.email} | {formData.resume.contact.phone}</p>
      </div>
      <div className={styles.summary}>
        <h2>Summary</h2>
        <p className={styles.para}>
          {formData.resume.summary}
        </p>
      </div>

{formData.resume.projects.length > 0 && 
      <div className={styles.Experience}>
        <h2>Projects</h2>
        <ul className={styles.ul}>
          {formData.resume.projects.map((item, index) => (
            <li key={index}>
              <div className={styles.work_des}>
                <h3 className={styles.customerService}>{item?.title}</h3>
                <h5 className={styles.company_name}><span>{item?.link}</span> <span>{item?.year}</span></h5>
                <p>{item?.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
}
{formData.resume.education.length > 0 &&
  <div className={styles.Experience}>
        <h2>Education</h2>
        <ul className={styles.ul}>
          {formData.resume.education.map((item, index) => (
            <li key={index}>
              <h5>{item.degree}</h5>
              <p>{item.startYear} - {item.endYear}</p>
              <p>{item.collegeName}</p>
            </li>
          ))}
        </ul>
      </div>
}
{formData.resume.skillsAndLevel.length > 0 &&
      <div className={styles.Skills}>
        <h2>Skills</h2>
        <ul className={styles.ul}>
        
            {formData.resume.skillsAndLevel.map((item, index) => (
              <li key={index}>
                <span>{item.skills}</span>
            
              </li>
            ))}
       
        </ul>
      </div>
}
    </div>
    
    </>

  );
};

export default Template_7;
