import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch14: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "point it out and fix how to fix it": 0,
        "make sure they don't feel too bad about it": 1,
        "explain the problem clearly so it won't happen again": 2,
        "encourage them and say it's okay": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-15");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-13");
  };

  const options = [
    "point it out and fix how to fix it",
    "make sure they don't feel too bad about it",
    "explain the problem clearly so it won't happen again",
    "encourage them and say it's okay",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">14</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOUR TEAMMATE MADE A</div>
        <div className="otherpatch1-question-line">MISTAKE IN A GROUP</div>
        <div className="otherpatch1-question-line">PROJECT, YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch14-options-wrapper">
        <img
          src="/add14.webp"
          alt="Team Mistake"
          className="otherpatch14-image"
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

export default OtherPatch14;
