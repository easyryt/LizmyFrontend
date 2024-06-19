// components/ForgetPassword.js
import React, { useState } from "react";
import { forgetPassword, verifyOtp, resetPassword } from "../../Api/Api";
import Swal from "sweetalert2";
import styles from "./ForgetPassword.module.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader/CustomLoader";
import CustomCursor from "../CustomCursor/CustomCursor";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()



  const handleSendOtp = async (e) => {
    e.preventDefault();
  
    const emailData = {
      email: email,
    };
  
    try {
      setLoading(true); // Set loading to true when sending OTP
  
      // Assuming forgetPassword function initiates the forgot password process and sends an OTP
      await forgetPassword(emailData);
  
      // Display a message to inform the user that the password reset process has started
      Swal.fire(
        "Success!",
        "A password reset OTP has been sent to your email.",
        "success"
      );
  
      // Hide the email form and show the OTP verification form
      setShowEmailForm(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 error - User not found
        Swal.fire("Oops!", "User not found. Please check your email address.", "error");
      } else {
        // Handle other API errors
        Swal.fire("Oops!", "Something went wrong", "error");
      }
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };
  

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      otp: otp,
      newPassword: newPassword,
    };

    try {
      setLoading(true); // Set loading to true when updating password

      // Assuming resetPassword function takes the email, OTP, and new password as parameters
      await resetPassword(formData);

      // Display a message to inform the user that the password has been reset successfully
      Swal.fire("Success!", "Password reset successfully", "success");
      navigate("/Form")
      // Optionally, you can redirect the user to the login page or perform any other action
    } catch (error) {
      // Handle API error, e.g., if the OTP is invalid or the new password is not strong enough
      Swal.fire("Oops!", "Something went wrong", "error");
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  return (
    <div className={styles.container}>
      <CustomCursor/>
      {loading &&   <CustomLoader/>}
    
      <div className={styles.navBar}>
        <NavBar />
      </div>

      {showEmailForm && (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Forgot Password</h2>
          <form onSubmit={handleSendOtp}>
            <label className={styles.formLabel}>
              Email:
              <input
                className={styles.formInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button className={styles.formButton} type="submit" disabled={loading}>
              send
            </button>
          </form>
        </div>
      )}

      {!showEmailForm && (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Verify OTP</h2>
          <form onSubmit={handleResetPassword}>
            <label className={styles.formLabel}>
             <span>OTP:</span> 
              <input
                className={styles.formInput}
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </label>

            <label className={styles.formLabel}>
              New Password:
              <input
                className={styles.formInput}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <label className={styles.formLabel}>
              Email:
              <input
                className={styles.formInput}
                type="email"
                value={email}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <button className={styles.formButton} type="submit" disabled={loading}>
             update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
