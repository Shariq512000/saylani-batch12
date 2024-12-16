import axios from "axios"
import { useEffect, useState } from "react"

const WeatherApi = () => {

    const [city, setCity] = useState("");
    const [weatherDetail, setWeatherDetail] = useState({});

    // useEffect(() => {
    //     axios.get(`https://api.weatherapi.com/v1/current.json?key=d347dfb1a00b4f86add45435242510&q=${city}`)
    //     .then(function(response){
    //         console.log("Api Response Console " , response.data);
    //         setWeatherDetail(response.data);
    //     }).catch(function(err){
    //         console.log(err);
    //     })
    // } , [])

    const checkWeather = (event) => {
        event.preventDefault();
        axios.get(`https://api.weatherapi.com/v1/current.json?key=d347dfb1a00b4f86add45435242510&q=${city}`)
        .then(function(response){
            console.log("Api Response Console " , response.data);
            setWeatherDetail(response.data);
        }).catch(function(err){
            console.log(err);
        })
    }

    return(
        <div>
            <form onSubmit={checkWeather}>
                <input type="text" onChange={(e) => {setCity(e.target.value)}} required />
                <br />
                <button>submit</button>
            </form>
            {weatherDetail?.location?.name}
        </div>
    )
}

export default WeatherApi