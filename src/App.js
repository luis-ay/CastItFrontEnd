import {
  HashRouter as Router,
  Routes, Route
} from "react-router-dom"
import React from 'react';
import HomePage from "./pages/Home/HomePage"
import CreationPage from "./pages/CreatePoll/CreationPage"
import PollsPage from "./pages/Polls/PollsPage"
import VotePage from "./pages/VotePage/VotePage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AboutPage from "./pages/About/AboutPage"
import ResultsPage from './pages/ResultsPage/ResultsPage'

const App = () => {
 
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/polls" element={<PollsPage />} /> 
        <Route path="/create" element={<CreationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/vote/:pollId" element={<VotePage/>} />
        <Route path="/about" element={<AboutPage/>} /> 
        <Route path="/results/:pollId" element={<ResultsPage/>} /> 
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;

//store will be updated at first render right off the bat meaning /polls can just get the user's polls because user's stuff will be
//recieved from db

