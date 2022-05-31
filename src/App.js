import './App.css';
import ContactList from './Components/ContactList';
import AddEdit from './Components/AddEdit';
import { Route, Routes } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';
import Navbar from './Components/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      {/* <Route path="Object/*" element={<Object/>}/> */}
      <Route path="/contactlist" element={<ContactList/>} />

        <Route path="/add" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit />}/>
      </Routes>
    </div>
  );
}

export default App; 
