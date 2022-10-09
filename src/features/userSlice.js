import { createSlice } from '@reduxjs/toolkit';

const {v4: uuidv4} = require('uuid')
const getUserId = () => {
    if (JSON.parse(localStorage.getItem('userId'))) {
        return JSON.parse(localStorage.getItem('userId'))
     } 
        const userId = uuidv4()
        localStorage.setItem('userId', JSON.stringify(userId))
        return userId
}
const initialState = {
    userId: getUserId(),
    polls: []
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPollToUser: (state, action) => {
        const newPollId = action.payload //payload must be entire poll 
        state.polls.push(newPollId)
    }
  }
});


export const { addPollToUser } = userSlice.actions;
export const selectOwnedPolls = (state) => {
    const ownedPolls = state.polls.polls.filter(poll => state.user.userId === poll.owner)
    return ownedPolls
}
export const selectAllVoters = (pollId, state) => state.user.polls.find(poll => poll.pollId === pollId).voters
export const selectUserId = (state) => state.user.userId
export default userSlice.reducer;