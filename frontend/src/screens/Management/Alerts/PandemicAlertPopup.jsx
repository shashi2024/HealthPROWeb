import React from "react";
import "../../../styles/PandemicAlertPopup.css"; // external CSS for styles
import alert from "../../../images/Alert.jpg";

function PandemicAlertPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <img
          className="popup-image"
          src={alert}
          alt="Pandemic warning"
        />
        <div className="popup-content">
          <h2 className="warning-title">Warning!</h2>
          <p className="warning-message">
            A pandemic situation has been identified in this area.<br />
            Immediate action is required to ensure public and patient safety.
            Please implement necessary protocols, increase preparedness, and take
            urgent containment measures. Kindly address this matter with priority.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PandemicAlertPopup;
