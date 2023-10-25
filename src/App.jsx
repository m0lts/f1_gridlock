// import { useState } from 'react';
// import Header from './components/header';
// import Body from './components/body';
// import Footer from './components/footer';
// import LogIn from './pages/logIn';
// import SignUp from './pages/signUp';
// import { Route, Routes } from 'react-router-dom';
// import './assets/global.css';


// function App() {
//   return (
//     <>
//       <Header />
//       <main className='appBackground'>
//         <Routes>
//             <Route path='/' element={<Body />} />
//             <Route path='/signup' element={<SignUp />} />
//             <Route path='/login' element={<LogIn />} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default App


import Body from './components/body';
import LogIn from './pages/logIn';
import SignUp from './pages/signUp';
import ForgotPassword from './pages/forgot_password';
import ResetPassword from './pages/reset_password';
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