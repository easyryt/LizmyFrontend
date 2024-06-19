import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  authenticateduser,
  coverLetterId,
  coverLetterTemplates,
  jobApplicationState,
} from "../../Recoil";
import style from "./CoverLetterForm.module.css";
import NavBar from "../NavBar/NavBar";
import CoverLetter1 from "../CoverLetterTemplate/CoverLetter1/CoverLetter1";
import { addCoverLetter } from "../../Api/Api";
import Swal from "sweetalert2";
import CustomCursor from "../CustomCursor/CustomCursor";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CoverLetterForm = () => {
  const [formData, setFormData] = useRecoilState(jobApplicationState);
  const [clNo, setClNo] = useRecoilState(coverLetterId);
  const [cl, setCl] = useRecoilState(coverLetterTemplates);
  const [section, setSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [ checkAuth, setCheckAuth] = useRecoilState(authenticateduser);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is nested
    if (name.includes(".")) {
      const [nestedField, subField] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [nestedField]: {
          ...prevData[nestedField],
          [subField]: value,
        },
      }));
    } else {
      // If not nested, update the field directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds a smooth scrolling animation
    });
  }

  const handleSection = (direction) => {
    if (direction === "next" && section < 4) {
      setSection(section + 1);
      setProgress(progress + 35);
      scrollToTop();
    } else if (direction === "prev" && section > 1) {
      setSection(section - 1);
      setProgress(progress - 35);
      scrollToTop();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   localStorage.setItem("submit",false)
    localStorage.setItem("coverletter",true)
    // localStorage.setItem("pendingData",JSON.stringify(formData) )
    if (!checkAuth) {
      navigate("/Form");
      return; // Stop further execution if authentication check fails
    }
    try {
      const response = await addCoverLetter(formData); // Assuming registration function accepts an object

      console.log(response, "coverletter");
      Swal.fire("Good job!", "SignUp", "success");
    } catch (error) {
      Swal.fire("Oops!", "Email already exists", "error");
      // Handle signup error
    } finally {
      console.log("loading");
    }
  };

useEffect(()=>{
  handleUserAuthenticationCheck()
},[])

  const handleUserAuthenticationCheck = async () => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      'x-auth-token': authToken,
      'Content-Type': 'application/json', // including charset
    };
    
    try {
      const response = await axios.post(`https://lizmyresume.onrender.com/user/auth/checkAuth`, {}, { headers });
      if(response) {
        const { status, message, data } = response.data;
        if(status){
          setCheckAuth(status);
        }
        return { status, message, data };
      } else {
        console.error('Error checking authentication:', response.statusText);
        // Optionally handle the error or re-throw it
      }
    } catch (error) {
      console.error('Error checking authentication:', error.message);
      // Optionally handle the error or re-throw it

    }
  };

  return (
    <div className={style.main}>
      <div className={style.navBar}>
        <NavBar />
      </div>

      <div className={style.container}>
        <div className={style.header_bar}>
          <br />
          <h2>Create Your Cover Letter</h2>
        </div>
        <br />
        <form className={style.form}>
          {section === 1 && (
            <section className={style.section_1}>
              {/* Personal Information */}
              <label>
                First Name:
                <input
                  type="text"
                  name="nameAndContact.firstName"
                  value={formData.nameAndContact.firstName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Last Name:
                <input
                  type="text"
                  name="nameAndContact.lastName"
                  value={formData.nameAndContact.lastName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Profession:
                <input
                  type="text"
                  name="nameAndContact.profession"
                  value={formData.nameAndContact.profession}
                  onChange={handleChange}
                  spellcheck="false"
                />
              </label>

              <label>
                City:
                <input
                  type="text"
                  name="nameAndContact.city"
                  value={formData.nameAndContact.city}
                  onChange={handleChange}
                />
              </label>

              <label>
                State:
                <input
                  type="text"
                  name="nameAndContact.state"
                  value={formData.nameAndContact.state}
                  onChange={handleChange}
                />
              </label>

              <label>
                Zip:
                <input
                  type="text"
                  name="nameAndContact.zip"
                  value={formData.nameAndContact.zip}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="number"
                  name="nameAndContact.phoneNumber"
                  value={formData.nameAndContact.phoneNumber}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="nameAndContact.email"
                  value={formData.nameAndContact.email}
                  onChange={handleChange}
                />
              </label>

              {/* Date */}
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </label>
              <br />
            </section>
          )}

          {section === 2 && (
            <section className={style.section_2}>
              {/* Recipient Information */}
              <label>
                Recipient First Name:
                <input
                  type="text"
                  name="recipient.firstName"
                  value={formData.recipient.firstName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient Last Name:
                <input
                  type="text"
                  name="recipient.lastName"
                  value={formData.recipient.lastName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Company Name:
                <input
                  type="text"
                  name="recipient.companyName"
                  value={formData.recipient.companyName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient City:
                <input
                  type="text"
                  name="recipient.city"
                  value={formData.recipient.city}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient State:
                <input
                  type="text"
                  name="recipient.state"
                  value={formData.recipient.state}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient Zip:
                <input
                  type="text"
                  name="recipient.zip"
                  value={formData.recipient.zip}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient Phone Number:
                <input
                  type="text"
                  name="recipient.phoneNumber"
                  value={formData.recipient.phoneNumber}
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipient Email:
                <input
                  type="email"
                  name="recipient.email"
                  value={formData.recipient.email}
                  onChange={handleChange}
                />
              </label>
            </section>
          )}

          {section === 3 && (
            <section className={style.section_3}>
              {/* Cover Letter */}
              <label>
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Greeting:
                <input
                  type="text"
                  name="greeting"
                  value={formData.greeting}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Opening:
                <textarea
                  spellcheck="false"
                  type="text"
                  name="opening"
                  value={formData.opening}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Letter Body:
                <textarea
                  spellcheck="false"
                  type="text"
                  name="letterBody"
                  value={formData.letterBody}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Call to Action:
                <textarea
                  spellcheck="false"
                  type="text"
                  name="callToAction"
                  value={formData.callToAction}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Closing:
                <textarea
                  spellcheck="false"
                  type="text"
                  name="closing"
                  value={formData.closing}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Signature:
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                />
              </label>
              <br />
            </section>
          )}

          {section === 4 && (
            <section className={style.section_4}>
              <label>
                Availability:
                <textarea
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Confidentiality:
                <textarea
                  type="text"
                  name="confidentiality"
                  value={formData.confidentiality}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Gaps in Employment:
                <textarea
                  type="text"
                  name="gaps"
                  value={formData.gaps}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Relocation:
                <textarea
                  type="text"
                  name="relocation"
                  value={formData.relocation}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Salary Requirements:
                <textarea
                  type="text"
                  name="salaryRequirements"
                  value={formData.salaryRequirements}
                  onChange={handleChange}
                />
              </label>
              <br />
            </section>
          )}
        </form>

        {section === 4 ? (
          <div className={style.btn_box}>
            <button onClick={() => handleSection("prev")}>Previous</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ) : (
          <div className={style.btn_box}>
            <button onClick={() => handleSection("prev")}>Previous</button>
            <button onClick={() => handleSection("next")}>Next</button>
            <button onClick={() => handleSection("next")}>Skip</button>
          </div>
        )}
      </div>
      <div className={style.coverLetter_box}>{cl[clNo]}</div>
    </div>
  );
};

export default CoverLetterForm;
