import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { Player, Group } from "../../types/types";
import { socket } from "../../socket/socket";
import { useGameTemplate } from "../../hooks/game/useGameTemplate";
import { useIsDilemmaOwner } from "../../context/IsDilemmaOwnerContext";

const GameStrengths = () => {
  const gameCode = localStorage.getItem("gameCode");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<{ [key: string]: Group }>({});
  const playerId = JSON.parse(localStorage.getItem("player") || "")._id;
  const { setGameTemplate } = useGameTemplate();
  const { setIsDilemmaOwner } = useIsDilemmaOwner();

  useEffect(() => {
    // Listen for groups data updates
    socket.on("groupsData", (data) => {
      setGroups(data);
    });

    // Request the initial groups data when component mounts
    socket.emit("getGroups", gameCode);

    return () => {
      socket.off("groupsData");
    };
  }, [gameCode]);

  const handleNext = () => {
    const group = findGroupForPlayer(playerId);
    localStorage.setItem("groupCode", group?.groupCode || "");

    // Emit playerReady event to indicate player is ready
    socket.emit("playerReady", {
      groupCode: group?.groupCode,
      playerId: playerId,
    });

    // Listen for gameTemplate data updates
    socket.on("gameTemplate", (data) => {
      console.log("Received gameTemplate data:", data);
      setGameTemplate(data);
    });

    socket.on("isDilemmaOwner", (data) => {
      console.log("is Dilemma owner:", data);
      setIsDilemmaOwner(data);
    });

    // Navigate to the next page
    navigate("/game/chooseQuestion");

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("gameTemplate");
      socket.off("isDilemmaOwner");
    };
  };

  const findGroupForPlayer = (playerId: string) => {
    for (const group of Object.values(groups)) {
      if (group.players.some((player) => player._id === playerId)) {
        return group;
      }
    }
    return null;
  };

  return (
    <div className="generic_game_content_holder">
      <div className="strength_update_title">
        {Object.entries(groups).map(([groupCode, group]) => (
          <div key={groupCode}>
            <div className="game_group_title">{`Group ${groupCode}`}</div>
            <div className="flex_direction_column ">
              {group.players.map((player: Player) => (
                <div key={player._id} className="game_group_element">
                  {player.nickName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="generic_button_holder">
        <div>{t("startTheGame")}</div>
        <StrFinderButton
          onClick={handleNext}
          btnColor="green"
          btnWidth="revert-layer"
          textContent={t("next").toUpperCase()}
        />
      </div>
    </div>
  );
};

export default GameStrengths;
