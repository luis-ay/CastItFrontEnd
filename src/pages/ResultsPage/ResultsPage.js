import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePoll, selectPollTitle, selectResults } from '../../features/pollsSlice'
import { motion } from 'framer-motion'
import { calcFullResults, checkForWinner} from '../../utils/calcResults'
import { useState, useEffect } from 'react'
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts"

const ResultsPage = () => {
    const { pollId } = useParams() 
    const [numVotes, setVotes] = useState(0)
    const [title, setTitle] = useState('')
    const [results, setResults] = useState([])
    const [resultTie, setResultTie] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSinglePoll(pollId)).unwrap().then(poll=>
            {
                console.log('len',poll.votes.length)
                setVotes(poll.votes.length)
                setResults([...calcFullResults(poll.votes)])
                console.log('poll recieved',poll)
                console.log(checkForWinner(results[results.length - 1],numVotes))
                console.log(resultTie)
                console.log('tt',title)
                setTitle(poll.title)
                console.log('num',numVotes)
            })
            .catch(err=>console.log(err))
        }, [dispatch])
        
    useEffect(()=> {
        setResultTie(checkForWinner(results[results.length - 1],numVotes))
    },[results])
    
    const share = {
        title: 'Check out my CastIt Poll',
        url: `https://192.168.1.20:3000/vote/${pollId}`,
        text: 'Check out my CastIt Poll',
    }

    async function handleShare() {
        try {
            await navigator.share(share)
        } catch (error) {
            console.log('sucks')
            console.log(error.message)
        }
    }

    const getWinners = () => {
        return Object.keys(results[results.length - 1])
    }

    return (
        <section className='bg-white flex-col justify-center align-middle h-full w-full pt-12 md:px-60 text-center min-h-screen'>
            <h1 className='text-4xl pb-4 border-b-4 border-gray-200 mb-6 mx-20'>Poll Results</h1>
            <p className='text-3xl text-[#EC3E3E] font-bold tracking-wide pt-4'>{title}</p>
            {
                (resultTie === 1) && numVotes > 1 ? (
                <div className='text-md font-medium mx-6 my-10'>
                    <p className='text-xl py-4'>After {results.length} round(s), {getWinners()[0]} is winning so far... </p>
                    <AreaChartComp results={results}/>
                    <p className='text-xs text-gray-400 px-8'>Click anywhere on the graph to see a vote breakdown for a given round.</p>
                </div>
                ) : resultTie === 1 ? (
                    <h1>Not enough votes yet.</h1>
                    ) : resultTie === 2 ? (
                        <div>
                        <p className='text-xl py-4'>There's been a tie between {getWinners()[0]} and {getWinners()[1]}...</p>
                        <p className='text-xl'>Share the poll with more people to get a winner!</p>
                        <AreaChartComp results={results}/>
                        <p className='text-xs text-gray-400 px-8'>Click anywhere on the graph to see a vote breakdown for a given round.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-2xl my-6'>No Votes Yet</h1>
                    </div>
                )
            }
            <div className='w-full inline-flex justify-center mt-10'>
                <Link to={`/vote/${pollId}`}>
                    <motion.div className="bg-gradient-to-br from-[#ff512f] to-[#fc567f] rounded-md p-2 text-white font-Poppins font-medium mx-4 inline-flex">
                        Vote
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 pl-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                    </motion.div>
                </Link>
                <motion.button onClick={handleShare} className="bg-gradient-to-br from-[#ff512f] to-[#fc567f] rounded-md p-2 text-white font-Poppins font-medium mx-4 inline-flex">
                    Share
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 pl-1 py-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                </motion.button>
            </div>
        </section>
    )
}


const AreaChartComp = ({results}) => {
    let chartData = results.map((obj,idx) => ({...obj, round: `Round ${idx + 1}`}))
    chartData.unshift({...chartData[0],round:''})
    for (let i = 2; i< chartData.length; i++) {
        Object.keys(chartData[0]).forEach(key => 
            {
                if (!chartData[i][key]){
                    chartData[i][key] = 0
                }
            }
            )
    }
    const colors = ["#ff512f",  "#dd2475", "#ff0048", "#00609b", "#f77524", "#f09819", '#ffd27c', '#84a98c', '#d238b7', "#0072e4" ]

    const toPercent = (decimal) => {
        return `${(decimal * 100).toFixed(0)}%`
    }

    const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
        };

    const renderTooltipContent = (o) => {
        const { payload = [], label } = o;
        const total = payload.reduce(
            (result, entry) => result + entry.value,
            0
        );
        
        return (
            <div className="customized-tooltip-content">
            <p className="total">{`${label} (Total Votes: ${total})`}</p>
            <ul className="list">
                {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: entry.color }}>
                    {`${entry.name}: ${entry.value} Votes (${getPercent(entry.value, total)})`}
                </li>
                ))}
            </ul>
            </div>
        );
        };

    return (
        <ResponsiveContainer width='100%' height={400}>
            <AreaChart width={300} height={300} data={chartData} stackOffset='expand' margin={{top:10,right:30, left:0, bottom:0}}>
            <CartesianGrid strokeDasharray={`3 ${chartData.length}`}/>
            <XAxis dataKey={'round'}/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Legend/>
            {Object.keys(chartData[0]).map((key,index) => {
                if (key !== "round") {
                    return <Area type={'monotone'} dataKey={`${key}`} stackId='1' stroke={colors[index]} fill={colors[index]} key={`${index}`}/>
                }
            }
                )}
            </AreaChart>
        </ResponsiveContainer>
        
    )


}


export default ResultsPage
