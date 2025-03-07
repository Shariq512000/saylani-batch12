import logo from './logo.svg';
import './App.css';
import Header from './component/header';
import Routing from './component/routing';
import Footer from './component/footer';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Routing />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
