import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3'; // Custom hook (see step 2)
import contract from '../utils/contract';
import './CreateProjectModal.css';

const CreateProjectModal = ({ onClose }) => {
  const { web3, account } = useWeb3();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    durationDays: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.title || !formData.description || !formData.goalAmount || !formData.durationDays) {
      setError('All fields are required');
      return;
    }

    if (Number(formData.durationDays) <= 0) {
      setError('Duration must be at least 1 day');
      return;
    }

    try {
      setIsLoading(true);
      
      // Convert values
      const weiAmount = web3.utils.toWei(formData.goalAmount, 'ether');
      const durationMinutes = Number(formData.durationDays) * 1440; // Convert days to minutes

      // Call smart contract
      await contract.methods
        .createProject(
          formData.title,
          formData.description,
          weiAmount,
          durationMinutes
        )
        .send({ from: account });

      onClose(); // Close modal on success
      window.location.reload(); // Refresh project list
    } catch (err) {
      console.error('Contract error:', err);
      setError(err.message || 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Start Your Project</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Funding Goal (ETH)</label>
            <input
              type="number"
              name="goalAmount"
              step="0.0001"
              min="0.00001"
              value={formData.goalAmount}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Duration (Days)</label>
            <input
              type="number"
              name="durationDays"
              min="1"
              value={formData.durationDays}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Launch Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;