import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as Components from "./Components";
import "./styles.css";
import style from "./Form.module.css";
import {
  registration,
  signInuser,
  sendOtp,
  otpverification,
} from "../../Api/Api"; // Assuming you have API functions for OTP
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomLoader from "../CustomLoader/CustomLoader";
import CustomCursor from "../CustomCursor/CustomCursor";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();



  const handleSignIn = async (e) => {
    const data= JSON.parse(localStorage.getItem("pendingData"))
    const Rmsubmit=localStorage.getItem("submit")
    const Cvsubmit=localStorage.getItem("coverletter")
    setLoading(true);
    e.preventDefault();
    let errorMessage;

    try {
      const response = await axios.post(
        `https://lizmyresume.onrender.com/user/auth/logIn`,
        formData
      );

      // Assuming the API returns a JSON response with status and message
      const { status, message, data } = response.data;
      if (status) {
        localStorage.setItem("token", JSON.stringify(data));
        alert("login successfull")
   
         if(Rmsubmit === "true") {
          const data= JSON.parse(localStorage.getItem("pendingData"))
           localStorage.setItem('resume', JSON.stringify(data));
          navigate("/CreateResume")
         } else if (Cvsubmit === "true"){
           navigate("/CoverLetterForm")
         }else{
          navigate("/")
         }
      }
    } catch (error) {
      // Check if the error is an Axios error (HTTP error) or a network error
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        errorMessage = response?.data?.message;
        alert(errorMessage);
        // Log the error message as a string
        console.log("Error Message:", JSON.stringify(errorMessage));

        if (
          errorMessage === "Email is not verified. Please verify your email"
        ) {
          setShowOtpModal(true);
        }
      } else {
        // Network error (e.g., no internet connection)
     
        errorMessage = error.message;
        console.log("Network Error:", errorMessage);
        alert("Something went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    let errorMessage;

    try {
      const response = await axios.post(
        `https://lizmyresume.onrender.com/user/auth/register`,
        formData
      );

      // Assuming the API returns a JSON response with status and message
      const { status, message, data } = response.data;

      // Log the response data
      console.log("Sign In Response:", { status, message, data });

      setShowOtpModal(true);
    } catch (error) {
      // Check if the error is an Axios error (HTTP error) or a network error
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;

        // Set the error message
        errorMessage = response?.data?.message;

        // Log the error message as a string
        console.log("Error Message:", JSON.stringify(errorMessage));
        alert("Something went Wrong");
      } else {
        alert("Something went Wrong");
        errorMessage = error.message;
        console.log("Network Error:", errorMessage);
      }
    } finally {
      setLoading(false);
      alert("SignUp successfully");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    const OTP = {
      email: formData.email,
      otp: otp,
    };

    try {
      await otpverification(OTP);
      setShowOtpModal(false);
    } catch (error) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
      alert("OTP verified successfully");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const resendOtp = {
      email: formData.email,
    };

    try {
      await sendOtp(resendOtp);
    } catch (error) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
      alert("OTP resent successfully");
    }
  };

  return (
    <div className={style.main}>
      {loading && <CustomLoader />}
      <div className={style.nav_Bar}>
        <NavBar />
      </div>

      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Components.Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Components.Button onClick={handleSignUp}>
              Sign Up
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Components.Anchor href="/ForgetPassword">
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={handleSignIn}>
              Sign In
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start the journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className={style.otpModal}>
          <div className={style.otpContent}>
            <h2>Verify OTP</h2>
            <p>An OTP has been sent to your email. Enter the OTP below:</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtpVerification}>Verify OTP</button>
            <button onClick={handleResendOtp}>Resend OTP</button>
          </div>
        </div>
      )}
    </div>
  );
}
