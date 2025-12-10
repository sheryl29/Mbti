import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch3: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "staying home alone to chill, watch something, or rest": 0, // a) green
        "listening to music or journaling quietly to unwind": 1, // b) purple
        "going out with friends for food or coffee": 2, // c) yellow
        "doing something fun and spontaneous with people": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-4");
    }
  };

  const handleBack = () => {
    navigate("/other-patch-2");
  };

  const options = [
    "staying home alone to chill, watch something, or rest",
    "listening to music or journaling quietly to unwind",
    "going out with friends for food or coffee",
    "doing something fun and spontaneous with people",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">03</div>

      {/* Main question with image */}
      <div className="otherpatch3-question-container">
        <img
          src="/add3a.webp"
          alt="Long Week"
          className="otherpatch3-image-left"
        />
        <div className="otherpatch3-question">
          <div className="otherpatch3-question-line">AFTER A LONG,</div>
          <div className="otherpatch3-question-line">BUSY WEEK, A</div>
          <div className="otherpatch3-question-line">FRIEND INVITES</div>
          <div className="otherpatch3-question-line">YOU OUT, YOU...</div>
        </div>
      </div>

      {/* Options container with image */}
      <div className="otherpatch3-options-wrapper">
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
          src="/add3b.webp"
          alt="Friend Invite"
          className="otherpatch3-image-right"
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

export default OtherPatch3;
