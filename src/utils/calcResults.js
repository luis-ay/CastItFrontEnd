
//rounds to two decimal places
export const round = (value) => {
    return Number(Math.round(value+'e'+2)+'e-'+2);
  }

//input:array of vote 'rankings', goes through all the votes, tallying each time a choice got a rank of first
//output: map of key:choice value:percentage of votes
export const calcRound = (votes) => {
    const voteCount = {}
    for (let i = 0; i < votes[0].length; i++) {
        voteCount[votes[0][i]] = 0
    }
    for (let i = 0; i < votes.length; i++) {
        voteCount[votes[i][0]]++
    }
    return voteCount
}


//return 0 for no winner, 1 for winner, 2 for tie, 3 for no votes yet
export const checkForWinner = (tallies, total) => {
    if (!tallies) {
        return 3
    }
    const maxPercent = Math.max(...Object.values(tallies))/total
    const size = Object.keys(tallies).filter(key => (tallies[key])).length
    const result = (round(1/size) === maxPercent) && ( size > 1) ? 2 : (maxPercent <= 0.99) ? 0 : 1
    return result
}

//is checking if there is more than 1 least voted choice, in the case there is, we still can remove said choices if 
//the sum of their votes are less than the top voted choice
export const checkForBottomTie = (tallies) => {
    const minVotes= Math.min(...Object.values(tallies))
    const maxVotes = Math.max(...Object.values(tallies))
    const losers = Object.keys(tallies).filter(key => tallies[key] === minVotes )
    let losersSum = 0
    losers.forEach(loser => losersSum += tallies[loser])
    return (losers.length > 1 && (losersSum > maxVotes))
}


//returns an array of objects with keys=choices and values=percent of votes
//goes through the process of eliminating least 'ranked first' choice from the votes until there is a tie or winner
const stripVote = (vote,losers) => {
    vote = vote.filter(choice => !losers.includes(choice))
    return vote
}

export const calcFullResults = (votes) => {
    if (votes.length === 0) {
        return []
    }
    let tempVotes = [...votes]
    const fullResults = []
    const firstTallies = {...calcRound(tempVotes)}
    fullResults.push(firstTallies)
    let losers = []
    while (checkForWinner(fullResults[fullResults.length - 1],votes.length) === 0) {
        let newRound = {...fullResults[fullResults.length - 1]}
        const minVotes = Math.min(...Object.values(newRound))
        losers = Object.keys(newRound).filter(key => newRound[key] === minVotes ) 
        if (checkForBottomTie(newRound)) {
            const chosenLoser = losers[Math.floor(Math.random()* losers.length)]
            losers = losers.filter(loser => loser === chosenLoser)
        }
        for (let i = 0; i < tempVotes.length; i++) {
            tempVotes[i] = stripVote(tempVotes[i],losers)
        }
        newRound = {...calcRound(tempVotes)}
        fullResults.push(newRound)
    }

    return fullResults
}