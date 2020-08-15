import React from "react";
import "./App.css";
import Dialer from "./components/dialer";

function App() {
  return (
    <div className='main'>
      <nav className='navbar navbar-expand-sm'>
        <span className='logo mt-1'>
          <strong>Crime Zero Inc.</strong>
        </span>
      </nav>
      <div>
        <Dialer />
      </div>
    </div>
  );
}

export default App;
