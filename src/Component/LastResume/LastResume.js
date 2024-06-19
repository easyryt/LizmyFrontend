import React, { useEffect, useState } from 'react';
import { getlastResume } from '../../Api/Api';
import Template_1 from '../ResumeTemplates/Template_1/Template_1';
import style from './LastResume.module.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { resumeData, updateButton,resumeTemplates, loadingStatus, update } from '../../Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';


function LastResume() {
  const [updateBtn, setUpdateBtn] = useRecoilState(updateButton);
  const [loading, setLoading] = useRecoilState(loadingStatus);
  const [updateUi, setUpdateUi] = useRecoilState(update);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const templates = useRecoilValue(resumeTemplates);
  const [count ,setCount ] = useState(0)


  useEffect(() => {
    handleLastResume();
  },[]);


console.log(updateUi)

  const handleLastResume = async () => {
    setLoading(true)
    try {
      const response = await getlastResume();

      if (response.status === true) {
        setData(response?.data);
        console.log(response,"response")
        localStorage.setItem('resume', JSON.stringify(response?.data));
        setUpdateUi(updateUi + 1)
      } else {
        console.error('Error fetching user profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }finally{
      setLoading(false)
 
    }
  };


  const handleEditResume = () => {

    setUpdateBtn(true);
    navigate("/CreateResume")
   
  };

  return (
    <div className={style.main}>
      <div className={style.head}>
        <h2>Your Resume</h2>
        <button className={style.edit_btn} onClick={handleEditResume}>
          <EditNoteIcon />
        </button>
      </div>
      <div className={style.container}>
        {updateUi == 1 && templates[data?.tempId] }
      </div>
    </div>
  );
}

export default LastResume;









