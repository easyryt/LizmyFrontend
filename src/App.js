import logo from './logo.svg';
import './App.css';
import NavBar from './Component/NavBar/NavBar';
import Home from './Page/Home/Home';
import FirstSection from './Sections/FirstSection/FirstSection';
import Footer from './Component/Footer/Footer';
import SecondSection from './Sections/SecondSection/SecondSection';
import CustomCursor from './Component/CustomCursor/CustomCursor';
import { useRecoilState } from 'recoil';
import { loadingStatus } from './Recoil';
import CustomLoader from './Component/CustomLoader/CustomLoader';
import { useEffect } from 'react';
import axios from 'axios';



function App() {
  const [loading, setLoading] = useRecoilState(loadingStatus);
  useEffect(()=>{
  testingBeckend()
  },[])

   const  testingBeckend = async () => {
  
    try {
      const response = await axios.get(`https://www.backend.lizmy.com`, {
      });
      const { status, message, data } = response.data;
           console.log(response,"https://www.backend.lizmy.com")
    } catch (error) {
      console.error('Error getting services:', error.message);
    }
  };


  return (
    <div className="App">
      {loading &&  <CustomLoader />}
      <NavBar/>
      <Home/>
      <FirstSection/>
      <SecondSection/>
      <Footer/>
    </div>
  );
}

export default App;
