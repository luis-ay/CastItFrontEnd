import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const POLLS_URL = 'https://castit-backend.herokuapp.com'

const initialState = {
    polls:[],
    status: 'idle',
    error: null
}

//will fetch user owned polls, will take place at home route and poll route
export const fetchPolls = createAsyncThunk('polls/fetchPolls', async (userId) => {
    try {
        const response = await axios.get(`${POLLS_URL}/${userId}`) //might need to be `POLLS_URL/userId`
        return [...response.data]
    } catch (err) {
        return err.message
    }
})

export const fetchSinglePoll = createAsyncThunk('polls/fetchSinglePoll', async(pollId) => {
    try {
        const response = await axios.get(`${POLLS_URL}/poll/${pollId}`)
        return response.data
    } catch (err) {
        return err.message
    }
})

//will take place at creation confirmation
export const addNewPoll = createAsyncThunk('polls/addNewPoll', async (newPoll) => {
    console.log('adding new poll:',newPoll)
        const response = await axios.post(`${POLLS_URL}/create`, newPoll)
        return response.data
})

//will take place at voting confirmation
export const updatePoll = createAsyncThunk('polls/updatePoll', async (voteObj) => {
        const pollId = voteObj.pollId
        console.log('sending vote off vote:',{vote:voteObj.vote})
        console.log('sending vote off to poll with id:',pollId)
        try {
            const response = await axios.patch(`${POLLS_URL}/poll/${pollId}`,{vote: voteObj.vote , voter:voteObj.voter})
            return response.data
        } catch (err) {
            return err.message
        }
})

const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    addPoll: (state, action) => {
        const newPoll = action.payload //payload must be entire poll 
        state.polls.push(newPoll)
    },
    addVote: (state, action) => {
        const vote = action.payload.vote
        const chosenPollId = action.payload.pollId
        const chosenPoll = state.polls.find(poll => poll.pollId === chosenPollId)
        chosenPoll.votes = [...chosenPoll.votes, vote]
        chosenPoll.voters = [...chosenPoll.voters, state.userId]
        state.polls.map(poll => (poll.pollId === chosenPollId ? chosenPoll : poll))
    },
  },
  extraReducers(builder) {
    builder
        .addCase(fetchPolls.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPolls.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.polls = state.polls.concat(action.payload)
        })
        .addCase(fetchPolls.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(fetchSinglePoll.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchSinglePoll.fulfilled, (state, action) => {
            state.status = 'succeeded'
            console.log('fetched poll',action.payload)
            state.polls = state.polls.filter(poll => poll.pollId !== action.payload.pollId)
            state.polls = state.polls.concat(action.payload)
        })
        .addCase(fetchSinglePoll.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPoll.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        .addCase(addNewPoll.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(updatePoll.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        .addCase(updatePoll.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
  }
});


export const selectResults = (state, pollId) => {
    if (state.polls.polls.find(poll => poll.pollId === pollId)) {
        const chosenPollVotes = state.polls.polls.find(poll => poll.pollId === pollId).votes
        return chosenPollVotes
    }
    return []
}

export const selectPollChoices = (state, pollId) => {
    if (state.polls.polls.find(poll => poll.pollId === pollId)) {
        const chosenPollChoices = state.polls.polls.find(poll => poll.pollId === pollId).choices
        return chosenPollChoices
    }
    return []
}

export const selectPollTitle = (state, pollId) => {
    if (state.polls.polls.find(poll => poll.pollId === pollId)) {
        return state.polls.polls.find(poll => poll.pollId === pollId).title
    }
    return ""
}

export const { addPoll, addVote } = pollsSlice.actions;
export const selectAllPolls = (state) => state.polls;
export const selectAllVoters = (pollId, state) => state.user.polls.find(poll => poll.pollId === pollId).voters
export const selectPollsStatus = (state) => state.polls.status //might be used for loading
export default pollsSlice.reducer;