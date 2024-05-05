import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import Navbare from './components/Navbare'
import HomePage from './pages/homePage'
import Signup from './pages/signup'
import Signout from './pages/signout'
import Signin from './pages/signin'
import Workouts from './pages/Workouts'
import TestComponent from './components/TestComponent'

function App() {

 


  return (
    <>
        <Navbare />


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signout />} />
          <Route path='/workouts' element={<Workouts />} />
          <Route path='/test' element={<TestComponent />} />
        </Routes>
    </>
  )
}

export default App
