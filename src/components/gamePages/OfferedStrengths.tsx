import InfiniteScroll from "react-infinite-scroll-component";
import { useQuestion } from "../../context/QuestionContext";
import StrFinderCard from "./StrFinderCard";
import { Collapse, List, Skeleton } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";

const OfferedStrengths = () => {
  const { questionTitle, questionDescription } = useQuestion();
  const isDilemmaOwner = localStorage.getItem("isDilemmaOwner") === "true";

  const strengths = [
    {
      title: "Resilience",
      description:
        "The ability to bounce back from adversity and maintain a positive outlook.",
    },
    {
      title: "Empathy",
      description:
        "The capacity to understand and share the feelings of others, fostering deeper connections.",
    },
    {
      title: "Creativity",
      description:
        "The talent for thinking outside the box and coming up with innovative solutions.",
    },
    {
      title: "Leadership",
      description:
        "The skill to guide and inspire others towards a common goal, setting a positive example.",
    },
    {
      title: "Adaptability",
      description:
        "The flexibility to adjust to new circumstances and challenges, ensuring continued success.",
    },
  ];

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
        style={{
          width: "100%",
        }}
      >
        <div className="solution-card">
          <h1 className="solution-card-text">Steven</h1>
          <p className="solution-card-description">Write your heart Out</p>
        </div>
        {isDilemmaOwner ? (
          <div>
            <StrFinderButton textContent="Emotional" btnColor="blue" />
            <StrFinderButton textContent="Mental" btnColor="blue" />
            <StrFinderButton textContent="Physical" btnColor="blue" />
            <StrFinderButton textContent="Relational" btnColor="blue" />
            <StrFinderButton textContent="Joker" btnColor="blue" />
          </div>
        ) : (
          <div
            id="scrollableDiv"
            className="scrollable_cards_wrapper"
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <InfiniteScroll
              dataLength={5}
              next={() => {}}
              hasMore={false}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={strengths}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <Collapse className="list-collapse-item">
                      <Collapse.Panel
                        style={{ backgroundColor: "#ffffff" }}
                        header={item.title}
                        key={index}
                      >
                        <p>{item.description}</p>
                      </Collapse.Panel>
                    </Collapse>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferedStrengths;
