import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch12: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "look at who makes the most sense": 0,
        "help them understand each other's feelings": 1,
        "try to end the fight and move on fast": 2,
        "make sure no one feels hurt": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(12, colorValue); // Question 12

      // Navigate to next page
      navigate("/other-patch-13");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-11");
  };

  const options = [
    "look at who makes the most sense",
    "help them understand each other's feelings",
    "try to end the fight and move on fast",
    "make sure no one feels hurt",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">12</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">TWO PEOPLE IN YOUR</div>
        <div className="otherpatch1-question-line">GROUP START ARGUING,</div>
        <div className="otherpatch1-question-line">YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch12-options-wrapper">
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
          src="/add12.webp"
          alt="Group Argument"
          className="otherpatch12-image"
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

export default OtherPatch12;
