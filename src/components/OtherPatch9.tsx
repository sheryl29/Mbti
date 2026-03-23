import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch9: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "go for the safe one, it's proven to work": 0,
        "prefer what's realistic and doable": 1,
        "feel curious to try something different": 2,
        "like imagining what could happen if it works": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(9, colorValue); // Question 9

      // Navigate to next page
      navigate("/other-patch-10");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-8");
  };

  const options = [
    "go for the safe one, it's proven to work",
    "prefer what's realistic and doable",
    "feel curious to try something different",
    "like imagining what could happen if it works",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">09</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOUR TEAM MUST</div>
        <div className="otherpatch1-question-line">CHOOSE BETWEEN A</div>
        <div className="otherpatch1-question-line">SAFE PLAN AND A NEW,</div>
        <div className="otherpatch1-question-line">RISKY IDEA, YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch9-options-wrapper">
        <img
          src="/add9.webp"
          alt="Safe Plan vs Risky Idea"
          className="otherpatch9-image"
        />
        <div className="otherpatch1-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`otherpatch1-option-box ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="otherpatch1-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default OtherPatch9;
