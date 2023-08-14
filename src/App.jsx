import { useState } from 'react';
import Header from './components/header';
import GrandPrix from './windows/Hero/grandPrix';
import WindowOne from './windows/WindowOne/windowOne';
import WindowTwo from './windows/WindowTwo/windowTwo';
import WindowThree from './windows/WindowThree/windowThree';
import WindowFour from './windows/WindowFour/windowFour';
import Footer from './components/footer';
import './assets/global.css';


function App() {
  return (
    <>
      <Header />
      <main className='appBackground'>
        <GrandPrix />
        <section className="sectionOne">
          <WindowOne />
          <WindowTwo />
        </section>
        {/* <section className="sectionTwo">
          <WindowThree />
          <WindowFour />
        </section> */}
      </main>
      <Footer />
    </>
  )
}

export default App
