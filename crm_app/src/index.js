import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginView from './Componets/Views/login';
import MainView from './Componets/Views/main';
import './index.css';
import { ProtectedRoute } from './Utilis/ProtectedRoute';
// import App from './App';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.body);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/events' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/clients' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/users' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/add/events' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/add/clients' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/show/events' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
        <Route path='/show/client' element={<ProtectedRoute><MainView/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
