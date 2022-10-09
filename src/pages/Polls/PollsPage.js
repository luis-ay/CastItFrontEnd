import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOwnedPolls, selectUserId } from '../../features/userSlice'
import { motion } from 'framer-motion'
import React from 'react';
import { fetchPolls, selectPollsStatus } from '../../features/pollsSlice';
import { useEffect, useState } from 'react';

const PollsPage = () => {
    const dispatch = useDispatch()
    const [polls, setPolls] = useState([])
    const userId = useSelector((state) => selectUserId(state))
    
    useEffect(() => {
        dispatch(fetchPolls(userId)).unwrap().then(pollsRetrieved => {
            setPolls(pollsRetrieved)
        })
    }, [dispatch])
    

    const renderedPolls = polls.map( (poll,index) => 
        <Link key={index} to={`/results/${poll.pollId}`}>
            <motion.div whileTap={{scale:0.9}} whileHover={{scale:1.05 ,opacity:0.75}} className='flex h-auto justify-center mt-10 mx-auto text-center rounded-3xl text-white bg-gradient-to-br from-[#ff512f] to-[#ef1a7a] m-4 p-4 hover:bg-red-700 hover:-translate-y-1 tracking-tighter max-w-lg'>
                <div className='w-full h-full bg-white rounded-xl m-auto'>
                    <h1 className='font-Poppins font-medium text-xl md:text-3xl text-black pt-2'>
                        {poll.title}
                    </h1>
                    <ul>
                        {poll.choices.map(choice => 
                            <li key={choice} className='text-black py-2 list-disc list-inside md:text-2xl'>{choice}</li>
                            )}
                    </ul>
                </div>
            </motion.div>
        </Link> )
    
    return (
        <section className='bg-white flex-col justify-center align-middle h-auto w-full py-10 px-20 md:px-60 text-center min-h-screen'>
            <h1 className='text-5xl pb-4 border-b-4 border-gray-200 mb-6'>My Polls</h1>
                {polls.length ? (renderedPolls) : <h1 className='text-2xl'>No polls yet, create a new poll to get started.</h1>}
            <Link to='/create'>
                <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.05}} className="border-solid bg-gradient-to-br from-[#ff512f] to-[#fc5f86] p-4 rounded-xl my-12 font-Poppins text-white tracking-wide font-semibold text-lg">Create New Poll</motion.button>
            </Link>
        </section>
    )
}

export default PollsPage