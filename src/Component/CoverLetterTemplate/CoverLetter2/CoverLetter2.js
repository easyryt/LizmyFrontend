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
import styles from "./CoverLetter2.module.css";
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

const CoverLetter2 = () => {
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

    .main-container {
      display: flex;
      flex-direction: column;
      max-width: 100%;
    }

    .header-container {
      width: 100%;
      height: 120px;
      background-color:; /* Add your background color */
      padding: 10px;
    }

    .header-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .name {
      font-size: 25px;
      font-weight: 600;
      color: #000000; /* Change text color to black */
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .contact-info-row {
      display: flex;
      align-items: center;
    }

    .contact-info-text {
      font-weight: 500;
      margin-right: 5px;
    }

    .contact-info-icon {
      color: #000000; /* Change icon color to black */
      font-size: 20px;
    }

    .content-container {
      display: flex;
      max-width: 100%;
    }

    .left-column {
      flex: 1;
      padding: 10px;
      height:100%;
      width:65%
    }

    .right-column {
      background-color: #FFFFFF; /* Add your background color */
      width:35%
    }

    /* Add more styling for the rest of the elements as needed */
    p {
      margin: 0; /* Remove default margin for paragraphs */
    }

    hr {
      margin: 10px 0;
      border: none;
      border-top: 3px solid #4569B5; /* Add your color */
    }

    .letter-content {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .signature {
      color: #4569B5; /* Add your color */
      font-size: 16px;
      font-weight: 600;
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
      <div class="main-container">
        <div class="header-container">
          <div class="header-content">
            <div class="name" style="color: ${color3}; font-family: ${fontStyle}; font-size:${fontSize}px;"> ${formData.nameAndContact.firstName} ${formData.nameAndContact.lastName}</div>
            <div class="contact-info">
              <div class="contact-info-row">
                <span class="contact-info-text">${formData.nameAndContact.phoneNumber}</span>
                <span class="contact-info-icon">&#9742;</span>
              </div>
              <div class="contact-info-row">
                <span class="contact-info-text">${formData.nameAndContact.email}</span>
                <span class="contact-info-icon">&#9993;</span>
              </div>
              <div class="contact-info-row">
                <span class="contact-info-text"> ${formData.nameAndContact.city},${formData.nameAndContact.state},
                ${formData.nameAndContact.zip}</span>
                <span class="contact-info-icon">🖈</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-container">
        <div class="left-column">
          <p>${formatDate(formData.date)}</p>
          <br />
          <p>
            ${formData.nameAndContact.firstName}
            ${formData.nameAndContact.lastName}
          </p>
          <p>
            ${formData.nameAndContact.city}, ${formData.nameAndContact.state},
           ${formData.nameAndContact.zip}
          </p>
        
          <p>
            Dear ${formData.recipient.firstName} ${formData.recipient.lastName}
          </p>
          <div class="letter-content">

            <p>${formData.subject}</p>
            <br />
            <p>${formData.greeting}</p>
            <br />
            <p>${formData.opening}</p>
            <p>${formData.letterBody}</p>
            <p>${formData.callToAction}</p>
            <br />
            <p>${formData.closing}</p>
          </div>
          <br/>
          <hr />
          <br/>
          <p>Sincerely,</p>
          <p class="signature" style="color: ${color2}; ">
            ${formData.nameAndContact.firstName}
            ${formData.nameAndContact.lastName}
          </p>
        </div>
        <div class="right-column">
          <p>Personal-Info</p>
          <hr />
          <p>
            ${formData.nameAndContact.city},${formData.nameAndContact.state},
            ${formData.nameAndContact.zip}
          </p>
          <p> ${formData.nameAndContact.email}</p>
          <p>+91 ${formData.nameAndContact.phoneNumber}</p>
        </div>
      </div>
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

      <div className={styles.main_container}>
        <div className={styles.header_container}>
          <div className={styles.header_content}>
            <div className={styles.name} style={{ color: color3, fontFamily: fontStyle ,fontSize: fontSize}}>        {formData.nameAndContact.firstName}
            {formData.nameAndContact.lastName}</div>
            <div className={styles.contact_info}>
              <div className={styles.contact_info_row}>
                <span className={styles.contact_info_text}>{formData.nameAndContact.phoneNumber}</span>
                <span className={styles.contact_info_icon}>&#9742;</span>
              </div>
              <div className={styles.contact_info_row}>
                <span className={styles.contact_info_text}>
                {formData.nameAndContact.email}
                </span>
                <span className={styles.contact_info_icon}>&#9993;</span>
              </div>
              <div className={styles.contact_info_row}>
                <span className={styles.contact_info_text}>
                {formData.nameAndContact.city},{formData.nameAndContact.state},
                {formData.nameAndContact.zip}
                </span>
                <span className={styles.contact_info_icon}>🖈</span>
              </div>
            </div>
          </div>
        </div>


        <div className={styles.content_container}>
          <div className={styles.left_column}>
            <p>{formatDate(formData.date)}</p>
            <br />
            <p>
              {formData.nameAndContact.firstName}
              {formData.nameAndContact.lastName}
            </p>
            <p>
              {formData.nameAndContact.city},{formData.nameAndContact.state},
              {formData.nameAndContact.zip}
            </p>
          
            <p>
              Dear {formData.recipient.firstName} {formData.recipient.lastName}
            </p>
            <div className={styles.letter_content}>

              <p>{formData.subject}</p>
   
              <p>{formData.greeting}</p>
             
              <p>{formData.opening}</p>
              <p>{formData.letterBody}</p>
              <p>{formData.callToAction}</p>
              <br />
              <p>{formData.closing}</p>
            </div>
            <br/>
            <hr />
            <br/>
            <p>Sincerely,</p>
            <p className={styles.signature} style={{color:color2}}>
   
              {formData.nameAndContact.firstName}
              {formData.nameAndContact.lastName}
            </p>
          </div>
          <div className={styles.right_column}>
            <p>Personal Info</p>
            <hr />
            <p>
              {formData.nameAndContact.city},{formData.nameAndContact.state},
              {formData.nameAndContact.zip}
            </p>
            <p> {formData.nameAndContact.email}</p>
            <p>+91 {formData.nameAndContact.phoneNumber}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverLetter2;
