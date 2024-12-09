import { useState } from 'react';
import './App.css';

function App() {
        // variable //update function
  const [counter , setCounter] = useState(1);
  const [data , setData] = useState([
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
    {firstName: "Shariq" , lastName: "Siddiqui", postImage: "https://image.shutterstock.com/image-photo/great-nature-scenery-slovenian-alps-260nw-2526651305.jpg", postTime: "12: 30"},
  ])

  console.log(data);

  const updateState = () => {
    setCounter(counter + 1); 
    console.log(counter);
  }

  return (
    <div className="App">
      {/* <h1>{counter}</h1>
      <button onClick={updateState}>increment</button> */}
      {data.map((ele , i) => {
        return(
          <Post key={i} name={ele.firstName} lastName={ele.lastName} time={ele.postTime} imgUrl={ele.postImage} />
        )
      })}
    </div>
  );
}

const Post = (props) => {
  return(
    <div className='post'>
      <h1>{props.name} {props.lastName}</h1>
      <p>{props.time}</p>
      <img src={props.imgUrl} alt="" />
    </div>
  )
}

export default App;
