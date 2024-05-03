import { useState, useContext } from 'react'
//import { tokenContext } from '../App'

export default function WorkoutsComponent() {

        // state for fetched data
        const [userData, setUserData] = useState([])

        //const [userToken, setUserToken] = useContext(tokenContext);
    
        const getDBData = async () => {
          const res = await fetch('http://127.0.0.1:5000/workouts')
          if (res.ok) {
            const data = await res.json();
            setUserData(data)
          }
          // if not error out
          else {
            console.error("Couldn't get the workouts :(")
            console.log(user)
          }
        }
        //   const response = await fetch('http://127.0.0.1:5000/workouts', {
          //       method: 'GET',
          //       headers: new Headers({
            //           'Authorization': `Bearer ${userToken}`,
            //           'Content-Type': 'application/json'
            //       })
            //     });
            // fetches the data
            // const res = await fetch('http://127.0.0.1:5000/workouts')
            // if its successfull set state to the new data

    return (
        <>
     <br />
            <div>
                {/* Maps through the data and displays it on screen */}
                {userData.length > 0 ? userData.map((user, i) =>
                    <h1 key={i}>
                        Equipment?: {user.equipment}<br />
                        Muscle group: {user.muscle_group}<br />
                        Rep Range: {user.rep_range} <br />
                        Weight range: {user.weight_range} lbs<br />
                        Workout variation: {user.workout_variation}
                    </h1>,
                ) : <h1>click button to get workouts</h1>}
            </div>
            <button onClick={getDBData}>test</button>
        </>

    )
}
