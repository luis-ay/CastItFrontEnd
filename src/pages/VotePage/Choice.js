import { Reorder } from "framer-motion"
import React from 'react';

const Choice = ({choice,index}) => {

    
    return (
            <Reorder.Item value={choice} id={choice} className='tracking-wide bg-white border-2 border-gray-300 rounded-lg text-xl px-2 py-2 text-left mb-2 inline-flex w-full'>
                <div >
                {choice}
                </div>
            </Reorder.Item>
    )
}

export default Choice
