import GetWorkouts from "../components/GetWorkouts"
import CreateCustomWorkout from "../components/CreateCustomWorkout"
import UpdateCustomWorkout from "../components/UpdateCustomWorkout"
import CreateNormalWorkout from "../components/CreateNormalWorkout"
import CreateRandomWorkout from "../components/CreateRandomWorkout"
import UpdateNormalWorkout from "../components/UpdateNormalWorkout"

export default function Workouts() {



  return (
    <>
      <GetWorkouts />
      <CreateNormalWorkout />
      <UpdateNormalWorkout/>
      <CreateCustomWorkout />
      <UpdateCustomWorkout />
      <CreateRandomWorkout />
    </>
  )
}
