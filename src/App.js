import React from 'react';
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routesr from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routesr />
    </BrowserRouter>
  );
}

export default App;
