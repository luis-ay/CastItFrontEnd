import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import React from 'react';

const ShareModal = ({title, pollId, isVisible, handleClose, vote}) => {

    const phaseIn = {
        hidden: {
            scale: 0.3,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.2,
            }
        },
        exit: {
            scale:0.6,
            opacity: 0,
            transition: {
                duration: 0,
            }
        }
    }

    const phaseBackground = {
        hidden: {
            x: 0,
            opacity: 0.3,
        },
        visible: {
            x: 0,
            opacity: 0.5,
            transition: {
                duration: 0.2,
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

    const share = {
        title: 'Vote on My CastIt Poll',
        url: `https://castit.netlify.app/#/vote/${pollId}`,
        text: 'Vote on My CastIt Poll',
    }

    async function handleShare() {
        try {
            await navigator.share(share)
        } catch (error) {
            console.log('Message not received')
            console.log(error.message)
        }
        }


    return (
        <AnimatePresence >
            { isVisible && (
            <motion.div className="fixed w-full h-full top-0 left-0 flex-col justify-center align-middle z-20">

                <motion.div 
                    className="modal-backdrop absolute w-full h-full flex-col bg-gray-400 z-15"
                    variants={phaseBackground}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    >
                </motion.div>
                
                <motion.div
                className="modal relative w-11/12 md:w-1/2 h-40 bg-white z-20 mx-auto mt-80 rounded-lg text-center"
                variants={phaseIn}
                initial='hidden'
                animate='visible'
                exit='exit'
                >   
                    <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-0 top-0 h-14 p-4 z-20" onClick={handleClose} whileTap={{scale:0.9}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                    <h1 className="mb-2 font-Poppins font-semibold text-2xl tracking-wide text-black pt-4">{title}</h1>
                    <div className="inline-flex mb-2">
                        <div className="text-md border-gray-300 border-2 ml-2 pl-1 h-8 inline-flex rounded-md text-ellipsis overflow-hidden">
                            <svg className="w-8 h-6" fill="none" stroke="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            <p className="text-gray-500">https://castit/vote/{pollId}</p>
                        </div>
                        <motion.button className="bg-[#ff512f] text-white rounded-md text-sm px-1 mr-2 ml-1 font-medium" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={()=>navigator.clipboard.writeText(share.url)}>Copy</motion.button>
                    </div>
                    <div className="w-full inline-flex justify-center my-1">
                        {vote && (
                            <Link to={`/vote/${pollId}`} onClick={handleClose}>
                                <motion.div className="bg-[#ff512f] rounded-md p-2 text-white font-Poppins font-medium mx-4 inline-flex">
                                    Vote
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 pl-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                    </svg>
                                </motion.div>
                            </Link>
                        )}
                        {!vote && (
                            <Link to={`/results/${pollId}`} onClick={handleClose}>
                                <motion.div className="bg-[#ff512f] rounded-md p-2 text-white font-Poppins font-medium mx-4 inline-flex">
                                    Results
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 pl-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                    </svg>
                                </motion.div>
                            </Link>
                        )}
                        <motion.button onClick={handleShare} className="bg-[#ff512f] rounded-md p-2 text-white font-Poppins font-medium mx-4 inline-flex">
                            Share
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 pl-1 py-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ShareModal