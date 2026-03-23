import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import PersonalityResultCharacter from "./PersonalityResultCharacter";

const PersonalityResult: React.FC = () => {
  const navigate = useNavigate();
  const { userData, setTestAnswers } = useFlow();
  const [hasSelectedAction, setHasSelectedAction] = useState(false);

  const personalityData = {
    green: {
      title: "HARMONIZER",
      description:
        "They lead with empathy and intuition, always seeking meaning and connection. They bring warmth and understanding wherever they go.",
    },
    purple: {
      title: "BRAINIACS",
      description:
        "They live in their heads analyzing, creating systems, and seeing patterns no one else notices. Logic is their playground.",
    },
    yellow: {
      title: "WANDERERS",
      description:
        "They live for the moment, embracing new experiences and spontaneity. Rules? Optional. Fun? Guaranteed.",
    },
    blue: {
      title: "GUARDIANS",
      description:
        "Grounded, dependable, and loyal they keep things running smoothly and make sure everyone's safe, steady, and supported.",
    },
  };

  const currentPersonality = userData.personalityType || "green";
  const data =
    personalityData[currentPersonality as keyof typeof personalityData];

  const handleClaimOrder = () => {
    setHasSelectedAction(true);
    navigate("/select-item");
  };

  const handleGetOtherPatch = () => {
    setHasSelectedAction(true);
    // Start 20-question flow with clean answers
    setTestAnswers([]);
    navigate("/other-patch");
  };

  return (
    <div className="personality-result-template">
      {/* Title */}
      <div className="result-title">YOU ARE...</div>

      <PersonalityResultCharacter
        variant={
          currentPersonality === "green" ||
          currentPersonality === "blue" ||
          currentPersonality === "purple" ||
          currentPersonality === "yellow"
            ? currentPersonality
            : "green"
        }
      />

      {/* Result Banner */}
      <div className="result-banner">
        <div className={`banner-text-small banner-text-${currentPersonality}`}>
          THE
        </div>
        <div className={`banner-text-large banner-text-${currentPersonality}`}>
          {data.title}
        </div>
      </div>

      {/* Description */}
      <div className="result-description">{data.description}</div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button className="action-button-small" onClick={handleClaimOrder}>
          CLAIM & MAKE ORDER
        </button>
        <button className="action-button-small" onClick={handleGetOtherPatch}>
          KNOW YOUR PERSONALITY DEEPER
        </button>
      </div>

      {/* Helper Text */}
      {!hasSelectedAction && (
        <div className="result-helper-text">
          Please select an option above to continue
        </div>
      )}
    </div>
  );
};

export default PersonalityResult;
