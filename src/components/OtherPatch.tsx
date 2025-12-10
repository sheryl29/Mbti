import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "feel tired and prefer to go home to rest": 0, // a) green
        "stay a bit longer but know you'll need quiet time after": 1, // b) purple
        "say yes, you still have energy for more fun": 2, // c) yellow
        "get excited and start plannign where to go next": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-2");
    }
  };

  const handleBack = () => {
    navigate("/personality-result");
  };

  const options = [
    "feel tired and prefer to go home to rest",
    "stay a bit longer but know you'll need quiet time after",
    "say yes, you still have energy for more fun",
    "get excited and start plannign where to go next",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">01</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOUR GROUP FRIENDS</div>
        <div className="otherpatch1-question-line">WANT TO HANG OUT</div>
        <div className="otherpatch1-question-line">AFTER A LONG DAY</div>
        <div className="otherpatch1-question-line">TOGETHER, YOU...</div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch1-options-wrapper">
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
          src="/add1.webp"
          alt="Group Friends"
          className="otherpatch1-image"
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

export default OtherPatch;
