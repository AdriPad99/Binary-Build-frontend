import GetWorkouts from "../components/GetWorkouts"
import CreateWorkout from "../components/CreateWorkout"
import UpdateWorkout from "../components/UpdateWorkout"
import DeleteWorkout from "../components/DeleteWorkout"
import CreateRandomWorkout from "../components/CreateRandomWorkout"

export default function Workouts() {



  return (
    <>
      <GetWorkouts/>
      <CreateWorkout/>
      <UpdateWorkout/>
      <DeleteWorkout/>
      <CreateRandomWorkout/>
    </>
  )
}
