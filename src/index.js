import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from './Components/Dashboard/Dashboard';
import { ContactUs } from "./Components/ContactUs/ContactUs";
import { Details } from './Components/Capture/DetailsCard/Details';
import { AddAttributes } from './Components/AddAttributes/AddAttributes';
import GetByAadhar from './Components/AadharComponent/GetByAadhar';
import reportWebVitals from './reportWebVitals';
import {AddDetails} from './Components/AddDetails/AddDetails';

const root = createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route index element={<App />} />
        <Route path="addAttributes" element={<AddAttributes/>} />
        <Route path="contactUs" element={<ContactUs/>} />
        <Route path="getByAadhar" element={<GetByAadhar/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="showDetails" element={<Details />} />
        <Route path="addDetails" element={<AddDetails/>}/>
    </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
