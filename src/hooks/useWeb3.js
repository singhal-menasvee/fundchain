import { useState, useEffect } from 'react';
import web3 from '../utils/web3';

export const useWeb3 = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    
    loadAccount();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
      });
    }
  }, []);

  return { web3, account };
};