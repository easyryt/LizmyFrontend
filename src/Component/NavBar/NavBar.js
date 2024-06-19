import React, { useEffect, useState } from 'react';
import style from './NavBar.module.css';
import logo from '../Images/logo.png';
import ServicesOption from '../ServicesOption/ServicesOption';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../Api/Api';
import ServicesOptionList from '../ServicesOption/ServicesOption';
import { useRecoilState } from 'recoil';
import { userName } from '../../Recoil';

function NavBar() {
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isCoverLetterHovered, setIsCoverLetterHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const [user, setUser] = useRecoilState(userName);

  
  const naviagte=useNavigate()

  useEffect(() => {
    handleuserProfile();
  }, []);

  const handleuserProfile = async () => {
    try {
      const response = await getUserProfile();

      if (response.status === true) {
        setUser(response.data.name);
        localStorage.setItem('user', JSON.stringify(response.data)); // Move this line here
      } else {
        console.error('Error fetching user profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }finally{
     const userData=JSON.parse(localStorage.getItem('user'))
      setUser(userData);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    naviagte("/")
  };

  const handleResumeHover = () => {
    setIsResumeHovered(true);
    setIsCoverLetterHovered(false);
    setIsUserHovered(false);
  };

  const handleResumeLeave = () => {
    setIsResumeHovered(false); // Set to false when leaving the Resume dropdown
  };

  const handleCoverLetterHover = () => {
    setIsCoverLetterHovered(true);
    setIsResumeHovered(false);
    setIsUserHovered(false);
  };

  const handleCoverLetterLeave = () => {
    setIsCoverLetterHovered(false); // Set to false when leaving the Cover Letter dropdown
  };

  const handleUserHover = () => {
    setIsUserHovered(true);
    setIsCoverLetterHovered(false);
    setIsResumeHovered(false);
  };

  const handleUserLeave = () => {
    setIsUserHovered(false); // Set to false when leaving the user dropdown
  };

  return (
    <div className={style.main}>
      <Link to={'/'}>
        <img className={style.img} src={logo} alt='logo' />
      </Link>

      <div className={style.rightsection}>
        <h4 className={isResumeHovered ? style.active : style.notActive} onMouseEnter={handleResumeHover}>
          Resume
        </h4>

        {isResumeHovered && (
          <div className={style.servicesDiv} onMouseLeave={handleResumeLeave}>
      
            <ServicesOptionList/>
          </div>
        )}
         <Link to={'/ChooseCoverLetter'}>
              <h4>Cover Letter</h4>
            </Link>
        {authToken ? (
          <>
            <h3 className={style.user} onMouseEnter={handleUserHover}>
              {user?.name}
            </h3>
            
            {isUserHovered && (
              <div className={style.logout_box} onMouseLeave={handleUserLeave}>
                <p onClick={handleLogOut}>Log Out</p>
                <a href='/Profile'>
                  <p>Profile</p>
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to={'/Form'}>
              <h4>Create & Login </h4>
            </Link>
       
       
          </>
        )}
        <Link to={'/Blog'}>
          <h4>Blog</h4>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
