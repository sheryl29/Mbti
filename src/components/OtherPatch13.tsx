import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch13: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "clear rules and fair points": 0,
        "effort and good intentions": 1,
        "logic and structure": 2,
        "meaning and emotion behind it": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-14");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-12");
  };

  const options = [
    "clear rules and fair points",
    "effort and good intentions",
    "logic and structure",
    "meaning and emotion behind it",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">13</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOU'RE A JUDGE IN A</div>
        <div className="otherpatch1-question-line">CONTEST, WHAT</div>
        <div className="otherpatch1-question-line">MATTERS MOST?</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch13-options-wrapper">
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
        <img
          src="/add13.webp"
          alt="Contest Judge"
          className="otherpatch13-image"
        />
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

export default OtherPatch13;
