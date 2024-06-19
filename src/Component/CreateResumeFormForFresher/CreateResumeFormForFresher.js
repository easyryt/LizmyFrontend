import React, { useEffect, useState } from 'react';
import style from "./CreateResumeFormForFresher.module.css"
import { useRecoilState } from 'recoil';
import { chooseTemplates, resumeData, updateButton, uploadImage } from '../../Recoil'; 
import ImageModal from '../ImageModal/ImageModal';
import { AiFillDelete } from 'react-icons/ai';
import { croppedImageState,suggestionData,selectedValue1,selectedValue2,modalValue} from '../../Recoil';
import { addResume, updateResume } from '../../Api/Api';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useSound } from 'use-sound';
import clickSound from "../../Sounds/Click.mp3"
import TextField from '@mui/material/TextField';
import CustomLoader from '../CustomLoader/CustomLoader';
import Dp from "../Images/dp2.jpg"


const CreateResumeFormForFresher = () => {
  const [formData,   setFormData] = useRecoilState(resumeData);
  const [handleSuggestion,   setHandleSuggestion] = useRecoilState(suggestionData);
  const [section, setSection] = useState(1);
  const [croppedImage, setCroppedImage] = useRecoilState(croppedImageState);
  const [selectedValue, setSelectedValue] = useRecoilState(selectedValue1);
const [resumeImg,setResumeImg] = useState([])
const [updateBtn, setUpdateBtn] = useRecoilState(updateButton);
const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const navigate= useNavigate()
  const authToken = JSON.parse(localStorage.getItem("token"))
  const templateNo = JSON.parse(localStorage.getItem("templateid"))
  const [play] = useSound(clickSound);


const [showModal, setShowModal] = useState(false);

const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};



  async function createFileFromImageUrl(imageUrl, fileName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
  
    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });
  
    // Create a FileList containing the File
    const fileList = {
      0: file,
      length: 1,
      item: (index) => (index === 0 ? file : null),
    };
  
    return fileList;
  }
  
  // Usage example
  const imageUrl = croppedImage
  const fileName = 'image.jpg'; // Specify the desired file name

  useEffect(()=>{
    createFileFromImageUrl(imageUrl, fileName)
    .then((fileList) => {

      setResumeImg(fileList)
     
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  },[croppedImage])
  
 

  const { resume } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      resume: {
        ...resume,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
  
    // Append personal information
    formData.append('name', JSON.stringify(resume.name));
    formData.append('summary', JSON.stringify(resume.summary));
    formData.append('contact', JSON.stringify(resume.contact));
    formData.append('dob', JSON.stringify(resume.dob));
    formData.append('gender', resume.gender);
    formData.append('address', JSON.stringify(resume.address));
    formData.append('education', JSON.stringify(resume.education));
    formData.append('work', JSON.stringify(resume.work));
    formData.append('skillsAndLevel', JSON.stringify(resume.skillsAndLevel));
    formData.append('internShips', JSON.stringify(resume.internShips));
    formData.append('projects', JSON.stringify(resume.projects));
    formData.append('socialLinks', JSON.stringify(resume.socialLinks));
    formData.append('knownLanguages', JSON.stringify(resume.knownLanguages));
    formData.append('certifications', JSON.stringify(resume.certifications));
    formData.append('awards', JSON.stringify(resume.awards));
    formData.append('volunteerExperience', JSON.stringify(resume.volunteerExperience));
    formData.append('areaOfInterest', JSON.stringify(resume.areaOfInterest));
    formData.append('references', JSON.stringify(resume.references));
    formData.append('jobTitle', JSON.stringify(resume.jobTitle));
    formData.append('interestedIn', (resume.interestedIn));
    formData.append('tempId', JSON.stringify(templateNo));
  

    for (let i = 0; i < resumeImg.length; i++) {
      formData.append('profilePicture', resumeImg[i]);
    }

  
  
    try {
      // Replace 'addResume' with your actual API request function
      const response = await addResume(formData);
      const { status, message } = response.data;
  
      if (status) {
        // Swal.fire("Good job!", "Resume Created", "success");
      } else {
        // Swal.fire("Oops!", "Something went wrong", "error");
        // Handle update error
      }
    } catch (error) {
      if (authToken) {
        // Swal.fire("Good job!", "Resume Created", "success");
      } else {
        // Swal.fire("Oops!", "Something went wrong", "error");
        navigate("/Form");
      }
      // Handle update error
    }finally{
      setLoading(false)
    }
  };



  const handleUpdateResume = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  const id=resume._id
    const formData = new FormData();
  
    // Append personal information
    formData.append('name', JSON.stringify(resume.name));
    formData.append('summary', JSON.stringify(resume.summary));
    formData.append('contact', JSON.stringify(resume.contact));
    formData.append('dob', JSON.stringify(resume.dob));
    formData.append('gender', resume.gender);
    formData.append('address', JSON.stringify(resume.address));
    formData.append('education', JSON.stringify(resume.education));
    formData.append('work', JSON.stringify(resume.work));
    formData.append('skillsAndLevel', JSON.stringify(resume.skillsAndLevel));
    formData.append('internShips', JSON.stringify(resume.internShips));
    formData.append('projects', JSON.stringify(resume.projects));
    formData.append('socialLinks', JSON.stringify(resume.socialLinks));
    formData.append('knownLanguages', JSON.stringify(resume.knownLanguages));
    formData.append('certifications', JSON.stringify(resume.certifications));
    formData.append('awards', JSON.stringify(resume.awards));
    formData.append('volunteerExperience', JSON.stringify(resume.volunteerExperience));
    formData.append('areaOfInterest', JSON.stringify(resume.areaOfInterest));
    formData.append('references', JSON.stringify(resume.references));
    formData.append('jobTitle', JSON.stringify(resume.jobTitle));
    formData.append('interestedIn', (resume.interestedIn));
    formData.append('tempId', JSON.stringify(templateNo));
  

    for (let i = 0; i < resumeImg.length; i++) {
      formData.append('profilePicture', resumeImg[i]);
    }

  
  
    try {
      // Replace 'addResume' with your actual API request function
      const response = await updateResume( id,formData);
      const { status, message } = response.data;
  
      if (status) {
        Swal.fire("Good job!", "update successfully", "success");
      } else {
        Swal.fire("Oops!", "Something went wrong", "error");
        // Handle update error
      }
    } catch (error) {
      if (authToken) {
        Swal.fire("Good job!", "Resume Created", "success");
      } else {
        Swal.fire("Oops!", "Something went wrong", "error");
    
      }
      // Handle update error
    }
  };
  
  
  

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds a smooth scrolling animation
    });
  }


  const handleSection = (direction) => {
    play();
    if (direction === 'next' && section < 13) {
      setSection(section + 1);
      setHandleSuggestion(section +1)
      setProgress(progress + 7.69)
      scrollToTop()
    } else if (direction === 'prev' && section > 1) {
      setSection(section - 1);
      setHandleSuggestion(section - 1)
      setProgress(progress - 7.69)
      scrollToTop()
    }
  };

  const handleAddLanguage = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.knownLanguages = [
        ...updatedResume.knownLanguages,
        { lang: '' },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  const handleDeleteLanguage = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.knownLanguages = [
        ...updatedResume.knownLanguages.slice(0, index),
        ...updatedResume.knownLanguages.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleAddEducation = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.education = [
        ...updatedResume.education,
        {
          degree: '',
          collegeName: '',
          stream: '',
          startYear: '',
          endYear: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteEducation = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.education = [
        ...updatedResume.education.slice(0, index),
        ...updatedResume.education.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleAddWork = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.work = [
        ...updatedResume.work,
        {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteWork = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.work = [
        ...updatedResume.work.slice(0, index),
        ...updatedResume.work.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleAddSkills = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.skillsAndLevel = [
        ...updatedResume.skillsAndLevel,
        {
          skills: '',
          level: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteSkills = (index,e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.skillsAndLevel = [
        ...updatedResume.skillsAndLevel.slice(0, index),
        ...updatedResume.skillsAndLevel.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };


  const handleAddInternship = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.internShips = [
        ...updatedResume.internShips,
        {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteInternship = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.internShips = [
        ...updatedResume.internShips.slice(0, index),
        ...updatedResume.internShips.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.projects = [
        ...updatedResume.projects,
        {
          title: '',
          description: '',
          year: '',
          link: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteProject = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.projects = [
        ...updatedResume.projects.slice(0, index),
        ...updatedResume.projects.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleAddCertification = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.certifications = [
        ...updatedResume.certifications,
        {
          title: '',
          issuingOrganization: '',
          date: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };

  const handleDeleteCertification = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.certifications = [
        ...updatedResume.certifications.slice(0, index),
        ...updatedResume.certifications.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };


  const handleAddAward = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.awards = [
        ...updatedResume.awards,
        {
          title: '',
          issuingOrganization: '',
          date: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleDeleteAward = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.awards = [
        ...updatedResume.awards.slice(0, index),
        ...updatedResume.awards.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };


  const handleAddVolunteer = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.volunteerExperience = [
        ...updatedResume.volunteerExperience,
        {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleDeleteVolunteer = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.volunteerExperience = [
        ...updatedResume.volunteerExperience.slice(0, index),
        ...updatedResume.volunteerExperience.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };


  const handleAddInterest = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.areaOfInterest = [
        ...updatedResume.areaOfInterest,
        { interest: '' },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  const handleDeleteInterest = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.areaOfInterest = [
        ...updatedResume.areaOfInterest.slice(0, index),
        ...updatedResume.areaOfInterest.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };


  const handleAddReference = (e) => {
    e.preventDefault()
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.references = [
        ...updatedResume.references,
        {
          name: '',
          company: '',
          position: '',
          email: '',
          phone: '',
        },
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  
  // Function to delete a reference at the specified index
  const handleDeleteReference = (index) => {
    setFormData((prevFormData) => {
      const updatedResume = { ...prevFormData.resume };
      updatedResume.references = [
        ...updatedResume.references.slice(0, index),
        ...updatedResume.references.slice(index + 1),
      ];
      return { ...prevFormData, resume: updatedResume };
    });
  };
  

  return (
    <div className={style.main}>
      {loading && <CustomLoader/>}
         <div className={style['progress-bar']}>
         <ul>
          <li onClick={()=>setSection(1)} >1</li>
          <li onClick={()=>setSection(2)}>2</li>
          <li onClick={()=>setSection(3)}>3</li>
          <li onClick={()=>setSection(4)}>4</li>
          <li onClick={()=>setSection(5)}>5</li>
          <li onClick={()=>setSection(6)}>6</li>
          <li onClick={()=>setSection(7)}>7</li>
          <li onClick={()=>setSection(8)}>8</li>
          <li onClick={()=>setSection(9)}>9</li>
          <li onClick={()=>setSection(10)}>10</li>
          <li onClick={()=>setSection(11)}>11</li>
          <li onClick={()=>setSection(12)}>12</li>
        </ul>
        <div className={style.progress} style={{ width: `${progress}%` }}></div>
   
      </div>
      <br/>
      <h1>Resume Form</h1>

      <br />
      <form  className={style.form}>
        {/* Job Title */}
        {section === 1 && (
          <section>
                <div className={style.img_container}>
              <div className={style.img_box}>
              {croppedImage === null  ? (
               <img src={Dp} alt='img2'/>
           
          ) : (
     
            <img src={URL.createObjectURL(resumeImg[0])} alt='img'/>
 
          )}
             
              </div>
              <div>
                <ImageModal />
              </div>
            </div>
              <div>
        <h2>Personal Information</h2>
        <div className={style.personal_info}>
          <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={resume.jobTitle}
            onChange={handleChange}
          />
          </div>
               {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={resume.name}
            onChange={handleChange}
          />
        </div>
    
        </div>
   
        </div>

   

    {/* Summary */}
<div>
  <label htmlFor="summary">Summary:</label>
  <textarea
    id="summary"
    name="summary"
    value={selectedValue ? selectedValue : resume.summary}
    onChange={(e) => {
      const newValue = e.target.value;
      if (selectedValue) {
        setSelectedValue(newValue); // Update the selectedValue if it exists
      } else {
      
        handleChange(e);
      }
    }}
  />
</div>



      <div className={style.info_box}>
       {/* Contact */}
<div>
  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    value={resume?.contact?.email}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          contact: {
            ...resume.contact,
            email: e.target.value,
          },
        },
      });
    }}
  />
</div>

<div>
  <label htmlFor="phone">Phone:</label>
  <input
    type="text"
    id="phone"
    name="phone"
    value={resume?.contact?.phone}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          contact: {
            ...resume.contact,
            phone: e.target.value,
          },
        },
      });
    }}
  />
</div>


        {/* Date of Birth */}
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={resume.dob}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={resume.gender}
            onChange={handleChange}
          />
        </div>
{/* Address */}
<div>
  <label htmlFor="address">Address:</label>
  <input
    type="text"
    id="address"
    name="address"
    value={resume?.address?.address}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          address: {
            ...resume.address,
            address: e.target.value,
          },
        },
      });
    }}
  />
</div>

<div>
  <label htmlFor="city">City:</label>
  <input
    type="text"
    id="city"
    name="city"
    value={resume?.address?.city}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          address: {
            ...resume.address,
            city: e.target.value,
          },
        },
      });
    }}
  />
</div>

<div>
  <label htmlFor="state">State:</label>
  <input
    type="text"
    id="state"
    name="state"
    value={resume?.address?.state}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          address: {
            ...resume.address,
            state: e.target.value,
          },
        },
      });
    }}
  />
</div>

<div>
  <label htmlFor="postalCode">Postal Code:</label>
  <input
    type="text"
    id="postalCode"
    name="postalCode"
    value={resume?.address?.postalCode}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          address: {
            ...resume.address,
            postalCode: e.target.value,
          },
        },
      });
    }}
  />
</div>

<div>
  <label htmlFor="country">Country:</label>
  <input
    type="text"
    id="country"
    name="country"
    value={resume?.address?.country}
    onChange={(e) => {
      setFormData({
        ...formData,
        resume: {
          ...resume,
          address: {
            ...resume.address,
            country: e.target.value,
          },
        },
      });
    }}
  />
</div>





   
      </div>
      

          </section>
    
        )}
  




  
  {section === 2 && (
  <section  >
    {/* Education */}
    {resume.education.map((education, index) => (
      <div key={index} >
        <h2>Education {index + 1}         <div className={style.dele_btn}>
          {resume.education.length > 0 && (
        <button  onClick={() => handleDeleteEducation(index)}><AiFillDelete/></button>
      )}
          </div></h2>
        <div className={style.section_2}>
          <div>
            <label htmlFor={`degree-${index}`}>Degree:</label>
            <input
              type="text"
              id={`degree-${index}`}
              name={`degree-${index}`}
              value={education.degree}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index] = {
                  ...updatedEducation[index],
                  degree: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    education: updatedEducation,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`collegeName-${index}`}>College Name:</label>
            <input
              type="text"
              id={`collegeName-${index}`}
              name={`collegeName-${index}`}
              value={education.collegeName}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index] = {
                  ...updatedEducation[index],
                  collegeName: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    education: updatedEducation,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`stream-${index}`}>Stream:</label>
            <input
              type="text"
              id={`stream-${index}`}
              name={`stream-${index}`}
              value={education.stream}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index] = {
                  ...updatedEducation[index],
                  stream: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    education: updatedEducation,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`startYear-${index}`}>Start Year:</label>
            <input
              type="text"
              id={`startYear-${index}`}
              name={`startYear-${index}`}
              value={education.startYear}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index] = {
                  ...updatedEducation[index],
                  startYear: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    education: updatedEducation,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`endYear-${index}`}>End Year:</label>
            <input
              type="text"
              id={`endYear-${index}`}
              name={`endYear-${index}`}
              value={education.endYear}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index] = {
                  ...updatedEducation[index],
                  endYear: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    education: updatedEducation,
                  },
                });
              }}
            />
 
          </div>
  
        </div>
       
     
 
      </div>
    ))}
     <div className={style.add_btn}>
        <button onClick={handleAddEducation}>+</button>
        </div>
  </section>
)}


{section === 3 && (
  <section>
    {/* Skills and Level */}
    {resume.skillsAndLevel.map((skill, index) => (
      <div key={index}>
        <h2 >Skills and Level {index + 1}
        <div className={style.dele_btn}>
            {resume.skillsAndLevel.length > 0 && (
        <button onClick={(e) => handleDeleteSkills(index,e)}><AiFillDelete/></button>
      )}
            </div></h2>
        <div className={style.section_4}>
          <div>
            <label htmlFor={`skills-${index}`}>Skills:</label>
            <input
              type="text"
              id={`skills-${index}`}
              name={`skills-${index}`}
              value={skill.skills}
              onChange={(e) => {
                const updatedSkills = [...resume.skillsAndLevel];
                updatedSkills[index] = {
                  ...updatedSkills[index],
                  skills: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    skillsAndLevel: updatedSkills,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`level-${index}`}>Level:</label>
            <input
              type="text"
              id={`level-${index}`}
              name={`level-${index}`}
              value={skill.level}
              onChange={(e) => {
                const updatedSkills = [...resume.skillsAndLevel];
                updatedSkills[index] = {
                  ...updatedSkills[index],
                  level: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    skillsAndLevel: updatedSkills,
                  },
                });
              }}
            />
 
          </div>
        </div>
    
    

      </div>
    ))}
        <div className={style.add_btn}>
        <button onClick={handleAddSkills}>+</button>
        </div>
  </section>
)}

       


{section === 4 && (
  <section>
    {/* Internships */}
    {resume.internShips.map((internship, index) => (
      <div key={index}>
        <h2>Internship {index + 1}         <div className={style.dele_btn}>
            {resume.internShips.length > 0 && (
        <button onClick={() => handleDeleteInternship(index)}><AiFillDelete/></button>
      )}
            </div></h2>

        <div className={style.section_5}>
          
          <div>
            <label htmlFor={`title-${index}`}>Title:</label>
            <input
              type="text"
              id={`title-${index}`}
              name={`title-${index}`}
              value={internship.title}
              onChange={(e) => {
                const updatedInternships = [...resume.internShips];
                updatedInternships[index] = {
                  ...updatedInternships[index],
                  title: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    internShips: updatedInternships,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`company-${index}`}>Company:</label>
            <input
              type="text"
              id={`company-${index}`}
              name={`company-${index}`}
              value={internship.company}
              onChange={(e) => {
                const updatedInternships = [...resume.internShips];
                updatedInternships[index] = {
                  ...updatedInternships[index],
                  company: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    internShips: updatedInternships,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`startDate-${index}`}>Start Date:</label>
            <input
              type="date"
              id={`startDate-${index}`}
              name={`startDate-${index}`}
              value={internship.startDate}
              onChange={(e) => {
                const updatedInternships = [...resume.internShips];
                updatedInternships[index] = {
                  ...updatedInternships[index],
                  startDate: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    internShips: updatedInternships,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`endDate-${index}`}>End Date:</label>
            <input
              type="date"
              id={`endDate-${index}`}
              name={`endDate-${index}`}
              value={internship.endDate}
              onChange={(e) => {
                const updatedInternships = [...resume.internShips];
                updatedInternships[index] = {
                  ...updatedInternships[index],
                  endDate: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    internShips: updatedInternships,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`location-${index}`}>Location:</label>
            <input
              type="text"
              id={`location-${index}`}
              name={`location-${index}`}
              value={internship.location}
              onChange={(e) => {
                const updatedInternships = [...resume.internShips];
                updatedInternships[index] = {
                  ...updatedInternships[index],
                  location: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    internShips: updatedInternships,
                  },
                });
              }}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor={`description-${index}`}>Description:</label>
          <textarea
            id={`description-${index}`}
            name={`description-${index}`}
            value={internship.description}
            onChange={(e) => {
              const updatedInternships = [...resume.internShips];
              updatedInternships[index] = {
                ...updatedInternships[index],
                description: e.target.value,
              };
              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  internShips: updatedInternships,
                },
              });
            }}
          />
    
        </div>
 
      </div>
    ))}
           <div className={style.add_btn}>
        <button onClick={handleAddInternship}>+</button>
        </div>
  </section>
)}


     





{section === 5 && (
  <section>
    {/* Projects */}
    {resume.projects.map((project, index) => (
      <div key={index}>
        <h2>Project {index + 1}    <div className={style.dele_btn}>
            {resume.projects.length > 0 && (
        <button onClick={() => handleDeleteProject(index)}><AiFillDelete/></button>
      )}
            </div></h2>
     
        <div>
          <label htmlFor={`title-${index}`}>Title:</label>
          <input
            type="text"
            id={`title-${index}`}
            name={`title-${index}`}
            value={project.title}
            onChange={(e) => {
              const updatedProjects = [...resume.projects];
              updatedProjects[index] = {
                ...updatedProjects[index],
                title: e.target.value,
              };
              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  projects: updatedProjects,
                },
              });
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor={`description-${index}`}>Description:</label>
          <textarea
            id={`description-${index}`}
            name={`description-${index}`}
            value={project.description}
            onChange={(e) => {
              const updatedProjects = [...resume.projects];
              updatedProjects[index] = {
                ...updatedProjects[index],
                description: e.target.value,
              };
              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  projects: updatedProjects,
                },
              });
            }}
          />
        </div>
        <br />
        <div className={style.section_6}>
          <div>
            <label htmlFor={`year-${index}`}>Year:</label>
            <input
              type="text"
              id={`year-${index}`}
              name={`year-${index}`}
              value={project.year}
              onChange={(e) => {
                const updatedProjects = [...resume.projects];
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  year: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    projects: updatedProjects,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`link-${index}`}>Link:</label>
            <input
              type="text"
              id={`link-${index}`}
              name={`link-${index}`}
              value={project.link}
              onChange={(e) => {
                const updatedProjects = [...resume.projects];
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  link: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    projects: updatedProjects,
                  },
                });
              }}
            />
  
     
          </div>
        </div>

    
      </div>
    ))}
       <div className={style.add_btn}>
        <button onClick={handleAddProject}>+</button>
        </div>
  </section>
)}


      





{section === 6 && (
  <section>
    {/* Social Links */}
    <div>
      <h2>Social Links</h2>
      <br/>
      <div>
        <label htmlFor="linkedin">LinkedIn Profile:</label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={resume.socialLinks.linkedin}
          onChange={(e) => {
            setFormData({
              ...formData,
              resume: {
                ...resume,
                socialLinks: {
                  ...resume.socialLinks,
                  linkedin: e.target.value,
                },
              },
            });
          }}
        />
      </div>
      <br/>
      <div>
        <label htmlFor="github">GitHub Profile:</label>
        <input
          type="url"
          id="github"
          name="github"
          value={resume.socialLinks.github}
          onChange={(e) => {
            setFormData({
              ...formData,
              resume: {
                ...resume,
                socialLinks: {
                  ...resume.socialLinks,
                  github: e.target.value,
                },
              },
            });
          }}
        />
      </div>
      <br/>
      <div>
        <label htmlFor="portfolio">Portfolio:</label>
        <input
          type="url"
          id="portfolio"
          name="portfolio"
          value={resume.socialLinks.portfolio}
          onChange={(e) => {
            setFormData({
              ...formData,
              resume: {
                ...resume,
                socialLinks: {
                  ...resume.socialLinks,
                  portfolio: e.target.value,
                },
              },
            });
          }}
        />
      </div>
    </div>
  </section>
)}

      





{section === 7 && (
  <section >
    {/* Known Languages */}
    <h2>Known Languages </h2>
    <div className={style.section_8}>
    {resume.knownLanguages.map((language, index) => (
      <div key={index}>
   
       <label htmlFor={`language-${index}`}>Language:</label>

       <div className={style.input_box}>
        <input
          type="text"
          id={`language-${index}`}
          name={`language-${index}`}
          value={language.lang}
          onChange={(e) => {
            const updatedKnownLanguages = [...resume.knownLanguages];
            updatedKnownLanguages[index] = {
              ...updatedKnownLanguages[index],
              lang: e.target.value,
            };

            setFormData({
              ...formData,
              resume: {
                ...resume,
                knownLanguages: updatedKnownLanguages,
              },
            });
          }}
        />
        <div className={style.dele_btn}>
        {resume.knownLanguages.length > 0 && (
      <button onClick={() => handleDeleteLanguage(index)}><AiFillDelete/></button>
    )}
        </div>
   
       </div>
    
   
 
      </div>
       
    ))}
    </div>
    <div className={style.add_btn}>
      <button onClick={handleAddLanguage}>+</button>
      </div>
  </section>
)}









{section === 8 && (
  <section className={style.section_9}>
    {/* Certifications */}
    {resume.certifications.map((certification, index) => (
      <div key={index}>
 
        <h2><div>Certification {index + 1}</div>
        <div className={style.dele_btn}>
              {resume.certifications.length > 0 && (
        <button onClick={() => handleDeleteCertification(index)}><AiFillDelete/></button>
      )}
        </div>
        </h2>
   
        <div>
          <label htmlFor={`title-${index}`}>Title:</label>
          <input
            type="text"
            id={`title-${index}`}
            name={`title-${index}`}
            value={certification.title}
            onChange={(e) => {
              const updatedCertifications = [...resume.certifications];
              updatedCertifications[index] = {
                ...updatedCertifications[index],
                title: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  certifications: updatedCertifications,
                },
              });
            }}
          />
        </div>
        <br/>
        <div>
          <label htmlFor={`issuingOrganization-${index}`}>Issuing Organization:</label>
          <input
            type="text"
            id={`issuingOrganization-${index}`}
            name={`issuingOrganization-${index}`}
            value={certification.issuingOrganization}
            onChange={(e) => {
              const updatedCertifications = [...resume.certifications];
              updatedCertifications[index] = {
                ...updatedCertifications[index],
                issuingOrganization: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  certifications: updatedCertifications,
                },
              });
            }}
          />
        </div>
        <br/>
        <div>
          <label htmlFor={`date-${index}`}>Date:</label>
          <input
            type="date"
            id={`date-${index}`}
            name={`date-${index}`}
            value={certification.date}
            onChange={(e) => {
              const updatedCertifications = [...resume.certifications];
              updatedCertifications[index] = {
                ...updatedCertifications[index],
                date: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  certifications: updatedCertifications,
                },
              });
            }}
          />
     
        </div>

   
    
      </div>
    ))}
           <div className={style.add_btn}>
        <button onClick={handleAddCertification}>
          +
        </button>
       </div>
  </section>
)}








{section === 9 && (
  <section className={style.section_9}>
    {/* Awards */}
    {resume.awards.map((award, index) => (
      <div key={index}>

        <h2>
        <div>    Award {index + 1}</div>
        <br/>
        <br/>
        <div className={style.dele_btn}>
      {resume.awards.length > 0 && (
        <button onClick={() => handleDeleteAward(index)}><AiFillDelete/></button>
      )}
      </div>
          </h2>
 
        <div>
          <label htmlFor={`awardTitle-${index}`}>Award Title:</label>
          <input
            type="text"
            id={`awardTitle-${index}`}
            name={`awardTitle-${index}`}
            value={award.title}
            onChange={(e) => {
              const updatedAwards = [...resume.awards];
              updatedAwards[index] = {
                ...updatedAwards[index],
                title: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  awards: updatedAwards,
                },
              });
            }}
          />
        </div>
        <br/>
        <div>
          <label htmlFor={`awardOrganization-${index}`}>Award Organization:</label>
          <input
            type="text"
            id={`awardOrganization-${index}`}
            name={`awardOrganization-${index}`}
            value={award.issuingOrganization}
            onChange={(e) => {
              const updatedAwards = [...resume.awards];
              updatedAwards[index] = {
                ...updatedAwards[index],
                issuingOrganization: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  awards: updatedAwards,
                },
              });
            }}
          />
        </div>
        <br/>
        <div>
          <label htmlFor={`awardDate-${index}`}>Award Date:</label>
          <input
            type="date"
            id={`awardDate-${index}`}
            name={`awardDate-${index}`}
            value={award.date}
            onChange={(e) => {
              const updatedAwards = [...resume.awards];
              updatedAwards[index] = {
                ...updatedAwards[index],
                date: e.target.value,
              };

              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  awards: updatedAwards,
                },
              });
            }}
          />
  
        </div>

 
 
   
      </div>
    ))}
            <div className={style.add_btn}>
        <button onClick={handleAddAward}>+</button>
        </div>
  </section>
)}



       

{section === 10 && (
  <section>
    {/* Volunteer Experience */}
    {resume.volunteerExperience.map((volunteer, index) => (
      <div key={index}>
        <h2 className={style.section_11_h2}>
          <div>Volunteer Experience {index + 1}</div>
      
          <div className={style.dele_btn}>
          {resume.volunteerExperience.length > 0 && (
        <button onClick={() => handleDeleteVolunteer(index)}><AiFillDelete/></button>
      )} 
          </div>
          </h2>
        <div className={style.section_11}>
          <div>
            <label htmlFor={`volunteerTitle-${index}`}>Title:</label>
            <input
              type="text"
              id={`volunteerTitle-${index}`}
              name={`volunteerTitle-${index}`}
              value={volunteer.title}
              onChange={(e) => {
                const updatedVolunteerExperience = [...resume.volunteerExperience];
                updatedVolunteerExperience[index] = {
                  ...updatedVolunteerExperience[index],
                  title: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    volunteerExperience: updatedVolunteerExperience,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`volunteerCompany-${index}`}>Company:</label>
            <input
              type="text"
              id={`volunteerCompany-${index}`}
              name={`volunteerCompany-${index}`}
              value={volunteer.company}
              onChange={(e) => {
                const updatedVolunteerExperience = [...resume.volunteerExperience];
                updatedVolunteerExperience[index] = {
                  ...updatedVolunteerExperience[index],
                  company: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    volunteerExperience: updatedVolunteerExperience,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`volunteerStartDate-${index}`}>Start Date:</label>
            <input
              type="date"
              id={`volunteerStartDate-${index}`}
              name={`volunteerStartDate-${index}`}
              value={volunteer.startDate}
              onChange={(e) => {
                const updatedVolunteerExperience = [...resume.volunteerExperience];
                updatedVolunteerExperience[index] = {
                  ...updatedVolunteerExperience[index],
                  startDate: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    volunteerExperience: updatedVolunteerExperience,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`volunteerEndDate-${index}`}>End Date:</label>
            <input
              type="date"
              id={`volunteerEndDate-${index}`}
              name={`volunteerEndDate-${index}`}
              value={volunteer.endDate}
              onChange={(e) => {
                const updatedVolunteerExperience = [...resume.volunteerExperience];
                updatedVolunteerExperience[index] = {
                  ...updatedVolunteerExperience[index],
                  endDate: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    volunteerExperience: updatedVolunteerExperience,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`volunteerLocation-${index}`}>Location:</label>
            <input
              type="text"
              id={`volunteerLocation-${index}`}
              name={`volunteerLocation-${index}`}
              value={volunteer.location}
              onChange={(e) => {
                const updatedVolunteerExperience = [...resume.volunteerExperience];
                updatedVolunteerExperience[index] = {
                  ...updatedVolunteerExperience[index],
                  location: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    volunteerExperience: updatedVolunteerExperience,
                  },
                });
              }}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor={`volunteerDescription-${index}`}>Description:</label>
          <textarea
            id={`volunteerDescription-${index}`}
            name={`volunteerDescription-${index}`}
            value={volunteer.description}
            onChange={(e) => {
              const updatedVolunteerExperience = [...resume.volunteerExperience];
              updatedVolunteerExperience[index] = {
                ...updatedVolunteerExperience[index],
                description: e.target.value,
              };
              setFormData({
                ...formData,
                resume: {
                  ...resume,
                  volunteerExperience: updatedVolunteerExperience,
                },
              });
            }}
          />

        </div>

 
  
      </div>
    ))}
            <div className={style.add_btn}>
        <button onClick={handleAddVolunteer}>+</button>
        </div>
  </section>
)}

       




{section === 11 && (
  <section className={style.section_12}>
    {/* Areas of Interest */}
    {resume.areaOfInterest.map((interest, index) => (
      <div key={index}>
        
        <h2 className={style.section_12_h2}>
        <div>Areas of Interest {index + 1}</div>
        <div className={style.dele_btn}>
        {resume.areaOfInterest.length > 1 && (
        <button onClick={() => handleDeleteInterest(index)}><AiFillDelete/></button>
      )}
        </div>
        </h2>
        <label htmlFor={`interest-${index}`}>Area of Interest:</label>
        <input
          type="text"
          id={`interest-${index}`}
          name={`interest-${index}`}
          value={interest.interest}
          onChange={(e) => {
            const updatedAreaOfInterest = [...resume.areaOfInterest];
            updatedAreaOfInterest[index] = {
              ...updatedAreaOfInterest[index],
              interest: e.target.value,
            };
            setFormData({
              ...formData,
              resume: {
                ...resume,
                areaOfInterest: updatedAreaOfInterest,
              },
            });
          }}
        />
     
    
   
   
      </div>

    ))}
         <div className={style.add_btn}>
        <button onClick={handleAddInterest}>+</button>
        </div>
  </section>
)}

        





{section === 12 && (
  <section>
    {/* References */}
    {resume.references.map((reference, index) => (
      <div key={index}>
        <h2 className={style.section_13_h2}>
          <div>
          Reference {index + 1}
          </div>
 
          <div className={style.dele_btn}>
        {resume.references.length > 1 && (
        <button onClick={() => handleDeleteReference(index)}><AiFillDelete/></button>
      )}
        </div>
          </h2>
        <div className={style.section_13}>
          <div>
            <label htmlFor={`referenceName-${index}`}>Name:</label>
            <input
              type="text"
              id={`referenceName-${index}`}
              name={`referenceName-${index}`}
              value={reference.name}
              onChange={(e) => {
                const updatedReferences = [...resume.references];
                updatedReferences[index] = {
                  ...updatedReferences[index],
                  name: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    references: updatedReferences,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`referenceCompany-${index}`}>Company:</label>
            <input
              type="text"
              id={`referenceCompany-${index}`}
              name={`referenceCompany-${index}`}
              value={reference.company}
              onChange={(e) => {
                const updatedReferences = [...resume.references];
                updatedReferences[index] = {
                  ...updatedReferences[index],
                  company: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    references: updatedReferences,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`referencePosition-${index}`}>Position:</label>
            <input
              type="text"
              id={`referencePosition-${index}`}
              name={`referencePosition-${index}`}
              value={reference.position}
              onChange={(e) => {
                const updatedReferences = [...resume.references];
                updatedReferences[index] = {
                  ...updatedReferences[index],
                  position: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    references: updatedReferences,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`referenceEmail-${index}`}>Email:</label>
            <input
              type="email"
              id={`referenceEmail-${index}`}
              name={`referenceEmail-${index}`}
              value={reference.email}
              onChange={(e) => {
                const updatedReferences = [...resume.references];
                updatedReferences[index] = {
                  ...updatedReferences[index],
                  email: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    references: updatedReferences,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor={`referencePhone-${index}`}>Phone:</label>
            <input
              type="tel"
              id={`referencePhone-${index}`}
              name={`referencePhone-${index}`}
              value={reference.phone}
              onChange={(e) => {
                const updatedReferences = [...resume.references];
                updatedReferences[index] = {
                  ...updatedReferences[index],
                  phone: e.target.value,
                };
                setFormData({
                  ...formData,
                  resume: {
                    ...resume,
                    references: updatedReferences,
                  },
                });
              }}
            />
          </div>
        </div>
  

      </div>
    ))}
   
   <div className={style.add_btn}>
     <button onClick={handleAddReference}>+</button>
     </div>
   {
    updateBtn  ? <button className={style.submit_btn} onClick={handleUpdateResume}>Update</button> :
    <button className={style.submit_btn} onClick={handleSubmit}>Submit</button>
   } 
   
  </section>
)}

      </form>
      <br />
      {section === 12 ? <button onClick={() => handleSection('prev')}>Previous</button>:
            <div className={style.btn_box}>
            <button onClick={() => handleSection('prev')}>Previous</button>
            <button onClick={() => handleSection('next')}>Next</button>
            <button onClick={() => handleSection('next')}>Skip</button>
            </div>
       }

    </div>
  );
};

export default CreateResumeFormForFresher;
