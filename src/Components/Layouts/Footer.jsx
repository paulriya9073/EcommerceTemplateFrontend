import React from 'react'
import appstore from "/Appstore.png"
import playstore from "/playstore.png"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
 <>
 <footer className='flex flex-col justify-evenly md:flex-row bg-slate-900 text-white md:h-80 p-7 md:p-14 gap-4 '>

      <div className="leftFooter flex flex-col gap-4 md:justify-center md:items-center">

        <h4 className='font-medium text-2xl'>DOWNLOAD OUR APP</h4>
        <hr className='w-72  ' />
        <p>Download App for Android and IOS mobile phone</p>
       <img className='w-32 md:w-40 hover:cursor-pointer' src={appstore} alt="" />
      <img className='w-32 md:w-40 hover:cursor-pointer' src={playstore} alt="" />
      </div>

      <div className="midFooter leftFooter flex flex-col gap-4 md:justify-center md:items-center">

        <h1 className='font-medium text-4xl md:text-6xl'>RIRI</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; RIRI</p>
      </div>

      <div className="rightFooter leftFooter flex flex-col gap-4 md:justify-center md:items-center">

        <h4 className='font-medium text-2xl'>Follow Us</h4>
        <hr className='w-36' />

        <div className='flex flex-col justify-start gap-3 items-start'>
        <div className='flex justify-center items-center gap-2'>
        <FaInstagram/>
        <a href="http://instagram.com">
        Instagram</a>
        </div>

        <div className='flex justify-center items-center gap-2'>
        <FaYoutube/>
        <a href="http://youtube.com">
        Youtube
        </a>
        </div>
       
        <div className='flex justify-center items-center gap-2'>
     <FaFacebook/>
     <a href="http://instagram.com">
     Facebook</a>
     </div>
        </div>
  
      </div>
    </footer>
 </>
  )
}

export default Footer