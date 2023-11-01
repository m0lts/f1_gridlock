import Body from './components/sections/Body';
import LogIn from './components/pages/accounts/LogIn';
import SignUp from './components/pages/accounts/SignUp';
import ForgotPassword from './components/pages/accounts/ForgotPassword';
import ResetPassword from './components/pages/accounts/ResetPassword';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Body/>} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  )
}

export default App