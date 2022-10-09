import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import firstImage from '../../assets/homeFirst.svg'
import phoneImage from '../../assets/image1.png'
import resultsImage from '../../assets/resultsImage.png'
import { useEffect } from "react"
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { selectUserId } from "../../features/userSlice"
import { selectPollsStatus, fetchPolls } from '../../features/pollsSlice'

const HomePage = () => {
    const dispatch = useDispatch()
    const pollsStatus = useSelector((state) => selectPollsStatus(state))
    const userId = useSelector((state) => selectUserId(state))

    useEffect(() => {
        if(pollsStatus === 'idle') {
            dispatch(fetchPolls(userId))
        }
        window.scrollTo(0,0)
    },[pollsStatus,dispatch,userId])

    return (
        <div className="bg-white flex-col justify-center align-middle w-full pt-10 px-auto text-center">
            <section className="w-full h-full min-h-full">
                <h1 className="mb-2 font-Poppins font-black text-8xl tracking-wide bg-gradient-to-br from-[#ff512f] to-[#fc567f] text-transparent bg-clip-text">CastIt</h1>
                <p className="font-sans-serif font-thin text-xl text-gray-500 mt-10 md:mb-12">The simple way to make group decisions.</p>
                <img src={firstImage} alt="rank voting shown" className="mt-6 px-8 md:h-auto md:mx-auto"></img>
                <Link to='/create'>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.05}} className="border-solid bg-gradient-to-br from-[#ff512f] to-[#fc5f86] p-4 rounded-xl my-14 font-Poppins text-white tracking-wide font-semibold text-lg">Get Started</motion.button>
                </Link>
            </section>
            <hr></hr>
            <section className="w-full h-full mt-10 min-h-screen">
                <h1 className="mb-4 font-Poppins font-semibold text-4xl tracking-wide text-black ">How it Works</h1>
                <p className="font-sans-serif font-thin text-xl text-gray-500 mb-10 px-10">Create a poll. Send a link. And you're done.</p>
                <div className="rounded-lg overflow-hidden mx-16 p-auto md:mx-60 md:h-auto">
                    <img src={phoneImage} alt="rank voting shown" ></img>
                </div>
                <p className="font-sans-serif font-thin text-xl text-gray-500 mt-20 mb-10 px-10">CastIt uses ranked voting to make decisions less difficult amongst friends.</p>
                <div className="rounded-lg p-auto md:mx-80">
                    <img src={resultsImage} alt="rank voting shown" ></img>
                </div>
                <p className="font-sans-serif font-thin text-xl text-gray-500 my-10 px-10">The CastIt voting process eliminates least wanted options and takes following ranks into account until a winner is found.</p>
                <h1 className="mb-2 font-Poppins font-semibold text-2xl tracking-wide text-black ">Create Your First Poll Now</h1>
                <Link to='/create'>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.05}} className="border-solid bg-gradient-to-br from-[#ff512f] to-[#fc5f86] p-4 rounded-xl my-12 font-Poppins text-white tracking-wide font-semibold text-lg">Get Started</motion.button>
                </Link>
            </section>
            <section className="w-full h-full mt-10">
            </section>
        </div>
    )
}

export default HomePage