import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import Page1 from './pages/1';

const App: React.FC = () => {
  return (
    <div className="app">
      <Page1 />
    </div>
  );
};

export default App;