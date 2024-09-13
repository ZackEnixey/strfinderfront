import React, { useState } from "react";
import StrFinderCard from "./StrFinderCard";
import { SolutionItem } from "../../types/types";
import StrFinderButton from "../reusableParts/StrFinderButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardSelect: (selectedSolution: SolutionItem) => void;
  solutions: SolutionItem[];
  isJoker: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCardSelect,
  solutions,
  isJoker,
}) => {
  const [customSolution, setCustomSolution] = useState<string>("");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSolution(e.target.value);
  };

  /* const handleCustomSolutionSubmit = () => {
    if (customSolution.trim()) {
      onCardSelect(customSolution);
      setCustomSolution("");
      onClose();
    } else {
      alert("Please enter a custom solution.");
    }
  };*/

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {isJoker ? (
          <div className="joker-container">
            <h4>Write Your Custom Solution</h4>
            <div className="joker-input-container">
              <input
                type="text"
                className="joker-input"
                value={customSolution}
                onChange={handleInputChange}
                placeholder="Enter your custom solution"
              />
              <StrFinderButton
                textContent={"Submit"}
                btnColor="green"
                smallButton={true}
              />
            </div>
          </div>
        ) : (
          <div className="horizontal-scroll">
            {solutions.map((solution, index) => (
              <StrFinderCard
                key={index}
                title={solution.title}
                content={solution.description}
                isDilemma={true}
                onCardSelect={() => onCardSelect(solution)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
