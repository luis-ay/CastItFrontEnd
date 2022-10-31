import { useSelector, useDispatch } from "react-redux"
import { Reorder, useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import Choice from "./Choice"
import { addVote , selectPollChoices, updatePoll, fetchSinglePoll, selectPollsStatus, selectPollTitle } from '../../features/pollsSlice'
import { motion } from "framer-motion";
import ShareModal from '../../components/ShareModal'
import { useParams } from "react-router-dom";
import React from 'react';
import { selectUserId } from '../../features/userSlice'



const VotePage = () => {
    const {pollId} = useParams()
    const dispatch = useDispatch()
    const choicesFromStore = useSelector((state) => selectPollChoices(state,pollId))
    const loadingStatus = useSelector((state)=> selectPollsStatus(state))
    const [choices, setChoices] = useState(choicesFromStore)
    const [voters, setVoters] = useState([])
    const [openModal, setOpenModal] = useCycle(false,true)
    const userId = useSelector((state)=> selectUserId(state))
    const [justVoted, setVoted] = useState(false)
    const [title, selectTitle] = useState('')
    
    const handleConfirmation = () => {
        if (!voters.includes(userId) && !justVoted){
            console.log('voters',voters)
            console.log('userId',userId)
            setVoted(true)
            dispatch(updatePoll({vote:choices, pollId: pollId, voter:userId}))
        }
        // dispatch(addVote({vote:choices,pollId: pollId}))
        setOpenModal()
    }

    useEffect(() => {
        dispatch(fetchSinglePoll(pollId)).unwrap().then( poll=> {
            setChoices(poll.choices)
            setVoters(poll.voters)
            selectTitle(poll.title)
        })
        .catch(err=> console.log(err))
        window.scrollTo(0,0)
      }, [dispatch])

    //need to get poll updated info from axios using pollId
    // -get poll info 
    // -render components in framer motion reorder thing, updating local state
    // -at confirmation: use local state info to update vote tally of store.user.polls with map, put request for updating db
    // -confirmation button should have animation and will link to results page
    return (
        <div className="bg-white flex-col justify-center align-middle h-full w-full pt-14 px-10 items-center text-center min-h-screen">
            <h1 className="font-Poppins font-semibold text-4xl tracking-wide text-black mb-8 pb-2 border-b-4 border-gray-200 w-1/2 mx-auto">Vote</h1>
            {((loadingStatus === 'succeeded')) ?  
                <>
                    <p className='text-3xl text-[#EC3E3E] font-bold tracking-wide pt-4'>{title}</p>
                    <p className="font-sans-serif font-thin text-xl text-gray-500">Drag and Drop to Rank Choices</p>
                    <div className="flex justify-center items-center w-9/12 mx-auto mt-6 mb-6">
                        <div className="flex-col">
                            {choices.map((item,index) => 
                            <div key={index} className='bg-gradient-to-br from-[#ff512f] to-[#fc5f86] rounded-lg text-xl mr-4 px-3 py-2 mb-3 text-white font-bold'>{index + 1}</div>
                            )}
                        </div>
                        <Reorder.Group axis="y" onReorder={setChoices} values={choices}>
                            {choices.map((item, index) => 
                                <Choice key={item} choice={item} index={index}/>
                            )}
                        </Reorder.Group>
                    </div>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.05}} onClick={handleConfirmation} className='bg-gradient-to-br from-[#ff512f] to-[#fc5f86] rounded-xl p-4 text-white font-Poppins text-xl font-semibold tracking-widest'>Confirm</motion.button>
                    <ShareModal title={'Thanks For Voting'} pollId={pollId} isVisible={openModal} handleClose={setOpenModal} vote={false}/>
                </>
                :
                <p>loading</p>
            }
        </div>
    )
}


export default VotePage
