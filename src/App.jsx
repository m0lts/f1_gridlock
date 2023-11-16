import NavSystem from './components/sections/NavSystem';
import Races from './components/pages/races/Races';
import Predictions from './components/pages/predictions/Predictions';
import LogIn from './components/pages/accounts/LogIn';
import SignUp from './components/pages/accounts/SignUp';
import ForgotPassword from './components/pages/accounts/ForgotPassword';
import ResetPassword from './components/pages/accounts/ResetPassword';
import { Route, Routes } from 'react-router-dom';
import Standings from './components/pages/standings/Standings';
import Information from './components/pages/information/Information';
import { useState, useEffect } from 'react';


function App() {
  return (
    <Routes>
      <Route path='/' element={<NavSystem />}>
        <Route 
          index 
          element={<Races />} />
        <Route path='predictions' element={<Predictions />} />
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