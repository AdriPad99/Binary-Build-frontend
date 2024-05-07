import GetWorkouts from "../components/GetWorkouts"
import CreateCustomWorkout from "../components/CreateCustomWorkout"
import UpdateCustomWorkout from "../components/UpdateCustomWorkout"
import DeleteWorkout from "../components/DeleteWorkout"
import CreateNormalWorkout from "../components/CreateNormalWorkout"
import CreateRandomWorkout from "../components/CreateRandomWorkout"
import UpdateNormalWorkout from "../components/UpdateNormalWorkout"

export default function Workouts() {



  return (
    <>
      <UpdateNormalWorkout/>
      <GetWorkouts />
      <CreateNormalWorkout />
      <CreateCustomWorkout />
      <UpdateCustomWorkout />
      <DeleteWorkout />
      <CreateRandomWorkout />
    </>
  )
}
