import React from 'react'

import {BrowserRouter} from "react-router-dom"
import { Navbar } from './components/navbar/Navbar';
import {Routes} from "./routes"

function App() {
  const routes = Routes()
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container">{routes}</div>
    </BrowserRouter>
  );
}

export default App;
