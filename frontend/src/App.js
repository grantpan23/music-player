import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <div className="App">
      <h1>hello</h1>
      <Test />
      </div>
    </Router>
  );
}

export default App;
