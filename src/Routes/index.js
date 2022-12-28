import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Map from '../Components/Map';
import Home from '../Pages/Home';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
