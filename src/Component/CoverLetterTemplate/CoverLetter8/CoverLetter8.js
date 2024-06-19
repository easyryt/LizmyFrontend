import React, { useState, useEffect } from "react";
import axios from "axios";
import location from "../../Images/location-pin.png";
import linkedin from "../../Images/linkedin.png";
import mail from "../../Images/mail.png";
import call from "../../Images/call.png";
import dp from "../../Images/dp2.jpg";
import { Divider } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { authenticateduser, jobApplicationState } from "../../../Recoil";
import styles from "./CoverLetter8.module.css";
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
} from "../../../Recoil";
import downloadimg from "../../Images/download.gif";
import downloadpdf from "../../Images/pdf-download-2617.svg";
import downloaddoc from "../../Images/google-docs-icon-2.svg";
import downloadtext from "../../Images/icons8-text-500.svg";
import Fonts from "../../Fonts/Fonts";
import FontPicker from "../../FontPicker/FontPicker";
import FontSizePicker from "../../FontSizePicker/FontSizePicker";
import ColorPlate from "../../ColorPlate/ColorPlate";
import ColorPlate2 from "../../ColorPlate2/ColorPlate2";
import CoverLetterModal from "../../CoverLetterModal/CoverLetterModal";
import GridOnIcon from '@mui/icons-material/GridOn';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";

const CoverLetter8 = () => {
  const [color, setColor] = useRecoilState(ChooseColor);
  const [color2, setColor2] = useRecoilState(ChooseColorSecond);
  const [color3, setColor3] = useRecoilState(ChooseColorThird);
  const [fontStyle, setFontStyle] = useRecoilState(fontState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [imgSize, setImgSize] = useRecoilState(imageSizeState);
  const [templateNo, setTemplateNo] = useRecoilState(chooseTemplates);
  const [croppedImage, setCroppedImage] = useRecoilState(croppedImageState);
  const [formData, setFormData] = useRecoilState(jobApplicationState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [base64Image1, setBase64Image1] = useState("");
  const [base64Image2, setBase64Image2] = useState("");
  const [base64Image3, setBase64Image3] = useState("");
  const [base64Image4, setBase64Image4] = useState("");
  const [base64Image5, setBase64Image5] = useState("");
  const [base64Image6, setBase64Image6] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ checkAuth, setCheckAuth] = useRecoilState(authenticateduser);
  const navigate = useNavigate()

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };




  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

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
          } else if (index === 2) {
            setBase64Image3(base64String);
          } else if (index === 3) {
            setBase64Image4(base64String);
          } else if (index === 4) {
            setBase64Image5(base64String);
          } else if (index === 5) {
            setBase64Image6(base64String);
          }
        });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    handleImageChange();
  }, []);

  const getCSS = () => {
    return `

    body {
      margin: 0;
      padding: 0;
      font-family: 'Readex Pro', sans-serif;
      width: 850px;
      height: 1100px;
    }
    .main{
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      overflow: hidden;
  }
  .heading{
      display: flex;
       justify-content: space-between;
  }
  .section_1 p{
      text-transform: uppercase;
  }
  .section_2,.section_3{
      display: flex;
      flex-direction: column;
      padding: 1rem;
  }
  .section_1{
    padding: 1rem;
  }
  .name_box{
      background-color: aliceblue;
      width: 50%;
    height: 6rem;
    padding: 1rem;
  }
  .contact_box{
      width: 50%;
      height: 6rem;
      padding: 1rem;
      display: flex;
     flex-direction: flex-end;
     justify-content: end;
  
  }
  .contact_box div{
  
      width: max-content;
  }
    `;
  };

  const getHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Title</title>
  
    </head>
    <body>
    <div class="main">
    <div class="heading">
        <div class="name_box" style="background-color:${color}; color:${color3};">
            <h1 style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;">
            ${formData.nameAndContact.firstName} ${formData.nameAndContact.lastName}
            </h1>
            <p style="color: ${color3}; ">${formData.nameAndContact.profession} </p>
        </div>
        <div class="contact_box">
            <div>
                <p>  ${formData.nameAndContact.email}</p> 
                <p> ${formData.nameAndContact.state}, ${formData.nameAndContact.city}, ${formData.nameAndContact.zip} </p> 
                <p> ${formData.nameAndContact.phoneNumber}</p> 
           
            </div>
        </div>
    </div>

    <div class="section_1">
      
        <p>${formatDate(formData.date)}</p>
  
        <p>
        ${formData.recipient.firstName} ${formData.recipient.lastName}
        </p>
        <p>${formData.recipient.companyName}</p>
        <p>
        ${formData.recipient.city},${formData.recipient.state},
        ${formData.recipient.zip}
      </p>
      <p> ${formData.recipient.email}</p>
      <p> ${formData.recipient.phoneNumber}</p>
    </div>

    <section class="section_2">
        <p>${formData.subject}</p>
        <br />
        <p>${formData.greeting},</p>
        <p>${formData.opening}</p>
        <p>${formData.letterBody}</p>
        <p>${formData.callToAction}</p>
        <p>${formData.closing}</p>
    
    </section>
    <section class="section_3">
        <p>${formData.signature}</p>
    </section>
</div>


    </body>
    </html>
    
    `;
  };

  const handleResume = async () => {
   localStorage.setItem("submit",false)
    localStorage.setItem("coverletter",true)
    // localStorage.setItem("pendingData",JSON.stringify(formData) )
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
   localStorage.setItem("submit",false)
    localStorage.setItem("coverletter",true)
    // localStorage.setItem("pendingData",JSON.stringify(formData) )
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
   localStorage.setItem("submit",false)
    localStorage.setItem("coverletter",true)
    // localStorage.setItem("pendingData",JSON.stringify(formData) )
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
          {loading ? (
            <div className={styles.down_img_box}>
              <img src={downloadimg} alt="downloading" />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          ) : (
            <div className={styles.download_box}>
              <button className={styles.closeButton} onClick={onClose}>
                Close
              </button>
              <div className={styles.down_btn_box}>
                <div onClick={handleResume} className={styles.icon_download}>
                  <img src={downloadpdf} alt="pdf" />
                  PDF
                </div>
                <div onClick={handleDownloadDoc} className={styles.icon_download}>
                  <img src={downloaddoc} alt="doc" /> DOC
                </div>
                <div onClick={handleDownloadTxt } className={styles.icon_download}>
                  <img src={downloadtext} alt="text" />
                  TEXT
                </div>
              </div>
            </div>
          )}
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
      <div className={styles.download_btn}>
      <p className={styles.grid_icon} onClick={handleDownloadClick}><DownloadForOfflineIcon/></p>
        <FontPicker />
        <FontSizePicker />
        <ColorPlate2 />
        <ResumeModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <div>
      <p className={styles.grid_icon} onClick={openModal}><GridOnIcon/></p>
      <CoverLetterModal showModal={showModal} closeModal={closeModal} />
    </div>
      </div>

      <br />
      <br />
      <br />

      {/* coverletter  Templates */}

      <div className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.name_box} style={{backgroundColor:color,color:color3}}>
          <h1 style={{ color: color3, fontFamily: fontStyle ,fontSize: fontSize}}>
            {formData.nameAndContact.firstName}
            {formData.nameAndContact.lastName}
          </h1>
          <p style={{color:color3}}> {formData.nameAndContact.profession}</p>
        </div>
        <div className={styles.contact_box}>
 <div>
          <p> {formData.nameAndContact.email}</p>
          <p> {formData.nameAndContact.phoneNumber}</p>
          <p>
            {formData.nameAndContact.city},{formData.nameAndContact.state},
            {formData.nameAndContact.zip}
          </p>
          </div>
        </div>
      </div>

      <div className={styles.section_1}>
        <br />
        <p>{formData.date}</p>
        <br />
        <p>
          {formData.recipient.firstName} {formData.recipient.lastName}
        </p>
        <p> {formData.recipient.companyName}</p>
        <p>
          {formData.recipient.city},{formData.recipient.state},
          {formData.recipient.zip}
        </p>
        <p> {formData.recipient.email}</p>
        <p> {formData.recipient.phoneNumber}</p>
      </div>

      <section className={styles.section_2}>
        <p> {formData.subject}</p>
        <br />
        <p>{formData.greeting}</p>
        <p>{formData.opening}</p>
        <p>{formData.letterBody}</p>
        <p>{formData.callToAction}</p>
        <p>{formData.closing}</p>
      </section>
      <section className={styles.section_3}>
        <p>{formData.signature}</p>
      </section>
    </div>
    </>
  );
};

export default CoverLetter8;
