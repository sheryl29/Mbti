import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const SelectCapColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, userData } = useFlow();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const caps = [
    { image: "/cap1.png", label: "BLACK", value: "black" },
    { image: "/cap2.png", label: "BLUE", value: "blue" },
    { image: "/cap3.png", label: "CREAM & NAVY", value: "cream_navy" },
    { image: "/cap4.png", label: "CREAM", value: "cream" },
  ];

  const hatType: "hat" = "hat";

  const handleNext = () => {
    if (!selectedColor) return;

    const capItem = {
      type: "cap" as const,
      color: selectedColor,
      hatType,
      price: 87,
    };

    const prevItems = userData.selectedItems ?? [];
    const hasShirt = prevItems.some((i) => i.type === "shirt");

    const nextItems = prevItems.some((i) => i.type === "cap")
      ? prevItems.map((i) => (i.type === "cap" ? { ...i, ...capItem } : i))
      : [...prevItems, capItem];

    updateUserData({
      selectedItems: nextItems,
      ...(hasShirt ? { selectedHat: capItem } : { selectedItem: capItem }),
    });

    const selectedTypes = new Set(nextItems.map((i) => i.type));
    if (selectedTypes.has("passport_case")) {
      navigate("/select-passport-color");
    } else if (selectedTypes.has("lanyard")) {
      navigate("/select-lanyard-color");
    } else {
      navigate("/add-on-patches");
    }
  };

  const handleBack = () => {
    const hasShirt = (userData.selectedItems ?? []).some((i) => i.type === "shirt");
    navigate(hasShirt ? "/design-shirt" : "/select-item");
  };

  const isSelected = (color: string) => {
    return selectedColor === color;
  };

  return (
    <div className="select-cap-color-page">
      <button className="select-cap-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-cap-color-title">
        <div className="select-cap-color-title-line">PICK YOUR</div>
        <div className="select-cap-color-title-line">CAP</div>
      </div>

      <div className="select-cap-color-grid-two-columns">
        {/* Column left: cap1, cap3 */}
        <div className="select-cap-color-column">
          {caps
            .filter((_, idx) => idx % 2 === 0)
            .map((cap) => (
              <div
                key={cap.value}
                className={`select-cap-color-item ${
                  isSelected(cap.value) ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(cap.value)}
              >
                <div className="select-cap-color-image-wrapper">
                  <img src={cap.image} alt={cap.label} />
                </div>
                <div className="select-cap-color-label">{cap.label}</div>
              </div>
            ))}
        </div>

        {/* Column right: cap2, cap4 */}
        <div className="select-cap-color-column">
          {caps
            .filter((_, idx) => idx % 2 === 1)
            .map((cap) => (
              <div
                key={cap.value}
                className={`select-cap-color-item ${
                  isSelected(cap.value) ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(cap.value)}
              >
                <div className="select-cap-color-image-wrapper">
                  <img src={cap.image} alt={cap.label} />
                </div>
                <div className="select-cap-color-label">{cap.label}</div>
              </div>
            ))}
        </div>
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

export default SelectCapColor;
