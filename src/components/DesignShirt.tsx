import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const DesignShirt: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, userData } = useFlow();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleNext = () => {
    if (
      selectedTemplate &&
      (selectedTemplate === "middle" || selectedPosition)
    ) {
      // Save shirt design data
      updateUserData({
        shirtDesign: {
          template: selectedTemplate,
          position: selectedPosition || "middle",
        },
      });

      // Check if this is a bundle (user selected both shirt and cap)
      const selectedTypes = new Set(
        (userData.selectedItems ?? []).map((i) => i.type)
      );

      if (selectedTypes.has("cap")) {
        navigate("/select-cap-color");
      } else if (selectedTypes.has("passport_case")) {
        navigate("/select-passport-color");
      } else if (selectedTypes.has("lanyard")) {
        navigate("/select-lanyard-color");
      } else {
        navigate("/add-on-patches");
      }
    }
  };

  // const handleBack = () => {
  //   navigate("/personality-result");
  // };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    if (template === "middle") {
      setSelectedPosition("middle");
    } else {
      setSelectedPosition(""); // Clear position for other templates
    }
  };

  const handlePositionSelect = (position: string, template?: string) => {
    if (template) {
      setSelectedTemplate(template);
    }
    setSelectedPosition(position);
  };

  // Check if sleeve image should be active
  const isSleeveActive = () => {
    return (
      selectedTemplate === "sleeve" && (selectedPosition === "left" || selectedPosition === "right")
    );
  };

  return (
    <div className="design-shirt-template">
      {/* Header */}
      <div className="design-header">
        <div className="design-subtitle">DESIGN YOUR SHIRT</div>
        <div className="design-title">CHOOSE TEMPLATE</div>
      </div>

      {/* Shirt Templates */}
      <div className="shirt-templates">
        {/* Top Row */}
        <div className="template-row">
          {/* Middle Template */}
          <div className="template-option">
            <div
              className={`shirt-template ${
                selectedTemplate === "middle" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedTemplate("middle");
                setSelectedPosition("middle");
              }}
            >
              <img
                src="/13-removebg-preview.png"
                alt="Middle Template"
                className="shirt-template-image"
              />
            </div>
            <div className="position-buttons">
              <button
                className={`position-button ${
                  selectedTemplate === "middle" && selectedPosition === "middle"
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTemplate("middle");
                  setSelectedPosition("middle");
                }}
              >
                MIDDLE
              </button>
            </div>
            <div className="choose-text">*CHOOSE*</div>
          </div>

          {/* Chest Template */}
          <div className="template-option">
            <div
              className={`shirt-template ${
                selectedTemplate === "chest" ? "selected" : ""
              }`}
              onClick={() => handleTemplateSelect("chest")}
            >
              <img
                src="/14-removebg-preview.png"
                alt="Chest Template"
                className="shirt-template-image"
              />
            </div>

            <div className="position-buttons">
              <button
                className={`position-button ${
                  selectedTemplate === "chest" && selectedPosition === "left"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("left", "chest")}
              >
                LEFT
              </button>
              <button
                className={`position-button ${
                  selectedTemplate === "chest" && selectedPosition === "right"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("right", "chest")}
              >
                RIGHT
              </button>
            </div>
            <div className="choose-text">*CHOOSE*</div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="template-row">
          {/* Sleeve Template */}
          <div className="template-option sleeve-template">
            <div
              className={`shirt-template ${
                selectedTemplate === "sleeve" ? "selected" : ""
              } ${isSleeveActive() ? "active" : ""}`}
              onClick={() => handleTemplateSelect("sleeve")}
            >
              <img
                src="/15-removebg-preview.png"
                alt="Sleeve Template"
                className="shirt-template-image"
              />
            </div>
            <div className="template-label">SLEEVE</div>
            <div className="position-buttons">
              <button
                className={`position-button ${
                  selectedTemplate === "sleeve" && selectedPosition === "left"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("left", "sleeve")}
              >
                LEFT
              </button>
              <button
                className={`position-button ${
                  selectedTemplate === "sleeve" && selectedPosition === "right"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("right", "sleeve")}
              >
                RIGHT
              </button>
            </div>
            <div className="choose-text">*CHOOSE*</div>
          </div>
        </div>
      </div>

      {/* NEXT Button */}
      <button
        className="design-next-button"
        onClick={handleNext}
        disabled={
          !selectedTemplate ||
          (selectedTemplate !== "middle" && !selectedPosition)
        }
      >
        NEXT
      </button>
    </div>
  );
};

export default DesignShirt;
