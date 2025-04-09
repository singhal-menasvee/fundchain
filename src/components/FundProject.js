import React, { useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';

const FundProject = ({ projectId }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleFund = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount, 'ether'); // Convert ETH to Wei

      // Call the fundProject function in the smart contract
      await contract.methods.fundProject(projectId).send({
        from: accounts[0],
        value: weiAmount,
      });

      setMessage('Project funded successfully!');
      setAmount(''); // Clear the input field
    } catch (err) {
      console.error(err);
      setMessage('Failed to fund project. Please try again.');
    }
  };

  return (
    <div>
      <h3>Fund Project</h3>
      <form onSubmit={handleFund}>
        <div className="form-group">
          <label htmlFor="amount">Amount (ETH):</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            placeholder="Enter amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Fund Project
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default FundProject;