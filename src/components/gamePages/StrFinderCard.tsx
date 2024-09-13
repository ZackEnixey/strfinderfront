import StrFinderButton from "../reusableParts/StrFinderButton";
import { useTranslation } from "react-i18next";

interface CardProps {
  title: string;
  content: string;
  isDilemma: boolean;
  onCardSelect: () => void;
}

const StrFinderCard = ({
  title,
  content,
  isDilemma,
  onCardSelect,
}: CardProps) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div>
        <h4>{title}</h4>
        <p className="description">{content}</p>
      </div>
      <div className="card-button">
        {isDilemma && (
          <StrFinderButton
            btnColor="green"
            btnWidth="60vw"
            btnHeight="7vh"
            smallButton={true}
            textContent={t("select").toUpperCase()}
            onClick={onCardSelect}
          />
        )}
      </div>
    </div>
  );
};

export default StrFinderCard;
