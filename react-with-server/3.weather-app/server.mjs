import express from 'express';
import cors from "cors";

const app = express()
const port = process.env.PORT || 5001;

/// 192.168.200.121:5000

app.use(cors())

app.get('/' , (req , res) => {
  console.log(req.ip);
  res.send("Hello World")
})

/// url parameter
/// http://localhost:5001/get-weather/karachi/78500

/// query parameter
/// http://localhost:5001/get-weather?zip=78500&city=karachi

app.get('/get-weather/:cityName' , (req , res) => {
  
  const city = req.params.cityName.toLowerCase();
  let apiRes = {};

  if(city == "karachi"){
    apiRes = {
      "city": city,
      "temperature" : 40, 
      "humidity": 39, 
      "wind": "50 km/h",
      "min": 30,
      "max": 42,
      "feelslike": 45
    }
  }else if(city == "lahore"){
    apiRes = {
      "city": city,
      "temperature" : 40, 
      "humidity": 39, 
      "wind": "50 km/h",
      "min": 30,
      "max": 42,
      "feelslike": 45
    }
  }else{
    apiRes = {
      "city": city,
      "temperature" : 40, 
      "humidity": 39, 
      "wind": "50 km/h",
      "min": 30,
      "max": 42,
      "feelslike": 45
    }
  }

  res.send(apiRes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})