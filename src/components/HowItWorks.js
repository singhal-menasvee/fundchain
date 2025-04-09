import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      title: "Create a project",
      description: "Describe your idea and set funding goals"
    },
    {
      title: "Share your project",
      description: "Connect with backers worldwide"
    },
    {
      title: "Build and iterate",
      description: "Use funds to bring your vision to life"
    }
  ];

  return (
    <section className="how-it-works">
      <h2 className="section-title">How it works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;