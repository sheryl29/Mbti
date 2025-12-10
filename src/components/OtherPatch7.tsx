import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch7: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "feel lost, you need clear steps to understand": 0, // a) green
        "try to connect it with something real or practical": 1, // b) purple
        "enjoy thinking about how the ideas fit together": 2, // c) yellow
        "start imagining how to use it in creative ways": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-8");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-6");
  };

  const options = [
    "feel lost, you need clear steps to understand",
    "try to connect it with something real or practical",
    "enjoy thinking about how the ideas fit together",
    "start imagining how to use it in creative ways",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">07</div>

      {/* First question line on top */}
      <div className="otherpatch7-top-question">
        <div className="otherpatch7-top-question-line">
          YOU'RE IN A CLASS WHERE THE
        </div>
      </div>

      {/* Main question with image */}
      <div className="otherpatch7-question-container">
        <img
          src="/add7.webp"
          alt="Class Theory"
          className="otherpatch7-image"
        />
        <div className="otherpatch7-question">
          <div className="otherpatch7-question-line">TEACHER GIVES</div>
          <div className="otherpatch7-question-line">ONLY THEORY, NO</div>
          <div className="otherpatch7-question-line">EXAMPLES, YOU...</div>
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

export default OtherPatch7;
