import { useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import LogIn from './pages/logIn';
import SignUp from './pages/signUp';
import { Route, Routes } from 'react-router-dom';
import './assets/global.css';


function App() {
  return (
    <>
      <Header />
      <main className='appBackground'>
        <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
