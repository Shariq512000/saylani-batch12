import axios from "axios";
import { useState } from "react"
import { useEffect } from "react"

const App = () => {

  // const [filter , setFilter] = useState("high");
  // const [packages , setPackages] = useState([
  //   {name: "Pakage1", price: 200},
  //   {name: "Pakage2", price: 180},
  //   {name: "Pakage3", price: 160},
  //   {name: "Pakage4", price: 150},
  //   {name: "Pakage5", price: 100},
  // ])

  // useEffect(() => {
  //   // console.log(filter)
  //   if(filter == "low"){
  //     setPackages([
  //       {name: "Pakage5", price: 100},
  //       {name: "Pakage4", price: 150},
  //       {name: "Pakage3", price: 160},
  //       {name: "Pakage2", price: 180},
  //       {name: "Pakage1", price: 200},
  //     ])
  //   }else{
  //     setPackages([
  //       {name: "Pakage1", price: 200},
  //       {name: "Pakage2", price: 180},
  //       {name: "Pakage3", price: 160},
  //       {name: "Pakage4", price: 150},
  //       {name: "Pakage5", price: 100},
  //     ])
  //   }
  // },[filter])

  // return(
  //   <div className="">
  //     <div className="">
  //       <select onChange={(event) => {setFilter(event.target.value)}}>
  //         <option value="high">High To Low</option>
  //         <option value="low">Low To Hight</option>
  //       </select>
  //     </div>
  //     {packages.map((ele , i) => {
  //       return(
  //         <div key={i} style={{border: "1px solid #EEE", width: 300, marginLeft: "auto", marginRight: "auto", padding: 15, marginBottom: 15}}>
  //           {ele.name}
  //           <br />
  //           {ele.price}
  //         </div>
  //       )
  //     })}
  //   </div>
  // )

  /////////////// Api Call /////////////////////////

  const [newsData , setNewsData] = useState([]);
  const [topic , setTopic] = useState("Corruption")

  const getNewsAxios = async (q, country) => {
    const apiKey = "pub_6218550bd3e1cd69d3aa1b524f530cb81d129";
    const url = `https://newsdata.io/api/1/news`;

    try {
      const response = await axios.get(url, {
        params: {
          apikey: apiKey, // Your API Key
          q: q, // Search query for Facebook-related news
          country: country, // Fetch news for Pakistan
          language: "en", // English
          // from_date: "2023-01-19",
          // to_date: "2023-01-25"
        },
      });
      setNewsData(response.data.results);
    } catch (error) {
      console.error("Error fetching the news:", error);
    }
  };

  useEffect(() => {
    getNewsAxios(topic, "PK");
  }, []);

  return(
    <div className="">
      {newsData.map((e, i) => {
        return(
          <div key={i} className="">
            <img src={e.image_url} alt="" />
          </div>
        )
      })}
    </div>
  )
















}

export default App