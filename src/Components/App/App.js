import '../../Styles/App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/userDetail/:userEmail" element={<Login/>}/>      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
