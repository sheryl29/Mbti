import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch2: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "let's keep it small, maybe dinner with one or two close friends": 0, // a) green
        "just something simple and chill about people i care about": 1, // b) purple
        "let's have a small party, i love good company and laughter": 2, // c) yellow
        "big party! the more people, the better": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/other-patch-3");
    }
  };

  const handleBack = () => {
    navigate("/other-patch");
  };

  const options = [
    "let's keep it small, maybe dinner with one or two close friends",
    "just something simple and chill about people i care about",
    "let's have a small party, i love good company and laughter",
    "big party! the more people, the better",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">02</div>

      {/* Main question */}
      <div className="otherpatch1-question">
        <div className="otherpatch1-question-line">IT'S YOUR BIRTHDAY, AND</div>
        <div className="otherpatch1-question-line">YOUR FRIENDS ASK HOW</div>
        <div className="otherpatch1-question-line">YOU WANT TO CELEBRATE</div>
        <div className="otherpatch1-question-line">YOU SAY...</div>
      </div>

      {/* Image between question and options */}
      <div className="otherpatch2-image-container">
        <img
          src="/add2.webp"
          alt="Birthday Celebration"
          className="otherpatch2-image"
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

export default OtherPatch2;
