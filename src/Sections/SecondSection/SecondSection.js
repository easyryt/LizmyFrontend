import React, { useEffect, useState } from 'react'
import style from "./SecondSection.module.css"
import Carsouel from '../../Component/Carsouel/Carsouel'
import Slider from '../../Component/Slider/Slider'
import { getAllCategoy, getResume } from '../../Api/Api';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../../Recoil';
import { useSound } from 'use-sound';
import clickSound from "../../Sounds/Click.mp3"


function SecondSection() {
  const [formData, setFormData] = useRecoilState(resumeData);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [play] = useSound(clickSound);
  
  const handleClick = () => {
    play();
  };

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    try {
      const response = await getAllCategoy();

      if (response.status === true) {
        setAllCategory(response.data);
      } else {
        console.error('Error fetching categories:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getResume(selectedCategory);

      if (response.status === true) {
        localStorage.setItem('resume', JSON.stringify(response.data[0]));
        navigate('/ResumeForm');
      } else {
        console.error('Error fetching resume:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching resume:', error.message);
    }
  };
  return (
    <div className={style.main}>
   <div className={style.heading}>
        <h2>Resume Template For Every Kind Of Job Seeker</h2>
        <p>
          Find the best resume designs for your industry, job title, or experience level. Choose by style, color, or format. No matter your experience, there's a resume template for you.
        </p>
        <br />
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setShowOptions(true);
            if (e.target.value.length === 0) {
              setShowOptions(false);
            }
          }}
          className={style.search_input}
          placeholder="🔍 Search here..."
          value={search}
        />

        {showOptions && ( // Show options only when showOptions is true
          <div className={style.optionList}>
            {allCategory
              .filter((item) => item.category.toLowerCase().includes(search.toLowerCase()))
              .map((item) => (
                <div
                  className={style.list}
                  key={item._id}
                  onClick={() => {
                    setSearch(item.category);
                    setSelectedCategory(item.category);
                    setShowOptions(false); // Close the options list when an option is selected
                  }}
                >
                  {item.category}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className={style.Carsouel} onClick={handleClick}>
         <Slider/>
      </div>
    </div>
  )
}

export default SecondSection
