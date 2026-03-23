import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

interface PatchQuantity {
  patchId: string;
  quantity: number;
}

const AddOnPatches: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();

  const patches: Array<{ id: string; image: string }> = [
    { id: "airplane", image: "/other-patches/airplane.png" },
    { id: "avocado", image: "/other-patches/avocado.png" },
    { id: "barbell", image: "/other-patches/barbell.png" },
    { id: "basketball", image: "/other-patches/basketball.png" },
    { id: "bear", image: "/other-patches/bear.png" },
    { id: "bee", image: "/other-patches/bee.png" },
    { id: "bouquet", image: "/other-patches/bouquet.png" },
    { id: "chef-hat", image: "/other-patches/chef-hat.png" },
    { id: "coffee", image: "/other-patches/coffee.png" },
    { id: "croissant", image: "/other-patches/croissant.png" },
    { id: "dino", image: "/other-patches/dino.png" },
    { id: "duck", image: "/other-patches/duck.png" },
    { id: "dumpling", image: "/other-patches/dumpling.png" },
    { id: "egg", image: "/other-patches/egg.png" },
    { id: "explore", image: "/other-patches/explore.png" },
    { id: "eye", image: "/other-patches/eye.png" },
    { id: "fire", image: "/other-patches/fire.png" },
    { id: "fish", image: "/other-patches/fish.png" },
    { id: "flower-purple", image: "/other-patches/flower-purple.png" },
    { id: "flower-red", image: "/other-patches/flower-red.png" },
    { id: "flower-yellow", image: "/other-patches/flower-yellow.png" },
    { id: "football", image: "/other-patches/football.png" },
    { id: "goodlife", image: "/other-patches/goodlife.png" },
    { id: "goodvibes", image: "/other-patches/goodvibes.png" },
    { id: "helicopter", image: "/other-patches/helicopter.png" },
    { id: "love-pink", image: "/other-patches/love-pink.png" },
    { id: "love-red", image: "/other-patches/love-red.png" },
    { id: "nigiri", image: "/other-patches/nigiri.png" },
    { id: "onigiri", image: "/other-patches/onigiri.png" },
    { id: "padel-ball", image: "/other-patches/padel-ball.png" },
    { id: "padel-black", image: "/other-patches/padel-black.png" },
    { id: "padel-white", image: "/other-patches/padel-white.png" },
    { id: "pancake", image: "/other-patches/pancake.png" },
    { id: "panda", image: "/other-patches/panda.png" },
    { id: "penguin", image: "/other-patches/penguin.png" },
    { id: "polar-bear", image: "/other-patches/polar-bear.png" },
    { id: "ready-set-go", image: "/other-patches/ready-set-go.png" },
    { id: "ribbon", image: "/other-patches/ribbon.png" },
    { id: "rocket", image: "/other-patches/rocket.png" },
    { id: "saturn", image: "/other-patches/saturn.png" },
    { id: "star", image: "/other-patches/star.png" },
    { id: "strawberry", image: "/other-patches/strawberry.png" },
    { id: "sushi", image: "/other-patches/sushi.png" },
    { id: "thunder", image: "/other-patches/thunder.png" },
    { id: "ufo", image: "/other-patches/ufo.png" },
    { id: "alph-a", image: "/other-patches/alph-a.png" },
    { id: "alph-b", image: "/other-patches/alph-b.png" },
    { id: "alph-c", image: "/other-patches/alph-c.png" },
    { id: "alph-d", image: "/other-patches/alph-d.png" },
    { id: "alph-e", image: "/other-patches/alph-e.png" },
    { id: "alph-f", image: "/other-patches/alph-f.png" },
    { id: "alph-g", image: "/other-patches/alph-g.png" },
    { id: "alph-h", image: "/other-patches/alph-h.png" },
    { id: "alph-i", image: "/other-patches/alph-i.png" },
    { id: "alph-j", image: "/other-patches/alph-j.png" },
    { id: "alph-k", image: "/other-patches/alph-k.png" },
    { id: "alph-l", image: "/other-patches/alph-l.png" },
    { id: "alph-m", image: "/other-patches/alph-m.png" },
    { id: "alph-n", image: "/other-patches/alph-n.png" },
    { id: "alph-o", image: "/other-patches/alph-o.png" },
    { id: "alph-p", image: "/other-patches/alph-p.png" },
    { id: "alph-q", image: "/other-patches/alph-q.png" },
    { id: "alph-r", image: "/other-patches/alph-r.png" },
    { id: "alph-s", image: "/other-patches/alph-s.png" },
    { id: "alph-t", image: "/other-patches/alph-t.png" },
    { id: "alph-u", image: "/other-patches/alph-u.png" },
    { id: "alph-v", image: "/other-patches/alph-v.png" },
    { id: "alph-w", image: "/other-patches/alph-w.png" },
    { id: "alph-x", image: "/other-patches/alph-x.png" },
    { id: "alph-y", image: "/other-patches/alph-y.png" },
    { id: "alph-z", image: "/other-patches/alph-z.png" },
    { id: "num-0", image: "/other-patches/num-0.png" },
    { id: "num-1", image: "/other-patches/num-1.png" },
    { id: "num-2", image: "/other-patches/num-2.png" },
    { id: "num-3", image: "/other-patches/num-3.png" },
    { id: "num-4", image: "/other-patches/num-4.png" },
    { id: "num-5", image: "/other-patches/num-5.png" },
    { id: "num-6", image: "/other-patches/num-6.png" },
    { id: "num-7", image: "/other-patches/num-7.png" },
    { id: "num-8", image: "/other-patches/num-8.png" },
    { id: "num-9", image: "/other-patches/num-9.png" },
    { id: "char-!", image: "/other-patches/char-!.png" },
    { id: "char-?", image: "/other-patches/char-?.png" },
  ];

  const [patchQuantities, setPatchQuantities] = useState<
    Record<string, number>
  >(() => {
    const init: Record<string, number> = {};
    for (const patch of patches) init[patch.id] = 0;
    return init;
  });

  const handleDecrease = (patchId: string) => {
    setPatchQuantities((prev) => {
      const current = prev[patchId] || 0;
      return {
        ...prev,
        [patchId]: Math.max(0, current - 1),
      };
    });
  };

  const handleIncrease = (patchId: string) => {
    setPatchQuantities((prev) => {
      const current = prev[patchId] || 0;
      return {
        ...prev,
        [patchId]: current + 1,
      };
    });
  };

  const handleNext = () => {
    // Convert patch quantities to array format for storage
    const selectedPatches: PatchQuantity[] = Object.entries(patchQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([patchId, quantity]) => ({
        patchId,
        quantity,
      }));

    updateUserData({
      selectedPatches: selectedPatches,
    });

    navigate("/phone");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-on-patches-page">
      <button className="add-on-patches-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="add-on-patches-title">
        <div className="add-on-patches-title-line">ADD ON</div>
        <div className="add-on-patches-title-line">PATCHES</div>
      </div>

      <div className="add-on-patches-container">
        <div className="add-on-patches-grid">
          {patches.map((patch) => (
            <div key={patch.id} className="add-on-patches-item">
              <div className="add-on-patches-image-wrapper">
                <img src={patch.image} alt={`Patch ${patch.id}`} />
              </div>
              <div className="add-on-patches-quantity-selector">
                <button
                  className="add-on-patches-quantity-button"
                  onClick={() => handleDecrease(patch.id)}
                >
                  −
                </button>
                <span className="add-on-patches-quantity-number">
                  {patchQuantities[patch.id] || 0}
                </span>
                <button
                  className="add-on-patches-quantity-button"
                  onClick={() => handleIncrease(patch.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="page20-next-button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default AddOnPatches;

