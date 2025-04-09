import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Use MetaMask's provider
  window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
  web3 = new Web3(window.ethereum);
} else {
  // Fallback to a local provider (e.g., Ganache)
  const provider = new Web3.providers.HttpProvider('http://localhost:7545'); // Default Ganache URL
  web3 = new Web3(provider);
}

export default web3;