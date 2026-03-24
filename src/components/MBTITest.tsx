import React from "react";
import { useNavigate } from "react-router-dom";

const MBTITest: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page9");
  };

  return (
    <div className="mbti-test-page">
      {/* Main title section */}
      <div className="mbti-test-title">
        <div className="mbti-test-title-line">LET'S FIND OUT WHICH</div>
        <div className="mbti-test-title-main">QUABUDZ</div>
        <div className="mbti-test-title-line">ARE YOU?</div>
      </div>

      {/* Character icons */}
      <div className="mbti-test-characters">
        <img
          src="/findout.png"
          alt="MBTI Characters"
          className="mbti-test-character-icon"
        />
      </div>

      {/* NEXT button */}
      <button className="mbti-test-next-button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default MBTITest;
