import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";

const Home = () => {

  const [newEmail , setNewEmail] = useState("");

  const [showForm , setShowForm] = useState(false);

  let {state, dispatch} = useContext(GlobalContext);

  const auth = getAuth();
  const changeEmail = (e) => {

    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      console.log("Email Updated")
      // ...
    }).catch((error) => {
      // An error occurred
      console.log("Update Email Error" , error)
      // ...
    });
  }

  console.log("State" , state)

  return (
    <div>
      <h1>{state?.user?.displayName}</h1>
      <h6>{state?.user?.email}</h6>

      <button onClick={() => setShowForm((oldValue) => !oldValue)}>
        {(showForm) ? "Hide" : "Show"} Form
      </button>


      {(showForm)?
        <form onSubmit={changeEmail}>
          <label htmlFor="newEmail">
            New Email: <input value={newEmail} type="email" onChange={(e) => {setNewEmail(e.target.value)}} required />

            <button type='submit'>Submit</button>
          </label>
        </form>
        :
        null
      }

    </div>
  )
}

export default Home