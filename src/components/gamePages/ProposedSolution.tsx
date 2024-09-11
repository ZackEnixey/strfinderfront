import InfiniteScroll from "react-infinite-scroll-component";
import StrFinderCard from "./StrFinderCard";
import { Button, Collapse, List, Skeleton } from "antd";
import { HeartOutlined, CheckCircleOutlined } from "@ant-design/icons"; // Import CheckCircleOutlined for the green icon
import type { ProposedSolution } from "../../types/types";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { useIsDilemmaOwner } from "../../context/IsDilemmaOwnerContext";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useNavigate } from "react-router-dom";
import { useQuestion } from "../../context/QuestionContext";

const ProposedSolution = () => {
  const [proposedSolutions, setProposedSolutions] = useState<
    ProposedSolution[]
  >([]);
  const [selectedSolution, setSelectedSolution] =
    useState<ProposedSolution | null>(null);

  const groupCode = localStorage.getItem("groupCode");
  const { questionTitle, questionDescription } = useQuestion();
  const { isDilemmaOwner } = useIsDilemmaOwner();
  const playerName = JSON.parse(localStorage.getItem("player") || "").nickName;
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getInitialProposedSolutions", { groupCode });

    socket.on("initialProposedSolutions", (solutions: ProposedSolution[]) => {
      setProposedSolutions(solutions);
    });

    socket.on("updateProposedSolutions", (newSolution: ProposedSolution) => {
      setProposedSolutions((prevSolutions) => [...prevSolutions, newSolution]);
    });

    socket.on("solutionLiked", ({ solutionTitle, playerName, likes }) => {
      setProposedSolutions((prevSolutions) =>
        prevSolutions.map((solution) =>
          solution.solutionTitle === solutionTitle &&
          solution.playerName === playerName
            ? { ...solution, likes }
            : solution
        )
      );
    });

    socket.on("chosenSolution", (solution: ProposedSolution) => {
      navigate("/game/offered-strengths");
      console.log(solution);
    });

    return () => {
      socket.off("initialProposedSolutions");
      socket.off("updateProposedSolutions");
      socket.off("solutionLiked");
      socket.off("chosenSolution");
    };
  }, [groupCode]);

  const handleLike = (solutionTitle: string, playerName: string) => {
    socket.emit("likeSolution", { solutionTitle, playerName, groupCode });
  };

  const handleSelectSolution = (solution: ProposedSolution) => {
    const solutionId = solution.solutionId;
    socket.emit("chosenSolution", { solutionId, playerName, groupCode });
  };

  return (
    <div className="generic_game_content_holder">
      <div className="proposed-solutions-container">
        <StrFinderCard
          title={questionTitle}
          content={questionDescription}
          isDilemma={false}
          onCardSelect={() => {}}
        />
      </div>
      <div
        id="scrollableDiv"
        className="scrollable_cards_wrapper"
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <InfiniteScroll
          dataLength={proposedSolutions.length}
          next={() => {}}
          hasMore={false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={proposedSolutions}
            renderItem={(item: ProposedSolution, index) => (
              <List.Item
                key={index}
                onClick={() => isDilemmaOwner && setSelectedSolution(item)} // Only allow selection if Dilemma owner
                style={{
                  backgroundColor:
                    selectedSolution === item ? "#e6f7e6" : "#ffffff", // Highlight selected item
                  border:
                    selectedSolution === item ? "1px solid green" : "none",
                  cursor: isDilemmaOwner ? "pointer" : "default",
                  marginLeft: "0",
                }}
              >
                <Collapse className={`list-collapse-item`}>
                  <Collapse.Panel
                    style={{ backgroundColor: "#ffffff" }}
                    header={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div>{item.playerName}</div>
                          <div style={{ fontSize: "12px", fontWeight: "400" }}>
                            {item.solutionTitle}
                          </div>
                        </div>
                        {selectedSolution === item && isDilemmaOwner && (
                          <CheckCircleOutlined style={{ color: "green" }} />
                        )}
                      </div>
                    }
                    key={index}
                  >
                    {item.solutionTitle}
                  </Collapse.Panel>
                </Collapse>
                <Button
                  style={{ width: "50px" }}
                  type="text"
                  shape="circle"
                  icon={<HeartOutlined />}
                  onClick={() =>
                    handleLike(item.solutionTitle, item.playerName)
                  }
                >
                  {item.likes}
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      {isDilemmaOwner && selectedSolution && (
        <StrFinderButton
          textContent="Next"
          btnColor="green"
          onClick={() => handleSelectSolution(selectedSolution)}
        />
      )}
    </div>
  );
};

export default ProposedSolution;
