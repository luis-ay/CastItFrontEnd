import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPollToUser, selectUserId } from "../../features/userSlice"
import { addNewPoll, addPoll } from "../../features/pollsSlice"
import { motion, useCycle } from "framer-motion"
import ShareModal from "../../components/ShareModal"
import React from 'react';

const CreationPage = () => {
    const {v4: uuidv4} = require('uuid')
    const [id, setId] = useState(uuidv4())
    const [title, setTitle] = useState((JSON.parse(localStorage.getItem('title'))) ? JSON.parse(localStorage.getItem('title')) : "")
    const [choices, setChoices] = useState((JSON.parse(localStorage.getItem('choices'))) ? JSON.parse(localStorage.getItem('choices')) : ["","",""])
    const [modalOpen, setModalOpen] = useCycle(false, true)
    const [inputDisable, setInputDisable] = useState(false)
    
    const userId = useSelector(state => selectUserId(state))
    const handleModalOpen = () => {
        setModalOpen()
    }


    const userPolls = useSelector(state => state.user.polls) //only being used for now
    const dispatch = useDispatch()

    const addChoice = () => {
        if (choices.length < 10) {
            const newChoice = ""
            const newChoices = [...choices, newChoice]
            setChoices(newChoices)
        }
    }

    const setAndSaveChoices = (newChoices) => {
        setChoices(newChoices)
        localStorage.setItem('choices', JSON.stringify(newChoices))
    }
    
    const removeChoice = (idx) => {
        const newChoices = choices.filter((item,index) => index !== idx)
        setAndSaveChoices(newChoices)
    }
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
        localStorage.setItem('title', JSON.stringify(event.target.value))
    }

    const handleChoiceChange = (idx, event) => {
        const newChoices = [...choices]
        newChoices[idx] = event.target.value
        setAndSaveChoices(newChoices)
    }

    
    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    const hasDuplicates = (arr) => {
        const nonEmptyChoices = arr.filter(choice => choice !== "")
        const set = new Set(nonEmptyChoices)
        return (set.size !== nonEmptyChoices.length)
    }


    const handleConfirmation = (e) => {
        e.preventDefault()
        if (hasDuplicates(choices)){
            window.alert('Please make options unique.')
            return null
        }
        const newPoll = {
            pollId: id,
            owner: userId,
            title: title,
            choices: choices,
            votes: [],
            voters: []
        }
        
        if (!userPolls.includes(newPoll.pollId)) {
            dispatch(addNewPoll(newPoll))
            dispatch(addPoll(newPoll))
            dispatch(addPollToUser(id))
            setInputDisable(!inputDisable)
            localStorage.removeItem('title')
            localStorage.removeItem('choices')
        }
        handleModalOpen()
        
    }

    return (
        <div>
            <form className="bg-white flex-col justify-center w-full p-1 align-middle" onSubmit={handleConfirmation}>
                <div className="w-10/12 p-10 mt-10 mx-auto shadow-[20px_30px_50px_10px_rgba(0,0,0,0.2)] text-center rounded-lg bg-white max-w-lg">
                    <h1 className="font-Poppins font-semibold text-4xl tracking-wide text-black mb-10 pb-2 border-b-4 border-gray-200">Create</h1>
                    <div className="relative">
                        <input disabled={inputDisable} maxLength={30} required autoComplete='off' type="text" id="floating_outlined" className="appearance-none block px-2.5 p-4 w-full text-md text-gray-900 bg-white rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#FF6366] ring-0 peer" placeholder=" " onChange={handleTitleChange} value={title}/>
                        <label htmlFor="floating_outlined" className="absolute text-2xl text-gray-500 duration-300 transform -translate-y-10 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 peer-focus:text-[#FF6366] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-10 left-1">Title</label>
                    </div>
                    <div className="mt-10 w-full">
                        {choices.map((choice, idx) => <ChoiceInput name={choice} idx={idx} key={idx} removeChoice={removeChoice} handleChoiceChange={handleChoiceChange} inputDisable={inputDisable}/> )}
                    </div>
                    <div>
                        <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10 shadow-[5px_5px_10px_4px_rgba(70,70,70,0.12)] rounded-full mx-auto my-10" whileTap={{scale:0.9}} whileHover={{scale:1.05}} onClick={() => addChoice()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </motion.svg>
                        <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.05}} type='submit' className='bg-gradient-to-br from-[#ff512f] to-[#fc5f86] rounded-xl p-4 text-white font-Poppins text-xl font-semibold tracking-widest'>Confirm</motion.button>
                    </div>
                </div>
            </form>
            <ShareModal handleClose={handleModalOpen} title={"Share Your Poll"} isVisible={modalOpen} pollId={id} vote={true}/>
        </div>
    )
}

const ChoiceInput = ({name, idx, handleChoiceChange, removeChoice, inputDisable}) => {

    return (
        <div className="my-1 w-full relative flex py-4 z-10">
            <input disabled={inputDisable} required maxLength="30" autoComplete='off' type="text" id={`floating_outlined_${idx}`} className="appearance-none z-1 p-4 w-full text-md text-gray-900 bg-white rounded-lg border-2 border-gray-200 ring-0 focus:outline-none focus:border-[#FF6366] peer" placeholder=" " value={name} onChange={event => handleChoiceChange(idx,event)} idx={idx}/>
            <label htmlFor={`floating_outlined_${idx}`} className="absolute text-2xl text-gray-500 duration-300 transform -translate-y-14 scale-75 top-11 left-2 origin-[0] px-2 peer-focus:text-[#FF6366] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-14 ">Option {idx + 1}</label>
            {(idx > 1) && (
            <motion.div whileTap={{scale:0.9}} whileHover={{scale:1.05}} onClick={()=>removeChoice(idx)} className='relative top-3 bg-gradient-to-br from-[#ff512f] to-[#fc5f86] rounded-full ml-2 h-8 w-10 p-1'>
                <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff512f"  whileTap={{scale:0.9}} whileHover={{scale:1.05}} onClick={()=>removeChoice(idx)} className='bg-white rounded-full w-full h-full'>
                <path strokeLinecap="round" strokeLinejoin="round"  d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
            </motion.div>
            )}
        </div>
    )
}

export default CreationPage

