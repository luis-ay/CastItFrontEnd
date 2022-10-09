import { Link } from "react-router-dom"
import React from 'react';


const Footer = () => {
    let copyright = String.fromCodePoint(0x00A9)
    return (
        <div className="bottom-0 left-0 right-0 w-full max-h-28 text-center bg-white mt-20">
            <hr></hr>
            <h1 className="text-xl tracking-wide text-black font-Poppins pt-2">Contact Us</h1>
            <h1 className="text-sm tracking-wide text-gray-400 font-Poppins ">contact@castit.app</h1>
            <Link className="text-md underline tracking-wide text-black font-Poppins hover:underline hover:opacity-80 p-2" to='/about'>About</Link>
            <p className="text-xs text-gray-300 text-center mt-4">{copyright} 2022 CastIt Co. All rights reserved.</p>
        </div>
    )
}

export default Footer