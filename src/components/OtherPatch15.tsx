import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch15: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "clear facts and risks": 0,
        "everyone's feelings considered": 1,
        "a logical plan that makes sense": 2,
        "a choice that feels right inside": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(15, colorValue); // Question 15

      // Navigate to next page
      navigate("/other-patch-16");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-14");
  };

  const options = [
    "clear facts and risks",
    "everyone's feelings considered",
    "a logical plan that makes sense",
    "a choice that feels right inside",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">15</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">BEFORE MAKING A BIG</div>
        <div className="otherpatch1-question-line">CHOICE, YOU PREFER...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch15-options-wrapper">
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
          src="/add15.webp"
          alt="Big Choice"
          className="otherpatch15-image"
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

export default OtherPatch15;
