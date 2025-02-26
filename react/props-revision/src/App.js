import logo from './logo.svg';
import './App.css';
import Post from './component/Post'

function App() {
  return (
    <div className="App">
      <Post userName={"Shariq"} userAge={22} rollNumber={123} />
      <Post userName={"Aman"} userAge={21} rollNumber={124} />
      <Post userName={"Huzaifa"} userAge={20} rollNumber={125} />
      <Post userName={"Abdul Qadir"} userAge={19} rollNumber={126} />
    </div>
  );
}

export default App;
