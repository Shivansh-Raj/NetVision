import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route 
            path="/" 
            element = {
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route path="/Guest" element = {<Home/>}/>
          <Route path="/login" element = {<Login isLogin = {true} isSignup = {false} /> }/>
          <Route path="/signup" element = {<Login isLogin = {false} isSignup = {true} /> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App