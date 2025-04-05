import React, { useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';

const CreateProject = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .createProject(title, description, web3.utils.toWei(goalAmount, 'ether'), durationInMinutes)
        .send({ from: accounts[0] });
      alert('Project created successfully!');
      onProjectCreated(); // Trigger the callback to refresh the project list
    } catch (err) {
      console.error(err);
      alert('Failed to create project.');
    }
  };

  return (
    <div>
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Goal Amount (ETH)"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (Minutes)"
          value={durationInMinutes}
          onChange={(e) => setDurationInMinutes(e.target.value)}
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;