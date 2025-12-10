import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch4: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "listen first and think before sharing": 0, // a) green
        "speak when you have something useful to add": 1, // b) purple
        "join the discussion easily and share your thoughts": 2, // c) yellow
        "lead the talk and keep the group's energy high": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-5");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-3");
  };

  const options = [
    "listen first and think before sharing",
    "speak when you have something useful to add",
    "join the discussion easily and share your thoughts",
    "lead the talk and keep the group's energy high",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">04</div>

      {/* First question line on top */}
      <div className="otherpatch4-top-question">
        <div className="otherpatch4-top-question-line">
          DURING A GROUP PROJECT,
        </div>
      </div>

      {/* Main question with image */}
      <div className="otherpatch4-question-container">
        <div className="otherpatch4-question">
          <div className="otherpatch4-question-line">EVERYONE STARTS</div>
          <div className="otherpatch4-question-line">CHATTING AND</div>
          <div className="otherpatch4-question-line">THROWING IDEAS</div>
          <div className="otherpatch4-question-line">AROUND, YOU...</div>
        </div>
        <img
          src="/add4.webp"
          alt="Group Project"
          className="otherpatch4-image"
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

export default OtherPatch4;
