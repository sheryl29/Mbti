import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch8: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "ask what exactly happened or what the person did": 0,
        "want to know what made them feel that way": 1,
        "think maybe there's more behind that feeling": 2,
        "wonder what kind of person the new one might really be": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-9");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-7");
  };

  const options = [
    "ask what exactly happened or what the person did",
    "want to know what made them feel that way",
    "think maybe there's more behind that feeling",
    "wonder what kind of person the new one might really be",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">08</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">A FRIEND TELLS YOU</div>
        <div className="otherpatch1-question-line">THEY MET SOMEONE NEW</div>
        <div className="otherpatch1-question-line">AND "GOT A STRANGE</div>
        <div className="otherpatch1-question-line">VIBE," YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch8-options-wrapper">
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
          src="/add8.webp"
          alt="Strange Vibe"
          className="otherpatch8-image"
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

export default OtherPatch8;
