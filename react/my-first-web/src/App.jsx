import logo from './logo.svg';
import './App.css';
import NewComponent from './component/NewComponent'
import Header from './component/Header';
import LeftBar from './component/LeftBar';
import Post from './component/Post';
import RightBar from './component/RightBar';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <LeftBar />
        <Post />
        <RightBar />
      </div>
    </div>
  );
}


export default App;
