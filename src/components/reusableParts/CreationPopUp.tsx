import { CloseOutlined } from "@ant-design/icons";
import StrFinderButton from "./StrFinderButton";
import { Input } from "antd";

interface CreationPopUpProps {
  onClose: () => void;
}

const CreationPopUp: React.FC<CreationPopUpProps> = ({ onClose }) => {
  return (
    <div className="pop-up-container">
      <div className="pop-up-header">
        <h3>Create a new Emotional Card</h3>
        <div onClick={onClose}>
          <CloseOutlined style={{ fontSize: "30px", color: "#AA4258" }} />
        </div>
      </div>
      <div className="pop-up-content">
        <div className="pop-up-inputs">
          <div className="input-container">
            <div className="input-label">Title:</div>
            <div>
              <Input
                className="custom-input"
                size="large"
                required
                placeholder=""
              />
            </div>
            <div className="input-container">
              <div className="input-label">Description:</div>
              <div>
                <Input
                  className="custom-input big"
                  size="large"
                  required
                  placeholder=""
                />
              </div>
              <div className="input-container">
                <div className="input-label">Additional Text:</div>
                <div>
                  <Input
                    className="custom-input big"
                    size="large"
                    required
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div>
              <StrFinderButton btnColor="pink" textContent="CREATE" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationPopUp;
