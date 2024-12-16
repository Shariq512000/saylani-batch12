import { useState } from "react";
import { useEffect } from "react";

const DummyApi = () => {

  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [posts , setPosts] = useState([])

  useEffect(() => {
    // console.log("useEffect")
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(res => {setPosts(res.posts)})
  },[])

  const updateState = () => {setCounter(counter+1)}

  return(
    <div style={{display: "flex", rowGap: 10, flexDirection: "column",alignItems: "center"}}>
      {/* <p>{counter}</p>
      <br />
      <button onClick={updateState}>Increment</button>
      <br />
      <p>{counter2}</p>
      <br />
      <button onClick={() => {setCounter2(counter2+1)}}>Increment</button> */}
      {posts.map((data , i) => {
        return(
          <div key={data?.id} style={{width: 400, borderRadius: 8, border: "1px solid #EEE", padding: 12}}>
            <h6>{data.title}</h6>
            <p>{data.body}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DummyApi;