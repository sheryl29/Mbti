import React from "react";
import { useNavigate } from "react-router-dom";

const MBTICheck: React.FC = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/mbti-input");
  };

  const handleNo = () => {
    navigate("/mbti-test");
  };

  return (
    <div className="mbti-check-page">
      {/* Main title section with characters */}
      <div className="mbti-check-title">
        {/* Character above "DO" */}
        <div className="mbti-check-character mbti-check-character-above">
          <img
            src="/know2.webp"
            alt="Character above DO"
            className="mbti-check-character-img"
          />
        </div>

        {/* Title text */}
        <div className="mbti-check-text">
          <div className="mbti-check-line">DO YOU</div>
          <div className="mbti-check-line">KNOW YOUR</div>
          <div className="mbti-check-line">PERSONALITY?</div>
        </div>

        {/* Character left of "KNOW" */}
        <div className="mbti-check-character mbti-check-character-left">
          <img
            src="/know1.webp"
            alt="Character left of KNOW"
            className="mbti-check-character-img"
          />
        </div>

        {/* Character right of "YOUR" */}
        <div className="mbti-check-character mbti-check-character-right">
          <img
            src="/know3.webp"
            alt="Character right of YOUR"
            className="mbti-check-character-img"
          />
        </div>
      </div>

      {/* Yes/No buttons */}
      <div className="mbti-check-buttons">
        <button className="mbti-check-no-button" onClick={handleNo}>
          No
        </button>
        <button className="mbti-check-yes-button" onClick={handleYes}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default MBTICheck;
