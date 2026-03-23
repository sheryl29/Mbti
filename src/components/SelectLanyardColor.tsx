import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import type { SelectedItem } from "../types";

const SelectLanyardColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, userData } = useFlow();

  const lanyardColors = [
    { image: "/landyard1.png", label: "BLUE", value: "blue" },
    { image: "/landyard2.png", label: "WHITE", value: "white" },
  ];
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleBack = () => {
    navigate("/select-item");
  };

  const handleNext = () => {
    if (!selectedColor) return;

    const lanyardItem: SelectedItem = {
      type: "lanyard",
      color: selectedColor,
      price: 75,
    };

    const prevItems = userData.selectedItems ?? [];
    const nextItems = prevItems.some((i) => i.type === "lanyard")
      ? prevItems.map((i) => (i.type === "lanyard" ? { ...i, ...lanyardItem } : i))
      : [...prevItems, lanyardItem];

    updateUserData({
      selectedItems: nextItems,
      ...(nextItems.length === 1 ? { selectedItem: lanyardItem } : null),
    });

    navigate("/add-on-patches");
  };

  return (
    <div className="select-cap-color-page">
      <button className="select-cap-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-cap-color-title">
        <div className="select-cap-color-title-line">PICK YOUR</div>
        <div className="select-cap-color-title-line">CARD HOLDER & LANYARD</div>
      </div>

      <div className="select-cap-color-grid" style={{ maxWidth: 340 }}>
        {lanyardColors.map((l) => (
          <div
            key={l.value}
            className={`select-cap-color-item ${
              selectedColor === l.value ? "selected" : ""
            }`}
            onClick={() => setSelectedColor(l.value)}
          >
            <div className="select-lanyard-color-image-wrapper">
              <img src={l.image} alt={l.label} />
            </div>
            <div className="select-cap-color-label">{l.label}</div>
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

export default SelectLanyardColor;

