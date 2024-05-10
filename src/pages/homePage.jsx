import RecommendWorkouts from "../components/RecommendWorkouts"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function HomePage() {

  const { token } = useContext(AuthContext)

  return (
    <>

    <div className="id">
    <img src="images/logo text2.png" alt="website logo"></img>
    </div>

    {String(token).length > 4 ? (
      <>
      <RecommendWorkouts/>
      
      </>
    ) : (
      <>
      <div className="id">
        <a href="/signup" className="logo">
        <h1>Get Started Building Your Own Workouts!</h1>
        </a>
      </div>
      
      </>
    )}
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
    </>
  )
}
