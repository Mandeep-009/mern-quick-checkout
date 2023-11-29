import './App.css';
import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/products/create' element={<Create/>} />
        <Route path='/product/delete/:id' element={<Delete/>} />
        <Route path='/products/update/:id' element={<Update/>} />
        <Route path='/products/details/:id' element={<Details/>} /> */}
      </Routes>
  );
}

export default App;
