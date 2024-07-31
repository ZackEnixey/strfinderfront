import { useEffect, useState } from "react";
import StrFinderButton from "../reusableParts/StrFinderButton";
import Modal from "./Modal";
import StrFinderCard from "./StrFinderCard";
import { SolutionItem } from "../../types/types";
import { fetchSolutionsByIds } from "../../hooks/game/get-solutions";
import { useGameTemplate } from "../../hooks/game/useGameTemplate";
import { socket } from "../../socket/socket"; // Import your socket instance
import { useNavigate } from "react-router-dom";

const SolutionSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState<string>("Emotional");
  const [isJoker, setIsJoker] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [emotional, setEmotional] = useState<SolutionItem[]>([]);
  const [mental, setMental] = useState<SolutionItem[]>([]);
  const [physical, setPhysical] = useState<SolutionItem[]>([]);
  const [relations, setRelations] = useState<SolutionItem[]>([]);
  const { gameTemplate } = useGameTemplate();
  const solutionIds = gameTemplate?.preselectedSolutionIds || [];
  const isDilemmaOwner = localStorage.getItem("isDilemmaOwner") === "true";
  const playerName = JSON.parse(localStorage.getItem("player") || "").nickName;
  const groupCode = localStorage.getItem("groupCode");
  const navigate = useNavigate();

  useEffect(() => {
    const getSolutions = async () => {
      if (solutionIds.length > 0) {
        try {
          const response = await fetchSolutionsByIds(solutionIds);
          setRelations(response.data.Relations);
          setEmotional(response.data.Emotional);
          setMental(response.data.Mental);
          setPhysical(response.data.Physical);
        } catch (error) {
          console.error("Error fetching solutions:", error);
        }
      }
    };
    getSolutions();
  }, [solutionIds]);

  const handleButtonClick = (type: string) => {
    setCurrentType(type);
    setIsJoker(false);
    setIsModalOpen(true);
  };

  const handleJokerClick = () => {
    setIsJoker(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    switch (currentType) {
      case "Emotional":
        setSolutions(emotional);
        break;
      case "Mental":
        setSolutions(mental);
        break;
      case "Physical":
        setSolutions(physical);
        break;
      case "Relational":
        setSolutions(relations);
        break;
      default:
        setSolutions([]);
        break;
    }
  }, [currentType, emotional, mental, physical, relations]);

  const handleCardSelect = (selectedSolution: SolutionItem) => {
    socket.emit("solutionSelected", {
      solutionTitle: selectedSolution.title,
      solutionDescription: selectedSolution.description,
      playerName: playerName,
      groupCode,
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Listening for updates on proposed solutions
    socket.on("updateProposedSolutions", () => {
      navigate("/game/proposedSolutions");
    });

    return () => {
      socket.off("updateProposedSolutions");
    };
  }, []);

  return (
    <div className="generic_game_content_holder">
      <div className="question-container">
        <StrFinderCard
          title="Manager challenges"
          content="My manager wants to get involved in the smallest details; it offends me and slows the work down."
          isDilemma={false}
          onCardSelect={() => {}}
        />
        {!isDilemmaOwner ? (
          <div>
            <h4 style={{ textAlign: "center" }}>
              Choose One of the offered Solutions below
            </h4>
            <StrFinderButton
              textContent="Emotional"
              btnColor="yellow"
              onClick={() => handleButtonClick("Emotional")}
            />
            <StrFinderButton
              textContent="Mental"
              btnColor="green"
              onClick={() => handleButtonClick("Mental")}
            />
            <StrFinderButton
              textContent="Physical"
              btnColor="pink"
              onClick={() => handleButtonClick("Physical")}
            />
            <StrFinderButton
              textContent="Relational"
              btnColor="blue"
              onClick={() => handleButtonClick("Relational")}
            />
            <StrFinderButton
              textContent="Joker"
              btnColor="black"
              onClick={handleJokerClick}
            />
          </div>
        ) : (
          <div>
            {" "}
            <h4 style={{ textAlign: "center" }}>
              Wait for others to choose solutions
            </h4>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solutions={solutions}
        isJoker={isJoker}
        onCardSelect={handleCardSelect}
      />
    </div>
  );
};

export default SolutionSelection;
