import axios from "axios";
import { useState } from "react"
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";

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
  const [topic , setTopic] = useState("Corruption");
  const [country , setCountry] = useState("PK");

  const getNewsAxios = async (q, country) => {
    const apiKey = "pub_63098609a3378b785028af87b129ad054fc13";
    const url = `https://newsdata.io/api/1/news`;

    //// newsdata.io //// API WEBSITE

    try {
      const response = await axios.get(`${url}?apikey=${apiKey}&q=${q}&country=${country}&language=en`);
      setNewsData(response.data.results);
    } catch (error) {
      console.error("Error fetching the news:", error);
    }
  };

  useEffect(() => {
    getNewsAxios(topic, country);
  }, [topic, country]);

  return(
    <div className="">

      <label htmlFor="topic">
        Topic:
        <select id="topic" value={topic} onChange={(e) => {setTopic(e.target.value)}}>
          <option value="Corruption">Corruption</option>
          <option value="Sport">Sport</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Politics">Politics</option>
          <option value="Terrorism">Terrorism</option>
        </select>
      </label>

      <br />

      <label htmlFor="country">
        Country:
        <select id="country" value={country} onChange={(e) => {setCountry(e.target.value)}}>
          <option value="PK">Pakistan</option>
          <option value="IN">India</option>
          <option value="US">USA</option>
        </select>
      </label>

      <div className="d-flex flex-column align-items-center gap-3">
        {newsData.map((e, i) => {
          return(
            <Card key={i} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={e?.image_url} />
              <Card.Body>
                <Card.Title>{e?.title}</Card.Title>
                <Card.Text>
                  {e?.description}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href={e?.source_url}>{e?.source_name}</Card.Link>
              </Card.Body>
            </Card>
          )
        })}
      </div>

    </div>
  )
















}

export default App