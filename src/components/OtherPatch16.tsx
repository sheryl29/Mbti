import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch16: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "plan everything early so it's ready on time": 0,
        "make a clear schedule and follow it": 1,
        "start when you feel inspired to work": 2,
        "do it close to the deadline, that's when ideas come": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-17");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-15");
  };

  const options = [
    "plan everything early so it's ready on time",
    "make a clear schedule and follow it",
    "start when you feel inspired to work",
    "do it close to the deadline, that's when ideas come",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">16</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOU HAVE A BIG</div>
        <div className="otherpatch1-question-line">PROJECT NEXT WEEK,</div>
        <div className="otherpatch1-question-line">YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch16-options-wrapper">
        <img
          src="/add16.webp"
          alt="Big Project"
          className="otherpatch16-image"
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

export default OtherPatch16;
