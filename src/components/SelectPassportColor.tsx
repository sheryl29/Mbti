import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import type { SelectedItem } from "../types";

const SelectPassportColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, userData } = useFlow();

  const passportColors = [{ image: "/passport.png", label: "GREY", value: "grey" }];
  const [selectedColor, setSelectedColor] = useState<string | null>("grey");

  const handleBack = () => {
    navigate("/select-item");
  };

  const handleNext = () => {
    if (!selectedColor) return;

    const passportItem: SelectedItem = {
      type: "passport_case",
      color: selectedColor,
      price: 99,
    };

    const prevItems = userData.selectedItems ?? [];
    const nextItems = prevItems.some((i) => i.type === "passport_case")
      ? prevItems.map((i) => (i.type === "passport_case" ? { ...i, ...passportItem } : i))
      : [...prevItems, passportItem];

    updateUserData({
      selectedItems: nextItems,
      ...(nextItems.length === 1 ? { selectedItem: passportItem } : null),
    });

    const selectedTypes = new Set(nextItems.map((i) => i.type));
    if (selectedTypes.has("lanyard")) navigate("/select-lanyard-color");
    else navigate("/add-on-patches");
  };

  return (
    <div className="select-cap-color-page">
      <button className="select-cap-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-cap-color-title">
        <div className="select-cap-color-title-line">PICK YOUR</div>
        <div className="select-cap-color-title-line">PASSPORT CASE</div>
      </div>

      <div className="select-passport-color-grid">
        {passportColors.map((p) => (
          <div
            key={p.value}
            className={`select-cap-color-item ${
              selectedColor === p.value ? "selected" : ""
            }`}
            onClick={() => setSelectedColor(p.value)}
          >
            <div className="select-cap-color-image-wrapper">
              <img src={p.image} alt={p.label} />
            </div>
            <div className="select-cap-color-label">{p.label}</div>
          </div>
        ))}
      </div>

      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedColor}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectPassportColor;

