import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import { GlobalContext } from '../context/Context';
import api from '../component/api';

const Home = () => {
  const [users , setUsers] = useState([]);
  let {state} = useContext(GlobalContext)
  useEffect(() => {
    const getUsers = async() => {
      try {
        let res = await api.get(`/users`, {
          withCredentials: true
        });
        console.log("res" , res.data)
        setUsers(res.data.users)
        
      } catch (error) {
        console.log("Error" , error)
      }
    }
    getUsers()
  } , [])
  return (
    <div>
      {users.map((eachUser , i) => {
        return(
          <Link to={`/chat/${eachUser?._id}`} style={{width: 320, border: "1px solid black", borderRadius: 8, padding: 20, marginBottom: 20, display: "block", color: "black"}}>
            {/* <img style={{width: "100%"}} src={eachProduct.product_image} alt="" />
            <br /> */}
            <h1>{eachUser?.firstName} {eachUser?.lastName}</h1>
            <h6>{eachUser?.email}</h6>
            {/* <p>{eachUser?.createdOn}</p> */}
          </Link>
        )
      })}
    </div>
  )
}

export default Home