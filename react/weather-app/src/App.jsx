import axios from "axios";
import { useState } from "react";

const App = () => {

  const [city , setCity] = useState("");
  const [weatherDetail , setWeatherDetail] = useState({});

  const checkWeather = (e) => {

    e.preventDefault();

    axios.get(`https://api.weatherapi.com/v1/current.json?key=d347dfb1a00b4f86add45435242510&q=${city}`)
    .then(function(response){

      setWeatherDetail(response.data)

    }).catch(function(err){

      console.log(err);

    })

  }

  return(
    <div>
      <form onSubmit={checkWeather}>
        <label htmlFor="cityName">
          City Name:
          <input type="text" id="cityName" value={city} onChange={(e) => {setCity(e.target.value);}} />
        </label>
        <br />
        <button>Submit</button>
      </form>

      <div className="">
        <h1>{`Location: ${weatherDetail?.location?.name} ${weatherDetail?.location?.region} ${weatherDetail?.location?.country}`}  </h1>
        <div className="" style={{display: "flex", alignItems: "center", columnGap: 5}}>
          <img src={`https:${weatherDetail?.current?.condition?.icon}`} alt="" />{weatherDetail?.current?.condition?.text}
        </div>
        <h3>Temperature: {weatherDetail?.current?.temp_c}°c</h3>
        <h3>FeelsLike: {weatherDetail?.current?.feelslike_c}°c</h3>
        <h3>Temperature: {weatherDetail?.current?.temp_f}°F</h3>
        <h3>FeelsLike: {weatherDetail?.current?.feelslike_f}°F</h3>
        <h3>Humidity: {weatherDetail?.current?.humidity}</h3>
      </div>
    </div>
  )
}

export default App;