import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'

const Profile = () => {
    let {state , dispatch} = useContext(GlobalContext);
  return (
    <div>Profile : {state.user.firstName} {state.user.lastName}</div>
  )
}

export default Profile