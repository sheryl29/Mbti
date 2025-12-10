import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch18: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "feel annoyed, you already had a plan": 0,
        "try to adjust but still prefer the original plan": 1,
        "don't mind, change keeps things fun": 2,
        "get excited for something new": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-19");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-17");
  };

  const options = [
    "feel annoyed, you already had a plan",
    "try to adjust but still prefer the original plan",
    "don't mind, change keeps things fun",
    "get excited for something new",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">18</div>

      {/* Main question with image */}
      <div className="otherpatch18-question-container">
        <img
          src="/add18.webp"
          alt="Weekend Plan Change"
          className="otherpatch18-image"
        />
        <div className="otherpatch18-question">
          <div className="otherpatch18-question-line">YOUR FRIENDS</div>
          <div className="otherpatch18-question-line">SUDDENLY CHANGE</div>
          <div className="otherpatch18-question-line">THE WEEKEND</div>
          <div className="otherpatch18-question-line">PLAN, YOU...</div>
        </div>
      </div>

      {/* Options container */}
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

export default OtherPatch18;
