import axios from 'axios';


//testing

const BASE_URL = 'https://lizmyresume.onrender.com';

const authToken = JSON.parse(localStorage.getItem("token"))



export const getArticle = async (selectedSubid) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/admin/resumeexampleartical/getResumeExampleArtical/${selectedSubid}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


export const registration = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/register`, formData );
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};

export const otpverification = async (OTP) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/verify`, OTP );
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};


export const sendOtp = async (resendOtp) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/resendOtp`, resendOtp );
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};
export const forgetPassword= async (emailData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/forgetPass`, emailData );
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};
export const resetPassword= async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/resetPassword`, formdata);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};


// export const signInuser = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/user/auth/logIn`, formData );
//     const { status, message, data } = response.data;
//     console(response,"signi")
//   } catch (error) {
//     console.error('Error creating resume:', error.message);

//   }
// };


// export const signInuser = async (formData) => {
//   let errorMessage;

//   try {
//     const response = await axios.post(`${BASE_URL}/user/auth/logIn`, formData);

//     // Assuming the API returns a JSON response with status and message
//     const { status, message, data } = response.data;

//     // Log the response data
//     console.log('Sign In Response:', { status, message, data });
//   } catch (error) {
//     // Check if the error is an Axios error (HTTP error) or a network error
//     if (axios.isAxiosError(error)) {
//       // Axios error (HTTP error)
//       const { response } = error;

//       // Set the error message
//       errorMessage = response?.data?.message;

//       // Log the error message as a string
//       console.log('Error Message:', JSON.stringify(errorMessage));
//     } else {
//       // Network error (e.g., no internet connection)
//       errorMessage = error.message;
//       console.log('Network Error:', errorMessage);
//     }
//   }

// };











export const getUserProfile = async () => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.get(`${BASE_URL}/user/auth/profile`, {headers});
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};

export const getlastResume = async () => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.get(`${BASE_URL}/user/resume/getLatestResume`, {headers});
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


export const getUserCoverLetter = async () => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.get(`${BASE_URL}/user/coverletter/getYourCoverLetter`, {headers});
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


export const getAllArticleCategoy = async () => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getAllResumeCateEx`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};
export const getAllSubArticleCategoy = async (selectedid) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getAllResumeSubCateEx/${selectedid}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};

export const getAllCategoy = async () => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getAllCategoy`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};
export const getAllBlog = async () => {
  
  try {
    const response = await axios.get(`${BASE_URL}/admin/getAllBlog`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};






export const getResume = async (selectedCategory) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getFilteredDummyResume?category=${selectedCategory}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


// getAllTimeslot




// updateProfile

export const updateProfile = async (updatedData) => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.put(`${BASE_URL}/user/auth/updateProfile`, updatedData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};
// updateProfile

export const updateResume = async (id,formData) => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.put(`${BASE_URL}/user/resume/updateResumeUser/${id}`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};

//DeleteProduct



















export const getAllSummary = async (selectedCategory) => {

  try {
    const response = await axios.get(`${BASE_URL}/user/public/getSummary?category=${selectedCategory}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};




export const getAllSkills = async (selectedCategory) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getSkills?category=${selectedCategory}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};



export const getAllAreaofInterest = async (selectedCategory) => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/areaOfInterest?category=${selectedCategory}`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


export const getAllLanguages = async () => {
  
  try {
    const response = await axios.get(`${BASE_URL}/user/public/getLanguages`, {
    });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error getting services:', error.message);
    throw new Error('Failed to get services');
  }
};


//addResume


export const createResume = async (Data) => {

  try {
    const response = await axios.post(`https://htmltopdf-yf6w.onrender.com/convert`, Data);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};

export const addResume = async (formData) => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
  };
  try {
    const response = await axios.post(`${BASE_URL}/user/resume/createResume`, formData, { headers });
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating resume:', error.message);

  }
};







//addCoverLetter

export const addCoverLetter = async (formData) => {
  const headers = {
    'x-auth-token': authToken,
    'Content-Type': 'application/json', // Set the content type for JSON data
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/user/coverletter/createCoverLetter`,
      formData,
      { headers }
    );

    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error creating cover letter:', error.message);
    // Handle the error as needed
  }
};



//addCategory

export const addCategory= async ( formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/createDummyCategoy`, formData);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};


export const addSummary= async ( formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/createSummary`, formData);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};
export const addSkills= async ( formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/createSkills`, formData);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};

export const addAreaOfInterest= async ( formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/areaOfInterest`, formData);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};

export const addLanguages= async ( formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/languages`, formData);
    const { status, message, data } = response.data;
    return { status, message, data };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    throw new Error('Failed to update blog');
  }
};





