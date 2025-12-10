import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch11: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "listen and help find what really caused it": 0,
        "try to calm them down and show that you care": 1,
        "focus on fixing the problem quickly": 2,
        "stay with them so they don't feel alone": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-12");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-10");
  };

  const options = [
    "listen and help find what really caused it",
    "try to calm them down and show that you care",
    "focus on fixing the problem quickly",
    "stay with them so they don't feel alone",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">11</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOUR FRIEND IS UPSET</div>
        <div className="otherpatch1-question-line">AFTER A FIGHT WITH</div>
        <div className="otherpatch1-question-line">THEIR PARTNER, YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch11-options-wrapper">
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
          src="/add11.webp"
          alt="Friend Upset"
          className="otherpatch11-image"
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

export default OtherPatch11;
