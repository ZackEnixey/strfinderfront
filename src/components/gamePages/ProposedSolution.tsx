import InfiniteScroll from "react-infinite-scroll-component";
import StrFinderCard from "./StrFinderCard";
import { Button, Collapse, List, Skeleton } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import type { ProposedSolution } from "../../types/types";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";

const ProposedSolution = () => {
  const [proposedSolutions, setProposedSolutions] = useState<
    ProposedSolution[]
  >([]);

  useEffect(() => {
    const groupCode = localStorage.getItem("groupCode");
    socket.emit("getInitialProposedSolutions", { groupCode });

    socket.on("initialProposedSolutions", (solutions: ProposedSolution[]) => {
      setProposedSolutions(solutions);
    });

    socket.on("updateProposedSolutions", (newSolution: ProposedSolution) => {
      setProposedSolutions((prevSolutions) => [...prevSolutions, newSolution]);
    });

    return () => {
      socket.off("initialProposedSolutions");
      socket.off("updateProposedSolutions");
    };
  }, []);

  return (
    <div className="generic_game_content_holder">
      <div className="proposed-solutions-container">
        <StrFinderCard
          title="Manager challenges"
          content="My manager wants to get involved in the smallest details; it offends me and slows the work down."
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
          hasMore={false} // Adjust based on your data fetching logic
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={proposedSolutions}
            renderItem={(item: ProposedSolution, index) => (
              <List.Item key={index}>
                <Collapse className={`list-collapse-item`}>
                  <Collapse.Panel
                    style={{ backgroundColor: "#ffffff" }}
                    header={
                      <div>
                        <div>{item.playerName}</div>{" "}
                        <div style={{ fontSize: "12px", fontWeight: "400" }}>
                          {item.solutionTitle}
                        </div>
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
                >
                  {item.likes}
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProposedSolution;
