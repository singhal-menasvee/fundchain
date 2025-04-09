import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project, children }) => {
  const progressPercentage = project.goalAmount
    ? Math.min(100, (project.amountRaised / project.goalAmount) * 100)
    : 0;

  let progressColor = "low";
  if (progressPercentage >= 75) progressColor = "high";
  else if (progressPercentage >= 50) progressColor = "medium";

  return (
    <div className="project-card">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className={`progress-bar ${progressColor}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Details */}
      <ul className="project-details">
        <li><strong>Creator:</strong> {project.creator}</li>
        <li><strong>Goal:</strong> {project.goalAmount} ETH</li>
        <li><strong>Raised:</strong> {project.amountRaised} ETH</li>
        <li><strong>Deadline:</strong> {project.deadline.toLocaleString()}</li>
        <li><strong>Funds Claimed:</strong> {project.fundsClaimed ? "Yes" : "No"}</li>
      </ul>

      {/* Centered Buttons */}
      <div className="button-container">{children}</div>
    </div>
  );
};

export default ProjectCard;
