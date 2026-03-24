import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const VALID_MBTI_TYPES = new Set([
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
]);

const MBTIInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [mbti, setMbti] = useState(userData.mbti || "");
  const [error, setError] = useState("");

  // Function to map MBTI types to personality types
  const getPersonalityType = (mbtiType: string): string => {
    const mbti = mbtiType.toUpperCase();

    // Harmonizers (NF types) - Empathetic, intuitive, seeking meaning
    if (
      mbti.includes("NF") ||
      ["ENFJ", "ENFP", "INFJ", "INFP"].includes(mbti)
    ) {
      return "green";
    }

    // Brainiacs (NT types) - Analytical, logical, systems-oriented
    if (
      mbti.includes("NT") ||
      ["ENTJ", "ENTP", "INTJ", "INTP"].includes(mbti)
    ) {
      return "purple";
    }

    // Wanderers (SP types) - Spontaneous, experiential, fun-loving
    if (
      mbti.includes("SP") ||
      ["ESTP", "ESFP", "ISTP", "ISFP"].includes(mbti)
    ) {
      return "yellow";
    }

    // Guardians (SJ types) - Dependable, organized, loyal
    if (
      mbti.includes("SJ") ||
      ["ESTJ", "ESFJ", "ISTJ", "ISFJ"].includes(mbti)
    ) {
      return "blue";
    }

    // Default fallback based on individual letters
    if (mbti.includes("N") && mbti.includes("F")) return "green"; // NF
    if (mbti.includes("N") && mbti.includes("T")) return "purple"; // NT
    if (mbti.includes("S") && mbti.includes("P")) return "yellow"; // SP
    if (mbti.includes("S") && mbti.includes("J")) return "blue"; // SJ

    // Additional fallback based on dominant functions
    if (mbti.startsWith("E") && mbti.includes("P")) return "yellow"; // Extraverted Perceivers
    if (mbti.startsWith("I") && mbti.includes("J")) return "blue"; // Introverted Judgers
    if (mbti.includes("F")) return "green"; // Feelers
    if (mbti.includes("T")) return "purple"; // Thinkers

    // Final fallback
    return "green"; // Default to Harmonizer
  };

  const handleNext = () => {
    const normalizedMbti = mbti.trim().toUpperCase();
    if (normalizedMbti) {
      if (!VALID_MBTI_TYPES.has(normalizedMbti)) {
        setError("Please enter a valid MBTI type (example: INTJ).");
        return;
      }

      setError("");
      const personalityType = getPersonalityType(normalizedMbti);
      console.log(
        `MBTI: ${normalizedMbti} -> Personality Type: ${personalityType}`
      );
      updateUserData({
        mbti: normalizedMbti,
        personalityType: personalityType,
      });
      navigate("/other-patch-result");
    }
  };

  const handleForgot = () => {
    navigate("/mbti-test");
  };

  // const handleBack = () => {
  //   navigate("/mbti-check");
  // };

  return (
    <div className="mbti-input-page">
      {/* Main title */}
      <div className="mbti-input-title">
        <div className="mbti-input-title-line">WHAT TYPE OF</div>
        <div className="mbti-input-title-line">PERSON ARE YOU?</div>
      </div>

      {/* Input field */}
      <div className="mbti-input-container">
        <input
          type="text"
          value={mbti}
          onChange={(e) => {
            setMbti(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && mbti.trim()) {
              handleNext();
            }
          }}
          placeholder="Enter your MBTI (e.g., INTJ)"
          className="mbti-input-field"
          maxLength={4}
          autoFocus
        />
        {error && <p className="mbti-input-error">{error}</p>}
      </div>

      {/* Button group */}
      <div className="mbti-input-buttons">
        <button className="mbti-input-forgot-button" onClick={handleForgot}>
          FORGOT
        </button>
        <button
          className={`mbti-input-next-button ${mbti.trim() ? "enabled" : "disabled"}`}
          onClick={handleNext}
          disabled={!mbti.trim()}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default MBTIInput;
