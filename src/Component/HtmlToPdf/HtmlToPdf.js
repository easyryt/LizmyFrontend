import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useRecoilState,
} from 'recoil';
import {
  ChooseColor,
  ChooseColorSecond,
  ChooseColorThird,
  chooseTemplates,
  croppedImageState,
  fontState,
  fontSizeState,
  imageSizeState,
  resumeData,
} from '../../Recoil';
import dp from "../Images/dp2.jpg";
import location from "../Images/location-pin.png"
import linkedin from "../Images/linkedin.png"
import mail from "../Images/mail.png"
import call from "../Images/call.png"


function HtmlToPdf() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [color, setColor] = useRecoilState(ChooseColor);
  const [color2, setColor2] = useRecoilState(ChooseColorSecond);
  const [color3, setColor3] = useRecoilState(ChooseColorThird);
  const [fontStyle, setFontStyle] = useRecoilState(fontState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [imgSize, setImgSize] = useRecoilState(imageSizeState);
  const [templateNo, setTemplateNo] = useRecoilState(chooseTemplates);
  const [formData, setFormData] = useRecoilState(resumeData);
  const [croppedImage, setCroppedImage] = useRecoilState(croppedImageState);
  const [base64Image1, setBase64Image1] = useState('');
  const [base64Image2, setBase64Image2] = useState('');
  const [base64Image3, setBase64Image3] = useState('');
  const [base64Image4, setBase64Image4] = useState('');
  const [base64Image5, setBase64Image5] = useState('');

  console.log(formData.resume, "resume data");

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

  const getHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Resume</title>
        <style>
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
                height: 1130px;
                background-color: white;
            }
    
            .container {
                display: grid;
                grid-template-columns: 1fr 2fr;
            }
    
            .img_box {
                height: 7rem;
                width: 7rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin-right: 2rem;
            }
    
            .img_box img {
                height: 100%;
                width: 100%;
            }
    
            .left_section {
                display: flex;
                flex-direction: column;
                padding: 2rem 1rem;
                gap: 2rem;
                text-align: left;
            }
    
            .info_box,
            .education {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 1rem;
            }
    
            .right_section {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                padding: 2rem 1rem;
                height: 1130px;
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
    
            .work_history {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
    
            .heading {
                padding: 3rem 1rem;
            }
    
            .certifications,
            .skills,
            .professional_summary,
            .work,
            .contact_info,
            .skills_list {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }
    
            .skills ul,
            .certifications ul {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
    
            .header {
                height: 8rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0rem 1rem;
                overflow: hidden;
            }
    
            .img_box {
                border-radius: 50%;
            }
    
            .Design_box {
                background-color: rgb(255, 179, 0);
                width: 1rem;
                height: 7rem;
                margin-left: -3rem;
            }
    
            .contact_label {
                background-color: rgb(255, 179, 0);
                height: 1.2rem;
                width: 1.2rem;
                display: flex;
                align-items: center;
                border-radius: 5px;
                justify-content: center;
            }
    
            .name_box {
                width: 70%;
                height: 100%;
                padding: 1rem 2rem;
                display: flex;
                gap: .4rem;
            }
    
            .section {
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }
    
            .work_entry {
                display: grid;
                grid-template-columns: 1fr;
            }
    
            .inner_div {
                border-left: 1px rgb(0, 0, 0) solid;
                padding:  .5rem;
                margin-left: -1rem;
            }
    
            .section_title {
                display: flex;
                align-items: center;
                gap: 2.7rem;
            }
    
            .description {
                width: 25rem;
            }
    
            .contact_value {
                display: flex;
                align-items: center;
                gap: .2rem;
            }
    
            .contact_label {
                font-size: small;
            }
    
            .contact_info {
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }
    
            .skills_list {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                padding-top: 1rem;
            }
    
            .contact_value {
                display: flex;
                align-items: center;
            }
    
            .contact_value span,
            p {
                margin: 0;
            }
    
            .contact_label {
                font-size: small;
            }
    
            .contact_info {
                display: flex;
                flex-direction: column;
                margin: 0;
                list-style: none;
                gap: .5rem;
                margin-left:-1rem;
            }
    
            .skills_list {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                padding-top: 1rem;
            }
    
            .name {
                margin: 0rem;
            }
    
            .work-info h3,
            p {
                margin: 0rem;
            }
    
            .ul {
                margin-top: -1rem;
            }
    
            .ul li {
                margin-left: -1rem;
            }
            .ul-skill{
              margin-top: -1rem;
              margin-left: -2rem;
            }
         
    
            .name_box {
                margin-top: 3.5rem;
            }
    
            .contact_value {
                margin-left: 0rem;
            }
    
            .icon {
                height: 1rem;
                width: 1rem;
            }
        </style>
    </head>
    
    <body>
        <div class="main">
            <div class="header">
                <div class="name_box">
                    <div class="Design_box"></div>
                    <div>
                        <h1 class="name" style="font-weight: 100;">JESSICA CLAIR </h1>
                        <p class="name">frontend Developer</p>
                    </div>
                </div>
                <div>
                    <div class="img_box">
                        <img src="${base64Image3}" alt="dp" />
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="right_section">
                    <h3 class="section-title">CONTACTS</h2>
                    <div class="contact_info">
                        <div class="contact_value">
                            <span class="contact_label">
                                <img class="icon" src="${base64Image5}" alt="dp" />
                            </span>
                            <p class="contact-value">+91 9503942697</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <img class="icon" src="${base64Image4}" alt="dp" />
                            </span>
                            <p class="contact-value">ss20010126@gmail.com</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <img class="icon" src="${base64Image2}" alt="dp" />
                            </span>
                            <p class="contact-value">linkedin.com/en/5hubzzz</p>
                        </div>
                        <div class="contact_value">
                            <span class="contact_label">
                                <img class="icon" src="${base64Image1}" alt="dp" />
                            </span>
                            <p class="contact-value">Enter Your Address here</p>
                        </div>
                    </div>
    
                    <h3 class="section_title">EDUCATION</h2>
                    <ul class="ul-skill">
                        <li>
                            <div class="work_entry">
                                <p class="date">2019.08 - 2023.09</p>
                                <div>
                                    <h3 class="degree">Masters in Data Science</h3>
                                    <p class="university">ABC College</p>
                                </div>
                            </div>
                        </li>
                    </ul>
    
                    <h3 class="section-title">SKILLS</h2>
                    <ul class="ul-skill">
                        <li>javascript </li>
                        <li>javascript </li>
                        <li>javascript </li>
                        <li>javascript </li>
                        <li>javascript </li>
                        <li>javascript </li>
                    </ul>
    
                    <h3 class="section-title">LANGUAGE</h2>
                    <ul class="ul-skill">
                        <li>Hindi</li>
                        <li>English</li>
                        <li>Urdu</li>
                    </ul>
    
                    <h3 class="section-title">AWARDS</h2>
                    <ul class="ul-skill">
                        <li>Hindi</li>
                        <li>English</li>
                        <li>Urdu</li>
                    </ul>
                </div>
    
                <div class="left_section">
                    <div class="section">
                        <h3 class="section-title">ABOUT ME</h2>
                        <p class="section-content">
                            Lorem Ipsum is simply dummy text of scrambled it to make a ty It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more.
                        </p>
                    </div>
    
                    <div class="section">
                        <h3 class="section_title">EXPERIENCE</h2>
                        <ul class="ul">
                            <li>
                                <div class="work_entry">
                                    <p class="date">2019.08 - Present</p>
                                    <div class="inner_div">
                                        <h3 class="position">Software Engineer</h3>
                                        <p class="company">ABC Company</p>
                                        <p class="description">
                                            Lorem Ipsum is simply dummy text of Lorem Ipsum passages, and Aldus PageMaker
                                            including versions of Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="work_entry">
                                    <p class="date">2019.08 - Present</p>
                                    <div class="inner_div">
                                        <h3 class="position">Software Engineer</h3>
                                        <p class="company">ABC Company</p>
                                        <p class="description">
                                            Lorem Ipsum is simply dummy text of Lorem Ipsum passages, and Aldus PageMaker
                                            including versions of Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
    
                    <div class="section">
                        <h3 class="section_title">PROJECTS</h2>
                        <ul class="ul">
                            <li>
                                <div class="work_entry">
                                    <p class="date">2019.08 - Present</p>
                                    <div class="inner_div">
                                        <h3 class="position">Software Engineer</h3>
                                        <p class="company">ABC Company</p>
                                        <p class="description">
                                            Lorem Ipsum is simply dummy text of Lorem Ipsum passages, and Aldus PageMaker
                                            including versions of Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="work_entry">
                                    <p class="date">2019.08 - Present</p>
                                    <div class="inner_div">
                                        <h3 class="position">Software Engineer</h3>
                                        <p class="company">ABC Company</p>
                                        <p class="description">
                                            Lorem Ipsum is simply dummy text of Lorem Ipsum passages, and Aldus PageMaker
                                            including versions of Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>
    `;
  };

  let data = {
    htmlContent: getHTML(),
  };

  const handleResume = async () => {
    setLoading(true);
    setError('');

    const axiosConfig = {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'https://whihtmltopdf.onrender.com/convertToPdf',
        data,
        axiosConfig
      );

      setLoading(false);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'receipt.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleResume}>Download</button>
      <br />
      <div dangerouslySetInnerHTML={{ __html: getHTML() }} />
    </div>
  );
}

export default HtmlToPdf;
