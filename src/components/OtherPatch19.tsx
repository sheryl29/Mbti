import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch19: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "make a checklist and assign roles": 0,
        "keep everyone on track to finish early": 1,
        "go with the group's flow and adjust as needed": 2,
        "wait to see what others want to do first": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(19, colorValue); // Question 19

      // Navigate to next page (or completion page)
      navigate("/other-patch-20");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-18");
  };

  const options = [
    "make a checklist and assign roles",
    "keep everyone on track to finish early",
    "go with the group's flow and adjust as needed",
    "wait to see what others want to do first",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">19</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">YOU'RE WORKING ON A</div>
        <div className="otherpatch1-question-line">GROUP TASK, YOU...</div>
      </div>

      {/* Image below question */}
      <div className="otherpatch19-image-container">
        <img
          src="/add19.webp"
          alt="Group Task"
          className="otherpatch19-image"
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

export default OtherPatch19;
