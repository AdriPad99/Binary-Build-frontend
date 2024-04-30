import {Routes, Route} from 'react-router-dom'
import Navbare from './components/Navbare'
import HomePage from './pages/HomePage'

function App() {
  

  return (
    <>
    <Navbare/>


    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </>
  )
}

export default App
