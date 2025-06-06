import React from 'react';
import './App.css';
import TicTacToeDuo from "./TicTacToeDuo";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <div />
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ minHeight: "100vh", paddingTop: 120 }}>
          <TicTacToeDuo />
        </div>
      </main>
    </div>
  );
}

export default App;