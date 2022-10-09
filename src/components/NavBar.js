import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import React from 'react';


const NavBar = () => {
    return (
        <nav className="navbar hidden md:flex align-middle justify-end space-x-10 p-4 text-gray-600 font-Poppins">
            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.9}} className='py-1 bg-[#ec3e3e] rounded-md'>
                <Link className="scale-0 md:scale-100 text-xl tracking-wide text-white font-Poppins px-4" to="/create">Create Poll</Link>
            </motion.button>
                <Link className="scale-0 md:scale-100 text-xl tracking-wide text-gray-600 font-Poppins hover:underline hover:opacity-80 pt-1" to="/">Home</Link>
                <Link className="scale-0 md:scale-100 text-xl tracking-wide text-gray-600 font-Poppins hover:underline hover:opacity-80 pr-6 pt-1" to="/polls">My Polls</Link>
        </nav>
    )
}

export default NavBar