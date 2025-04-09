import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ProjectList from './components/ProjectList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <HowItWorks />
      <ProjectList />
    </div>
  );
}

export default App;