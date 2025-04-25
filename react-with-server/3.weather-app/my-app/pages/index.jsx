import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Home = () => {

  const [weather , setWeather] = useState({});
  const [cityName , setCityName] = useState("")

  // useEffect(() => {
  //   axios.get('http://localhost:5001/get-weather').then((res) => {
  //     console.log(res.data)
  //     setWeather(res.data)
  //   }).catch((err) => {console.log("Error" , err)})
  // } , [])

  let baseUrl = "https://express-on-vercel-two.vercel.app"

  const getWeather = (e) => {
    e.preventDefault();
    axios.get(`${baseUrl}/get-weather/${cityName}`).then((res) => {
      console.log(res.data)
      setWeather(res.data)
    }).catch((err) => {console.log("Error" , err)})
  }

  return (
    <div>
      <form className='mb-3' onSubmit={getWeather}>
        City: <input type="text" onChange={(e) => {setCityName(e.target.value)}} />
      </form>
      <h1>Temperature: {weather.temperature}</h1>
      <p>feelslike: {weather?.feelslike}</p>
      <p>humidity: {weather?.humidity}</p>
      <p>min: {weather?.min}</p>
      <p>max: {weather?.max}</p>
    </div>
  )
}

export default Home