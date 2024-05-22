
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbare from './components/Navbare'
import HomePage from './pages/homePage'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Profile from './pages/Profile'
import Workouts from './pages/Workouts'
import TestLogin from './components/SigninComponent'
import RecommendWorkouts from './components/RecommendWorkouts'
import { AuthProvider } from './context/AuthProvider'
import CreateNormalWorkout from './components/CreateNormalWorkout'
import UserProfileComponent from './components/UserProfileComponent'
import DropdownMenuComponent from './components/DropdownMenuComponent'
import CreateCustomWorkoutPage from './pages/Workouts/CreateCustomWorkoutPage'
import CreateNormalPage from './pages/Workouts/CreateNormalPage'
import CreateRandomWorkoutPage from './pages/Workouts/CreateRandomWorkoutPage'
import GetWorkoutsPage from './pages/Workouts/GetWorkoutsPage'
import UpdateCustomWorkoutPage from './pages/Workouts/UpdateCustomWorkoutPage'
import UpdateNormalWorkoutPage from './pages/Workouts/UpdateNormalWorkoutPage'
import Test from '../images/test'

function App() {


  const [isVisible] = useState(false)


  return (
    <>
      <AuthProvider>
        <Navbare />
        <Test/>
        {isVisible && <TestLogin />}
        {isVisible && <RecommendWorkouts />}
        {isVisible && <UserProfileComponent/>}
        {isVisible && <CreateNormalWorkout/>}
        {isVisible && <DropdownMenuComponent/>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/workouts' element={<Workouts />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/createCustom" element={<CreateCustomWorkoutPage />} />
          <Route path="/createNormal" element={<CreateNormalPage />} />
          <Route path="/createRandom" element={<CreateRandomWorkoutPage />} />
          <Route path="/getWorkouts" element={<GetWorkoutsPage />} />
          <Route path="/updateCustom" element={<UpdateCustomWorkoutPage />} />
          <Route path="/updateNormal" element={<UpdateNormalWorkoutPage />} />
          {/* <Route path='/test' element={<CreateNormalWorkout />} /> */}
        </Routes>
      </AuthProvider>


    </>
  )
}

export default App
