import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import { GlobalContext } from '../context/Context';
import api from '../component/api';

const Home = () => {
  const [users , setUsers] = useState([]);
  const [user , setUser] = useState("");
  const [isLoading , setIsLoading] = useState(true);
  let {state} = useContext(GlobalContext)

  const getUsers = async(searchTerm = "") => {
    try {
      let res = await api.get(`/users?user=${searchTerm}`, {
        withCredentials: true
      });
      console.log("res" , res.data)
      setIsLoading(false);
      setUsers(res.data.users)
      
    } catch (error) {
      console.log("Error" , error)
    }
  }

  useEffect(() => {
    getUsers()
  } , [])

  const searchUser = (e) => {
    e.preventDefault();
    setIsLoading(true)
    getUsers(user)
    //Shariq
  }
  return (
    <div>
      <form onSubmit={searchUser}>
        <input onChange={(e) => {setUser(e.target.value)}} type="text" placeholder='Search User Name' />
        <button type='submit'>Search</button>
      </form>
      {isLoading ?
        <h1>Loading...</h1>
        :
        users?.length ?
        users.map((eachUser , i) => {
          return(
            <Link to={`/chat/${eachUser?._id}`} style={{width: 320, border: "1px solid black", borderRadius: 8, padding: 20, marginBottom: 20, display: "block", color: "black"}}>
              {/* <img style={{width: "100%"}} src={eachProduct.product_image} alt="" />
              <br /> */}
              <h1>{eachUser?.firstName} {eachUser?.lastName} {(eachUser?._id == state.user.user_id) ? "(You)" : ""}</h1>
              <h6>{eachUser?.email}</h6>
              {/* <p>{eachUser?.createdOn}</p> */}
            </Link>
          )
        })
        :
        <p>User Not Found</p>
      }
    </div>
  )
}

export default Home