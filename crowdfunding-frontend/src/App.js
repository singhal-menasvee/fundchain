import React, { useState } from 'react';
import CreateProject from './components/CreateProject';
import ProjectList from './components/ProjectList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback function to refresh the project list after a new project is created
  const handleProjectCreated = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Trigger re-render of ProjectList
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Decentralized Crowdfunding</h1>
      <CreateProject onProjectCreated={handleProjectCreated} />
      <hr />
      <ProjectList key={refreshKey} /> {/* Re-render when refreshKey changes */}
    </div>
  );
}

export default App;