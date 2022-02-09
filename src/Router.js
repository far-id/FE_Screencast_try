import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Guest from './layouts/Guest';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import * as Middleware from './middleware';
import * as Series from './views/series/App';
import * as Lesson from './views/lessons/App';
import Carts from './views/order/Carts';
import Success from './views/order/Success';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guest/>}>
          <Route index element={<Home />} />
          
          <Route path="/dashboard" element={
            <Middleware.Authenticated render={<Dashboard />} />
          } />
            
          <Route path="/login" element ={
            <Middleware.Guest render={<Login />} />
          } />
            
          <Route path="/register" element={
            <Middleware.Guest render={<Register />} />
          } />
  
          <Route path="/series" element={<Series.Index />} />
          <Route path="/series/:slug" element={<Series.Show />} />
          <Route path="/series/:slug/:episode" element={
            <Middleware.Authenticated render={<Lesson.Show />} />
          } />

          <Route path="/your-carts" element={
            <Middleware.Authenticated render={<Carts />} />
          } />
          <Route path="/success-order" element={
            <Middleware.Authenticated render={<Success />} 
          />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default Router;