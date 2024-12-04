import logo from './logo.svg';
import './App.css';
import NewComponent from './component/NewComponent'

function App() {
  return (
    <div className="App">
      <NewComponent firstName="John" lastName="Dev1"  />
      <NewComponent firstName="Dev" lastName="Dev2" />
      <NewComponent firstName="Shariq3" lastName="Dev3" />
      <NewComponent firstName="Shariq4" lastName="Dev4" />
      <NewComponent firstName="Shariq5" lastName="Dev5" />
      <NewComponent firstName="Shariq6" lastName="Dev6" />
    </div>
  );
}


export default App;
