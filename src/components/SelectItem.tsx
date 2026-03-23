import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import type { SelectedItem } from "../types";

type ItemKey = "shirt" | "cap" | "passport" | "lanyard";

const SelectItem: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();

  const [selected, setSelected] = useState<Record<ItemKey, boolean>>({
    shirt: false,
    cap: false,
    passport: false,
    lanyard: false,
  });

  const anySelected = useMemo(
    () => Object.values(selected).some(Boolean),
    [selected]
  );

  const toggle = (key: ItemKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (!anySelected) return;

    const selectedItems: SelectedItem[] = [];
    if (selected.shirt) selectedItems.push({ type: "shirt" });
    if (selected.cap) selectedItems.push({ type: "cap" });
    if (selected.passport) selectedItems.push({ type: "passport_case" });
    if (selected.lanyard) selectedItems.push({ type: "lanyard" });

    // Keep old shirt+cap bundle discount behavior.
    const isBundle = selected.shirt && selected.cap;

    updateUserData({
      selectedItems,
      isBundle,
    });

    // Start the wizard with the first selected item (by priority).
    if (selected.shirt) navigate("/select-shirt-color");
    else if (selected.cap) navigate("/select-cap-color");
    else if (selected.passport) navigate("/select-passport-color");
    else if (selected.lanyard) navigate("/select-lanyard-color");
    else navigate("/add-on-patches");
  };

  const handleBack = () => {
    navigate("/personality-result");
  };

  const shirts = [
    "/1-removebg-preview.png",
    "/2-removebg-preview.png",
    "/3-removebg-preview.png",
    "/4-removebg-preview.png",
  ];

  const caps = ["/cap1.png", "/cap2.png", "/cap3.png", "/cap4.png"];

  const passports = ["/passport.png"];

  const lanyards = ["/landyard1.png", "/landyard2.png"];

  const items = useMemo(
    () => [
      {
        key: "shirt" as const,
        label: "SHIRT",
        images: shirts,
        gridClass: "shirt-grid",
        price: "129K-139K",
        isSelected: selected.shirt,
      },
      {
        key: "cap" as const,
        label: "CAP",
        images: caps,
        gridClass: "cap-grid",
        price: "87K",
        isSelected: selected.cap,
      },
      {
        key: "passport" as const,
        label: "PASSPORT CASE",
        images: passports,
        gridClass: "passport-grid",
        price: "99K",
        isSelected: selected.passport,
      },
      {
        key: "lanyard" as const,
        label: "CARD HOLDER & LANYARD",
        images: lanyards,
        gridClass: "lanyard-grid",
        price: "75K",
        isSelected: selected.lanyard,
      },
    ],
    [caps, lanyards, passports, selected.cap, selected.lanyard, selected.passport, selected.shirt, shirts]
  );

  return (
    <div className="select-item-page">
      <button className="select-item-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-item-title">PICK YOUR ITEM</div>

      <div className="select-item-grid">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`select-item-tile ${item.isSelected ? "selected" : ""}`}
            onClick={() => toggle(item.key)}
          >
            <div className="select-item-tile-label">{item.label}</div>

            <div className={`select-item-products ${item.gridClass}`}>
              {item.images.map((src, index) => (
                <div
                  key={`${src ?? "placeholder"}-${index}`}
                  className={`select-item-product ${
                    src ? "select-item-product-real" : "select-item-product-placeholder"
                  }`}
                >
                  {src ? <img src={src} alt={item.label} /> : null}
                </div>
              ))}
            </div>

            <div className="select-item-tile-price">{item.price}</div>
          </button>
        ))}
      </div>

      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!anySelected}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectItem;
