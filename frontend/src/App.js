import React, { createContext, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Welcome from './Admin/Welcome/Welcome'
import CreateElection from './Admin/CreateElection/CreateElection'
import DeleteElection from './Admin/DeleteElection/DeleteElection'
import StatusElection from './Admin/Status/StatusElection'
import UsersList  from './Admin/CreateElection/UsersList/UsersList'
import Candidates from './Admin/CreateElection/Candidates/Candidates'
import './App.css'
import Home from './Home/Home'
import Register from './Authentication/Register/Register'
import Login from './Authentication/Login/Login'
import UserHome from './Home/UserHome'
import AdminLogin from './Admin/AdminLogin/AdminLogin'
import LoginChoice from './Home/LoginChoice'
import Vote from './Home/Vote/Vote'
import ViewElection from './Admin/ViewElection/ViewElection'
import ForgetPassword from './WorkAroundFiles/ForgetPassword'
import ResetPassword from './WorkAroundFiles/ResetPassword'
import LohwP from './Authentication/LoginwithOtp/LohwP'
const userContext=createContext();
const App = () => {
  const [Eusers,SetEusers]=useState([]);
 
  return (
    <userContext.Provider value={{Eusers,SetEusers}}>
      <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/userHome" element={<UserHome/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/Vote/:id/:vid" element={<Vote/>}/>
          <Route exact path="/LoginChoice" element={<LoginChoice/>}/>
          <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Admin" element={<Welcome/>}/>
          <Route exact path="/CreateElection" element={<CreateElection/>}/>
          <Route exact path="/DeleteElection" element={<DeleteElection/>}/>
          <Route exact path="/Status"  element={<StatusElection/>}/>
          <Route exact path="/UsersList"  element={<UsersList/>}/>
          <Route exact path="/CandidatesList"  element={<Candidates/>}/>
          <Route exact path="/forgetPassword"  element={<ForgetPassword/>}/>
          <Route exact path="/Reset_Password"  element={<ResetPassword/>}/>
          <Route exact path="/viewElection/:id"  element={<ViewElection/>}/>
          
          <Route exact path="/LoginWithPhone"  element={<LohwP/>}/>
        </Routes>
      </Router>
    </div>


    </userContext.Provider>
    
  )
}

export default App
export {userContext};