import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const PersonalityResult: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useFlow();
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
    // navigate("/other-patch");
    //navigate("/get-other-patch");
    navigate("/coming-soon");
  };

  return (
    <div className="personality-result-template">
      {/* Title */}
      <div className="result-title">YOU ARE...</div>

      {/* Character Image */}
      <div
        className={`result-character ${
          currentPersonality === "green"
            ? "harmonizer-layout"
            : currentPersonality === "blue"
            ? "guardians-layout"
            : currentPersonality === "purple"
            ? "brainiacs-layout"
            : currentPersonality === "yellow"
            ? "wanderers-layout"
            : ""
        }`}
      >
        {currentPersonality === "yellow" && (
          <>
            <div className="wanderer-bubble"></div>
            <div className="wanderer-bubble"></div>
            <div className="wanderer-bubble"></div>
            <div className="wanderer-bubble"></div>
            <img
              src="/wanderers1.webp"
              alt="Wanderers Character"
              className="result-character-img"
            />
            <div className="personality-orbit">
              <div className="personality-slot wanderer-1">
                <div className="personality-label">
                  <span className="bubble-label">FREE SPIRITS</span>
                </div>
              </div>
              <div className="personality-slot wanderer-2">
                <div className="personality-label">
                  <span className="bubble-label">ADVENTURERS</span>
                </div>
              </div>
              <div className="personality-slot wanderer-3">
                <div className="personality-label">
                  <span className="bubble-label">EXPLORERS</span>
                </div>
              </div>
              <div className="personality-slot wanderer-4">
                <div className="personality-label">
                  <span className="bubble-label">RISK TAKERS</span>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPersonality === "purple" && (
          <>
            <div className="brainiac-bubble"></div>
            <div className="brainiac-bubble"></div>
            <div className="brainiac-bubble"></div>
            <div className="brainiac-bubble"></div>
            <img
              src="/brainiacs.webp"
              alt="Brainiacs Character"
              className="result-character-img"
            />
            <div className="personality-orbit">
              <div className="personality-slot brainiac-1">
                <div className="personality-label">
                  <span className="bubble-label">THINKERS</span>
                </div>
              </div>
              <div className="personality-slot brainiac-2">
                <div className="personality-label">
                  <span className="bubble-label">STRATEGISTS</span>
                </div>
              </div>
              <div className="personality-slot brainiac-3">
                <div className="personality-label">
                  <span className="bubble-label">PROBLEM SOLVERS</span>
                </div>
              </div>
              <div className="personality-slot brainiac-4">
                <div className="personality-label">
                  <span className="bubble-label">ANALYZERS</span>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPersonality === "blue" && (
          <>
            <div className="guardian-bubble"></div>
            <div className="guardian-bubble"></div>
            <div className="guardian-bubble"></div>
            <div className="guardian-bubble"></div>
            <img
              src="/guardians.webp"
              alt="Guardians Character"
              className="result-character-img"
            />
            <div className="personality-orbit">
              <div className="personality-slot guardian-1">
                <div className="personality-label">
                  <span className="bubble-label">PROTECTORS</span>
                </div>
              </div>
              <div className="personality-slot guardian-2">
                <div className="personality-label">
                  <span className="bubble-label">ORGANIZERS</span>
                </div>
              </div>
              <div className="personality-slot guardian-3">
                <div className="personality-label">
                  <span className="bubble-label">PLANNERS</span>
                </div>
              </div>
              <div className="personality-slot guardian-4">
                <div className="personality-label">
                  <span className="bubble-label">REALISTS</span>
                </div>
              </div>
            </div>
          </>
        )}
        {currentPersonality === "green" && (
          <>
            <div className="harmonizer-bubble-decorative"></div>
            <div className="harmonizer-bubble-decorative"></div>
            <div className="harmonizer-bubble-decorative"></div>
            <div className="harmonizer-bubble-decorative"></div>
            <img
              src="/harmonizer.webp"
              alt="Harmonizer Character"
              className="result-character-img"
            />
            <div className="harmonizer-orbit">
              <div className="harmonizer-slot feelers">
                <div className="harmonizer-label">
                  <span className="bubble-label">FEELERS</span>
                </div>
              </div>
              <div className="harmonizer-slot dreamers">
                <div className="harmonizer-label">
                  <span className="bubble-label">DREAMERS</span>
                </div>
              </div>
              <div className="harmonizer-slot peacemakers">
                <div className="harmonizer-label">
                  <span className="bubble-label">PEACEMAKERS</span>
                </div>
              </div>
              <div className="harmonizer-slot idealists">
                <div className="harmonizer-label">
                  <span className="bubble-label">IDEALISTS</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

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
          GET YOUR OTHER PATCH
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
