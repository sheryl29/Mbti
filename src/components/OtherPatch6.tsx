import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch6: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "they should stick to one clear plan so it's organized": 0, // a) green
        "it's fine as long as there's a basic plan to follow": 1, // b) purple
        "it's fun to explore different options before deciding": 2, // c) yellow
        "they're just imagining how to make it more interesting": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-7");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-5");
  };

  const options = [
    "they should stick to one clear plan so it's organized",
    "it's fine as long as there's a basic plan to follow",
    "it's fun to explore different options before deciding",
    "they're just imagining how to make it more interesting",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">06</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOUR FRIEND PLANS A</div>
        <div className="otherpatch1-question-line">TRIP BUT KEEPS</div>
        <div className="otherpatch1-question-line">CHANGING THE IDEAS</div>
        <div className="otherpatch1-question-line">EVERY DAY, YOU THINK...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch6-options-wrapper">
        <img
          src="/add6.webp"
          alt="Trip Planning"
          className="otherpatch6-image"
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

export default OtherPatch6;
