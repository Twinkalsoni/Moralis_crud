import './App.css';
import Object from './Object';
import AddEdit from './AddEdit';
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <Object/>

  <Routes>
<Route path='/update/:id' element={<AddEdit/>}​ />
</Routes>
    
    </div>
  );
}

export default App; 
