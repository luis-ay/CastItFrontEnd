import NavBar from "./NavBar"
import NavDrawer from "./NavDrawer"
import { motion } from "framer-motion"
import { useCycle } from "framer-motion"
import { Link } from "react-router-dom"
import logo from '../assets/finalLogo.svg'
import React from 'react';


const Header = () => {
    const [drawerOpen, setDrawerOpen] = useCycle(false, true)
    
    const handleDrawerOpen = () => {
        setDrawerOpen()
    }

    return (
        <div className="top-0 left-0 z-20 w-full h-full bg-white shadow-lg border-b-2 mb-8">
            <Link className="hover:opacity-80" to="/">
                <img src={logo} alt='logo' className="absolute top-0 left-0 h-16 w-20 mx-6 mt-0.5 scale-150" to='/'></img>
            </Link>
            <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute md:hidden right-0 p-4 mx-1 h-16 z-5" whileTap={{scale:0.9}} onClick={handleDrawerOpen} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </motion.svg>
            <NavBar/>
            <NavDrawer handleClose={handleDrawerOpen} isVisible={drawerOpen}/>
        </div>
    )
}

export default Header