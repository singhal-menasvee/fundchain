import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import CreateProjectModal from './CreateProjectModal';
import './Hero.css';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useWeb3();

  const handleCreateClick = () => {
    if (!account) {
      alert('Please connect your wallet in MetaMask first');
      return;
    }
    setIsModalOpen(true);
  };

  // const handleSwitchAccount = async () => {
  //   try {
  //     if (window.ethereum) {
  //       // Request MetaMask to prompt account switch
  //       await window.ethereum.request({
  //         method: 'wallet_requestPermissions',
  //         params: [{ eth_accounts: {} }],
  //       });
  
  //       // Then re-request accounts
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  
  //       // Refresh to reflect new account
  //       window.location.reload();
  //     } else {
  //       alert('MetaMask not detected!');
  //     }
  //   } catch (error) {
  //     console.error('Error switching account:', error);
  //     alert('Something went wrong while switching accounts. Make sure MetaMask is unlocked.');
  //   }
  // };
  
  return (
    <>
      {/* Switch Account Button */}
      {/* Switch Account Button */}
<div style={{
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 1000,
}}>
  {/* <button onClick={handleSwitchAccount} className="btn btn-light border">
    🔄 Switch Account
  </button> */}
</div>

{/* Connected Account */}
{account && (
  <p style={{
    position: 'fixed',
    top: '10px',
    right: '20px',
    color: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '6px 12px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    fontSize: '0.9rem',
    fontWeight: '500',
    backdropFilter: 'blur(5px)'
  }}>
    💼 Connected: {account.slice(0, 6)}...{account.slice(-4)}
  </p>
)}




      <section className="hero">
        <div className="hero-content">
          <h1>Fuel your ideas</h1>
          <p className="hero-text">
            Join CrowdFunding today and be part of a community that empowers you. Create your project, 
            connect with backers who believe in your potential, and experience the transparency 
            and security of blockchain technology.
          </p>
          <p className="hero-subtext">Your journey towards success begins here.</p>
          
          <div className="hero-actions">
            <button 
              onClick={handleCreateClick}
              className="btn btn-primary btn-large"
              style={{ border: '2px solid white' }}
            >
              Create Project
            </button>
            {/* <a href="#projects" className="btn btn-outline">
              Browse Projects
            </a> */}
          </div>
        </div>
      </section>

      {/* Create Project Modal */}
      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Hero;
