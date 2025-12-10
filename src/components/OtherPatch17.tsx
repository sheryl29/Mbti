import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch17: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "already know what you'll do today": 0,
        "check your plan or to-do list": 1,
        "decide what to do based on your mood": 2,
        "just go with the flow and see what happens": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-18");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-16");
  };

  const options = [
    "already know what you'll do today",
    "check your plan or to-do list",
    "decide what to do based on your mood",
    "just go with the flow and see what happens",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">17</div>

      {/* Main question with image */}
      <div className="otherpatch17-question-container">
        <div className="otherpatch17-question">
          <div className="otherpatch17-question-line">WHEN YOU WAKE</div>
          <div className="otherpatch17-question-line">UP IN THE</div>
          <div className="otherpatch17-question-line">MORNING, YOU...</div>
        </div>
        <img
          src="/add17.webp"
          alt="Morning Wake Up"
          className="otherpatch17-image"
        />
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

export default OtherPatch17;
