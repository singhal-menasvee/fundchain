import React, { useEffect, useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';
import FundProject from './FundProject';
import ClaimFunds from './ClaimFund';
import Refund from './Refund';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const loadProjects = async () => {
    try {
      const projectCount = await contract.methods.projectCount().call();
      const projectsArray = [];

      for (let i = 1; i <= Number(projectCount); i++) {
        const project = await contract.methods.projects(i).call();

        projectsArray.push({
          id: i,
          creator: project.creator.toLowerCase(),
          title: project.title,
          description: project.description,
          goalAmount: parseFloat(web3.utils.fromWei(project.goalAmount, 'ether')),
          amountRaised: parseFloat(web3.utils.fromWei(project.amountRaised, 'ether')),
          deadline: new Date(Number(project.deadline) * 1000),
          fundsClaimed: project.fundsClaimed,
        });
      }

      setProjects(projectsArray);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  const loadAccounts = async () => {
    const accs = await web3.eth.getAccounts();
    setAccounts(accs);
  };

  useEffect(() => {
    loadAccounts();
    loadProjects();
  }, []);

  return (
    <div className="container mt-4">
      {/* Centered Heading */}
      <h1 className="text-center mb-4"><center>All Projects</center></h1>

      {/* Centered Refresh Button */}
      <div className="d-flex justify-content-center mb-4"><center>
        <button onClick={loadProjects} className="btn btn-primary">
          Refresh Projects
        </button>
        </center>
      </div>
      <br />
      <br />

      {projects.length === 0 ? (
        <div className="alert alert-info text-center">No projects found.</div>
      ) : (
        <div className="row g-4">
          {projects.map((project) => {
            const isCreator = accounts.length > 0 && project.creator === accounts[0].toLowerCase();
            const isFundingPeriodOver = new Date() > project.deadline;
            const isGoalMet = project.amountRaised >= project.goalAmount;
            const isZeroRaised = project.amountRaised === 0;

            return (
              <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                <ProjectCard project={project}>
                  <div className="button-container">
                    {!isCreator && !isFundingPeriodOver && <FundProject projectId={project.id} />}
                    {isCreator && isFundingPeriodOver && isGoalMet && !project.fundsClaimed && (
                      <ClaimFunds projectId={project.id} />
                    )}
                    {!isCreator && isFundingPeriodOver && !isGoalMet && !isZeroRaised && (
                      <Refund projectId={project.id} />
                    )}
                  </div>
                </ProjectCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
