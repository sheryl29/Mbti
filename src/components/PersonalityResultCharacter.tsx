import React from "react";
import type { PersonalityVisualTheme } from "../data/otherPatchMbtiCopy";

type Props = {
  variant: PersonalityVisualTheme;
};

/**
 * Shared hero character + orbit used on PersonalityResult and OtherPatchResult.
 */
const PersonalityResultCharacter: React.FC<Props> = ({ variant }) => {
  return (
    <div
      className={`result-character ${
        variant === "green"
          ? "harmonizer-layout"
          : variant === "blue"
          ? "guardians-layout"
          : variant === "purple"
          ? "brainiacs-layout"
          : variant === "yellow"
          ? "wanderers-layout"
          : ""
      }`}
    >
      {variant === "yellow" && (
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
      {variant === "purple" && (
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
      {variant === "blue" && (
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
      {variant === "green" && (
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
  );
};

export default PersonalityResultCharacter;
