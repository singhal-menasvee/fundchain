import React, { useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';

const Refund = ({ projectId }) => {
  const [message, setMessage] = useState('');

  const handleRefund = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      // Call the refund function in the smart contract
      await contract.methods.refund(projectId).send({
        from: accounts[0],
      });

      setMessage('Refund successful!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to refund. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleRefund} className="btn btn-warning mt-3">
        Request Refund
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Refund;