import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; // Import Button for styling
import qrCodeImage from "../../../images/qrcode.png"; // Adjust the path accordingly

const Scan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("patientId"); // Get the patient ID from the query

  const handleScanClick = () => {
    // Navigate to the Record Form page for the specific patient
    navigate(`/admin/reports/scan/record-form?patientId=${patientId}`);
  };

  return (
    <div className="scan-container" style={{ textAlign: "center" }}>
      <h2>Scan Records for Patient ID: {patientId}</h2>
      {/* Display the static QR code image */}
      <img src={qrCodeImage} alt="QR Code" style={{ width: "256px", height: "256px" }} />
      <br />
      {/* Scan Button */}
      <Button variant="danger" onClick={handleScanClick} style={{ marginTop: "20px" }}>
        Scan Card
      </Button>
    </div>
  );
};

export default Scan;
