import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import type { SelectedItem } from "../types";

const SelectShirtColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, userData } = useFlow();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const shirtColors = [
    { image: "/1-removebg-preview.png", label: "NOLLY", value: "nolly" },
    { image: "/2-removebg-preview.png", label: "WOLLY", value: "wolly" },
    { image: "/3-removebg-preview.png", label: "TILLY", value: "tilly" },
    { image: "/4-removebg-preview.png", label: "VELLY", value: "velly" },
    { image: "/9-removebg-preview.png", label: "NAVY", value: "navy" },
    { image: "/10-removebg-preview.png", label: "BLACK", value: "black" },
    { image: "/11-removebg-preview.png", label: "WHITE", value: "white" },
    { image: "/12-removebg-preview.png", label: "GREY", value: "grey" },
  ];

  const sizes = [
    { label: "S-M", value: "s-m", ld: "± 47CM" },
    { label: "L-XL", value: "l-xl", ld: "± 51CM" },
  ];

  const handleNext = () => {
    if (selectedColor && selectedSize) {
      // Calculate price based on color
      // Nolly, Wolly, Tilly, Velly = 160k
      // Navy, Black, White, Grey = 150k
      const premiumColors = ["nolly", "wolly", "tilly", "velly"];
      const price = premiumColors.includes(selectedColor) ? 160 : 150;

      const newShirtItem: SelectedItem = {
        type: "shirt",
        color: selectedColor,
        size: selectedSize,
        price,
      };

      const prevItems = userData.selectedItems ?? [];
      const nextItems = prevItems.some((i) => i.type === "shirt")
        ? prevItems.map((i) => (i.type === "shirt" ? { ...i, ...newShirtItem } : i))
        : [...prevItems, newShirtItem];

      updateUserData({
        selectedItems: nextItems,
        selectedItem: newShirtItem, // keep old field for backward compatibility
      });
      navigate("/design-shirt");
    }
  };

  const handleBack = () => {
    navigate("/select-item");
  };

  return (
    <div className="select-shirt-color-page">
      <button className="select-shirt-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-shirt-color-title">
        <div className="select-shirt-color-title-line">PICK YOUR</div>
        <div className="select-shirt-color-title-line">COLOR</div>
      </div>

      <div className="select-shirt-color-grid">
        {shirtColors.map((shirt, index) => (
          <div
            key={index}
            className={`select-shirt-color-item ${
              selectedColor === shirt.value ? "selected" : ""
            }`}
            onClick={() => setSelectedColor(shirt.value)}
          >
            <div className="select-shirt-color-image-wrapper">
              <img src={shirt.image} alt={shirt.label} />
            </div>
            <div className="select-shirt-color-label">{shirt.label}</div>
          </div>
        ))}
      </div>

      <div className="select-shirt-color-size-title">
        <div className="select-shirt-color-title-line">CHOOSE YOUR</div>
        <div className="select-shirt-color-title-line">SIZE</div>
      </div>

      <div className="select-shirt-color-size-buttons">
        {sizes.map((size, index) => (
          <div key={index} className="select-shirt-color-size-wrapper">
            <button
              className={`select-shirt-color-size-button ${
                selectedSize === size.value ? "selected" : ""
              }`}
              onClick={() => setSelectedSize(size.value)}
            >
              {size.label}
            </button>
            <div className="select-shirt-color-size-ld">LD: {size.ld}</div>
          </div>
        ))}
      </div>

      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedColor || !selectedSize}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectShirtColor;
