import { useState } from "react";

const App = () => {

  const [lists , setLists] = useState([]);
  const [inputVal , setInputVal] = useState("");

  const addItem = (e) => {
    e.preventDefault();

    // ... spread operator get array's all value

    setLists((prev) => [...prev , inputVal]);
    setInputVal("");
  }

  const removeItem = (index) => {
    let newArr = [...lists];
    newArr.splice(index , 1);
    setLists(newArr);
  }

  return(
    <div>
      <div className="" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <form style={{paddingBottom: 20}} onSubmit={addItem}>
          <input type="text" value={inputVal} onChange={
            (event) => {
              setInputVal(event.target.value);
            }
          } />
          <button>Add Item</button>
        </form>

        <div style={{display: "flex", flexDirection: "column", rowGap: 12}}>
          {
            lists.map((ele, i) => {
              return(
                <div key={i} style={{border: "2px solid #EEE", borderRadius: 8, padding: 15, width: 350}}>
                  <p style={{margin: 0}}>
                    {ele}
                  </p>
                  <button onClick={() => {removeItem(i)}}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App;