import { Link } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react';

const NavDrawer = ({handleClose, isVisible}) => {

    const slideIn = {
        hidden: {
            x: '200vw',
            opacity: 1,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 10,
                stiffness: 30,
            }
        },
        exit: {
            x: '200vw',
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 10,
                stiffness: 30,
            }
        }
    }

    const phaseIn = {
        hidden: {
            x: 0,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 0.5,
            transition: {
                duration: 1.5,
            }
        },
        exit: {
            x: 0,
            opacity: 0,
            transition: {
                duration: 0,
            }
        }
    }

    return (
        <AnimatePresence >
            { isVisible && (
            <motion.div className="fixed w-full h-full z-20">

                <motion.div 
                    className="navDrawer-backdrop absolute w-1/2 h-screen flex-col bg-gray-400 z-15"
                    variants={phaseIn}
                    initial='hidden'
                    animate='visible'
                    exit={'exit'}
                    >
                </motion.div>
                    
                <motion.nav className="navDrawer absolute left-1/4 w-9/12 h-screen border-gray-50 border-2 py-8 flex-col text-center m-0 bg-white z-20"
                    variants={slideIn}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    >
                    <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-0 top-0 h-16 p-4 z-20" onClick={handleClose} whileTap={{scale:0.9}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                    <div className="mb-16">
                        <h1 className=" font-Poppins font-black text-5xl tracking-wide bg-gradient-to-br from-[#ff512f] to-[#fc567f] text-transparent bg-clip-text">CastIt</h1>
                        <p className="text-gray-300">v1.0.3</p>
                    </div>
                    <ul className="flex-col space-y-16 text-3xl tracking-wide text-black font-Poppins z-20 text-center">
                        <li>
                            <div className=" bg-gradient-to-br from-[#ff512f] to-[#fc567f] mx-14 pb-1">
                                <div className="bg-white w-full h-full">
                                    <Link to="/" onClick={handleClose} >Home</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className=" bg-gradient-to-br from-[#ff512f] to-[#fc567f] mx-14 pb-1">
                                <div className="bg-white w-full h-full">
                                    <Link to="/polls" onClick={handleClose} >My Polls</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className=" bg-gradient-to-br from-[#ff512f] to-[#fc567f] mx-14 pb-1">
                                <div className="bg-white w-full h-full">
                                    <Link to="/create" onClick={handleClose}>Create Poll</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className=" bg-gradient-to-br from-[#ff512f] to-[#fc567f] mx-14 pb-1">
                                <div className="bg-white w-full h-full">
                                    <Link to="/about" onClick={handleClose}>About</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </motion.nav>
            </motion.div>
        )}
        </AnimatePresence>
    )
}

export default NavDrawer