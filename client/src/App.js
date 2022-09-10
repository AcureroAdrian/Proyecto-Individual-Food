import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Form from './Components/Form/Form';
import Details from './Components/Details/Details';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={ <LandingPage /> }/>
          <Route path='/home' element={ <Home /> }/>
          <Route path="/recipe-create" element={ <Form /> }/>
          <Route path="/recipe-detail/:id" element={<Details /> }/>
        </Routes>
    </div>
  );
}

export default App;
