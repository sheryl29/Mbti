import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const OtherPatch20: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "make an itinerary so everyone knows the plan": 0,
        "book things early to avoid stress later": 1,
        "prefer to explore and decide on the spot": 2,
        "leave most things unplanned, suprises are fun": 3,
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page (or completion page)
      navigate("/personality-result");
    }
  };

  const handleBack = () => {
    navigate("/personality-result");
  };

  const options = [
    "make an itinerary so everyone knows the plan",
    "book things early to avoid stress later",
    "prefer to explore and decide on the spot",
    "leave most things unplanned, suprises are fun",
  ];

  return (
    <div className="otherpatch1-template">
      {/* X button in top left */}
      <button className="otherpatch1-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="otherpatch1-step-indicator">20</div>

      {/* Main question with image */}
      <div className="otherpatch20-question-container">
        <div className="otherpatch20-question">
          <div className="otherpatch20-question-line">YOU'RE PLANNING</div>
          <div className="otherpatch20-question-line">A TRIP WITH</div>
          <div className="otherpatch20-question-line">FRIENDS, YOU...</div>
        </div>
        <img
          src="/add20.webp"
          alt="Trip Planning"
          className="otherpatch20-image"
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

export default OtherPatch20;
