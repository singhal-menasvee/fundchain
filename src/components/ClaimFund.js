import React, { useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';

const ClaimFunds = ({ projectId }) => {
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      // Call the claimFunds function in the smart contract
      await contract.methods.claimFunds(projectId).send({
        from: accounts[0],
      });

      setMessage('Funds claimed successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to claim funds. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleClaim} className="btn btn-success mt-3">
        Claim Funds
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ClaimFunds;