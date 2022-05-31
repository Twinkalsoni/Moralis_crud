import './App.css';
import Object from './Object';
import AddEdit from './AddEdit';
import { Route, Routes } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';
import Navbar from './Navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      {/* <Route path="Object/*" element={<Object/>}/> */}

        <Route path="/add" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit />}/>
      </Routes>
      <Object />
    </div>
  );
}

export default App; 
