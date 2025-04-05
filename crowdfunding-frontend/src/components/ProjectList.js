import React, { useEffect, useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';
import FundProject from './FundProject';
import ClaimFunds from './ClaimFund'; // Import the ClaimFunds component
import Refund from './Refund'; // Import the Refund component

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const loadProjects = async () => {
    try {
      console.log('Loading projects...');
      const projectCount = await contract.methods.projectCount().call();
      console.log('Total projects:', projectCount);

      const projectsArray = [];
      for (let i = 1; i <= Number(projectCount); i++) {
        console.log('Fetching project:', i);
        const project = await contract.methods.projects(i).call();
        console.log('Project data:', project);

        projectsArray.push({
          id: i,
          creator: project.creator,
          title: project.title,
          description: project.description,
          goalAmount: web3.utils.fromWei(project.goalAmount.toString(), 'ether'),
          deadline: new Date(Number(project.deadline) * 1000).toLocaleString(),
          amountRaised: web3.utils.fromWei(project.amountRaised.toString(), 'ether'),
          fundsClaimed: project.fundsClaimed,
        });
      }

      setProjects(projectsArray);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  const loadAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
  };

  useEffect(() => {
    loadAccounts();
    loadProjects();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Projects</h2>
      <button onClick={loadProjects} className="btn btn-primary mb-4">
        Refresh Projects
      </button>
      {projects.length === 0 ? (
        <div className="alert alert-info">No projects found.</div>
      ) : (
        <div className="row">
          {projects.map((project) => {
            const isCreator = project.creator.toLowerCase() === accounts[0]?.toLowerCase();
            const isFundingPeriodOver = new Date() > new Date(project.deadline);
            const isGoalMet = Number(project.amountRaised) >= Number(project.goalAmount);

            return (
              <div key={project.id} className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-text">{project.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Creator:</strong> {project.creator}
                      </li>
                      <li className="list-group-item">
                        <strong>Goal Amount:</strong> {project.goalAmount} ETH
                      </li>
                      <li className="list-group-item">
                        <strong>Amount Raised:</strong> {project.amountRaised} ETH
                      </li>
                      <li className="list-group-item">
                        <strong>Deadline:</strong> {project.deadline}
                      </li>
                      <li className="list-group-item">
                        <strong>Funds Claimed:</strong> {project.fundsClaimed ? 'Yes' : 'No'}
                      </li>
                    </ul>
                    {!isCreator && !isFundingPeriodOver && ( // Only show the FundProject component if the user is not the creator and the funding period is not over
                      <FundProject projectId={project.id} />
                    )}
                    {isCreator && isFundingPeriodOver && isGoalMet && !project.fundsClaimed && ( // Only show the ClaimFunds component if the user is the creator, the funding period is over, the goal is met, and funds are not claimed
                      <ClaimFunds projectId={project.id} />
                    )}
                    {!isCreator && isFundingPeriodOver && !isGoalMet && ( // Only show the Refund component if the user is not the creator, the funding period is over, and the goal is not met
                      <Refund projectId={project.id} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectList;