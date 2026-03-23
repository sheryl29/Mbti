import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch5: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "understand them because sometimes it's nice to just watch": 0, // a) green
        "smile but wait for the right moment to talk": 1, // b) purple
        "go say hi and start a friendly chat": 2, // c) yellow
        "bring them into the group so everyone's included": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(5, colorValue); // Question 5

      // Navigate to next page
      navigate("/other-patch-6");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-4");
  };

  const options = [
    "understand them because sometimes it's nice to just watch",
    "smile but wait for the right moment to talk",
    "go say hi and start a friendly chat",
    "bring them into the group so everyone's included",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">05</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">AT A PARTY, YOU</div>
        <div className="otherpatch1-question-line">NOTICE SOMEONE</div>
        <div className="otherpatch1-question-line">STANDING ALONE, YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch5-options-wrapper">
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
        <img src="/add5.webp" alt="Party Alone" className="otherpatch5-image" />
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

export default OtherPatch5;
