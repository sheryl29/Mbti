import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import PersonalityResultCharacter from "./PersonalityResultCharacter";
import {
  getMbtiVisualTheme,
  getOtherPatchMbtiCopy,
} from "../data/otherPatchMbtiCopy";

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

const OtherPatchResult: React.FC = () => {
  const navigate = useNavigate();
  const { testAnswers, updateUserData, userData } = useFlow();
  const [isNavigating, setIsNavigating] = useState(false);

  const answers = Array.from({ length: 20 }, (_, i) => testAnswers[i] ?? 0);

  const countByRule = (
    start: number,
    end: number,
    firstTraitRule: (answer: number) => boolean
  ) => {
    let firstTrait = 0;
    let secondTrait = 0;
    for (let i = start; i <= end; i++) {
      if (firstTraitRule(answers[i])) firstTrait += 1;
      else secondTrait += 1;
    }
    return { firstTrait, secondTrait };
  };

  const ie = countByRule(0, 4, (a) => a === 0 || a === 1);
  const sn = countByRule(5, 9, (a) => a === 0 || a === 1);
  const tf = countByRule(10, 14, (a) => a === 0 || a === 2);
  const jp = countByRule(15, 19, (a) => a === 0 || a === 1);

  const calculatedType =
    `${ie.firstTrait >= ie.secondTrait ? "I" : "E"}` +
    `${sn.firstTrait >= sn.secondTrait ? "S" : "N"}` +
    `${tf.firstTrait >= tf.secondTrait ? "T" : "F"}` +
    `${jp.firstTrait >= jp.secondTrait ? "J" : "P"}`;

  const enteredMbti = userData.mbti?.trim().toUpperCase() || "";
  const type = VALID_MBTI_TYPES.has(enteredMbti) ? enteredMbti : calculatedType;

  const theme = getMbtiVisualTheme(type);
  const copy = getOtherPatchMbtiCopy(type);

  useEffect(() => {
    if (userData.mbti !== type) {
      updateUserData({ mbti: type });
    }
  }, [type, userData.mbti, updateUserData]);

  const handleNext = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/select-item");
    }, 180);
  };

  return (
    <div
      className={`personality-result-template other-patch-mbti-page other-patch-theme-${theme}`}
    >
      <div className="result-title">YOU ARE...</div>

      <PersonalityResultCharacter variant={theme} />

      <div className={`other-patch-type-pill banner-text-${theme}`}>{type}</div>

      <div className={`other-patch-archetype banner-text-${theme}`}>
        THE {copy.archetype}
      </div>

      <div className="other-patch-detail-rows">
        <div className="other-patch-detail-row">{copy.tagline}</div>
        <div className="other-patch-detail-row">{copy.funFact}</div>
        <div className="other-patch-detail-row">{copy.jobs}</div>
        <div className="other-patch-detail-row">{copy.famous}</div>
      </div>

      <div className="other-patch-mbti-actions">
        <button
          type="button"
          className={`page20-next-button ${isNavigating ? "is-clicked" : ""}`}
          onClick={handleNext}
          disabled={isNavigating}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OtherPatchResult;
