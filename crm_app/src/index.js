import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginView from './Componets/Views/login';
import MainView from './Componets/Views/main';
import './index.css';
// import App from './App';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.body);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView/>}/>
        <Route path='/dashboard' element={<MainView/>}/>
        <Route path='/events' element={<MainView/>}/>
        <Route path='/clients' element={<MainView/>}/>
        <Route path='/users' element={<MainView/>}/>
        <Route path='/add/events' element={<MainView/>}/>
        <Route path='/add/clients' element={<MainView/>}/>
        <Route path='/show/events' element={<MainView/>}/>
        <Route path='/show/client' element={<MainView/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
