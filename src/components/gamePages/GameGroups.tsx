import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { Player, Group } from "../../types/types";
import { socket } from "../../socket/socket";

const GameStrengths = () => {
  const gameCode = localStorage.getItem("gameCode");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<{ [key: string]: Group }>({});
  const playerId = JSON.parse(localStorage.getItem("player") || "")._id;

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

    // Emit playerReady event to indicate player is ready
    socket.emit("playerReady", {
      groupCode: group?.groupCode,
      playerId: "6694e46843b8af95dc157f28",
    });
    // Navigate to the next page
    navigate("/game/gameStrengthManager");
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
