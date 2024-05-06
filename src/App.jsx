import { useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbare from './components/Navbare'
import HomePage from './pages/homePage'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Workouts from './pages/Workouts'
import TestLogin from './components/SigninComponent'
import RecommendWorkouts from './components/RecommendWorkouts'
import { AuthProvider } from './context/AuthProvider'

function App() {


  const [isVisible] = useState(false)


  return (
    <>
      <AuthProvider>
        <Navbare />
        {isVisible && <TestLogin /> }
        {isVisible && <RecommendWorkouts /> }
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/workouts' element={<Workouts />} />
          {/* <Route path='/test' element={<AIComponent />} /> */}
        </Routes>
      </AuthProvider>


    </>
  )
}

export default App