import React, { useState, useEffect } from "react";
import { getUserProfile, updateProfile } from "../../Api/Api";
import Swal from "sweetalert2";
import style from "./ProfileDetails.module.css";
import dp  from "../Images/dp_icon.gif"
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import { loadingStatus } from "../../Recoil";
import { useRecoilState } from "recoil";

function ProfileDetails() {
  const [userProfileData, setUserProfileData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useRecoilState(loadingStatus);
  // Initialize editedProfileData with the current user data
  const [editedProfileData, setEditedProfileData] = useState({});

  // Fetch the user profile data when the component mounts
  useEffect(() => {
    handleuserProfile();
    // Set initial edited profile data
    setEditedProfileData(userProfileData);
  }, []);

  const handleuserProfile = async () => {
    setLoading(true)
    try {
      const response = await getUserProfile();

      if (response.status === true) {
        setUserProfileData(response.data);
      } else {
        console.error("Error fetching user profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }finally{
      setLoading(false)
    }
  };

  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();

    formData.append("name", editedProfileData.name);
    formData.append("email", editedProfileData.email);

    try {
      const response = await updateProfile(formData);
      const { status, message } = response.data;

      Swal.fire("Success", "Profile updated successfully", "success");
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      Swal.fire("Error", "Profile update failed", "error");
    }finally{
      setLoading(false)
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  return (
    <div className={style.main}>
      {isEditMode ? (
        <form className={style.form}  onSubmit={handleEditSubmit}>
          <div className={style.head}>
            <h1>Edit Profile</h1>
            <button className={style.head_btn} onClick={() => setIsEditMode(false)}><CancelIcon/></button>
          </div>

          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editedProfileData.name}
              placeholder={userProfileData.name}
              onChange={(e) =>
                setEditedProfileData({
                  ...editedProfileData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editedProfileData.email}
              placeholder={userProfileData.email}
              onChange={(e) =>
                setEditedProfileData({
                  ...editedProfileData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <br/>
          <button type="submit" className={style.save_btn}>Save Changes</button>
        </form>
      ) : (
        <div className={style.info_box}>
          <div className={style.head}>
            <h1>Profile</h1>
            <button className={style.head_btn} onClick={handleEditClick}>
              <EditNoteIcon />
            </button>
          </div>
          <div className={style.img_box}>
            <img src={dp} alt="dp" />
          </div>
          <br/>
          <hr className={style.hr}/>
            <div className={style.user_box}>
            <p><strong>Name: </strong>{userProfileData?.name}</p>
             <p><strong>Email: </strong>{userProfileData?.email}</p>
            </div>
         
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
