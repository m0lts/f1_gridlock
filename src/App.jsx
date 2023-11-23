import Races from './components/pages/races/Races';
import Predictions from './components/pages/predictions/Predictions';
import LogIn from './components/pages/accounts/LogIn';
import SignUp from './components/pages/accounts/SignUp';
import ForgotPassword from './components/pages/accounts/ForgotPassword';
import ResetPassword from './components/pages/accounts/ResetPassword';
import { Route, Routes } from 'react-router-dom';
import Standings from './components/pages/standings/Standings';
import Information from './components/pages/information/Information';
import HomePage from './components/HomePage';
import { useState, useEffect } from 'react';


function App() {

  // Get race data for whole season (1 API CALL PER REFRESH)

    // Competition = race weekend
    // Country = country related
    // Circuit = track related
    // Race = actual race

    const [apiRequest, setApiRequest] = useState('races?season=2023&timezone=Europe/London');
    const [returnedApiData, setReturnedApiData] = useState([])

    console.log(returnedApiData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/externalData/CallAPI.js', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiRequest),
                });
            
                // Receive returned data and set state with data.
                if (response.ok) {
                    const responseData = await response.json();
                    setReturnedApiData(responseData.result.response);
                    } else {
                    console.log('failure');
                    }
                } catch (error) {
                console.error('Error submitting form:', error);
                }
        }

        fetchData();

    }, [apiRequest])

  return (
    <Routes>
      <Route path='/' element={<HomePage />}>
        <Route 
          index 
          element={<Races returnedApiData={returnedApiData} />} />
        <Route path='predictions' element={<Predictions returnedApiData={returnedApiData} />} />
        <Route path='standings' element={<Standings />} />
        <Route path='information' element={<Information />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  )
}

export default App