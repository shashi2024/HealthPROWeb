import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/AlertList.css";
import { FaBookmark } from "react-icons/fa";

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [completedAlerts, setCompletedAlerts] = useState({});
  const [importantAlerts, setImportantAlerts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/alerts/generate")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Group alerts by "location (symptoms)"
  const groupedAlerts = alerts.reduce((acc, alert) => {
    const key = `${alert.location} (${alert.symptoms.join(", ")})`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(alert);
    return acc;
  }, {});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000); // seconds
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return new Date(timestamp).toLocaleString();
  };

  const handleMarkCompleted = (id) => {
    setCompletedAlerts((prev) => ({ ...prev, [id]: true }));
  };

  const handleMarkImportant = (id) => {
    setImportantAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleImportant = (id) => {
    setImportantAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="alert-list">
      {Object.entries(groupedAlerts).map(([key, group]) => {
        const firstAlert = group[0];
        return (
          <div key={key} className="alert-section">
            <div className="alert-header" onClick={() => toggleSection(key)}>
              <button
                className={`icon-btn ${
                  importantAlerts[firstAlert._id] ? "important" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkImportant(firstAlert._id);
                }}
              >
                ♥
              </button>
              <button
  className={`icon-btn ${importantAlerts[alert.id] ? "important" : ""}`}
  onClick={(e) => {
    e.stopPropagation();
    toggleImportant(alert.id); // This should toggle the state
  }}
>
  <FaBookmark size={20} />
</button>
              <span className="location">{firstAlert.location}</span>
              <span className="symptoms">
                ({firstAlert.symptoms.join(", ")})
              </span>
              <span className="time">
                {formatTimeAgo(firstAlert.timestamp)}
              </span>
              <span className="dropdown">{openSections[key] ? "▲" : "▼"}</span>
            </div>

            {openSections[key] && (
              <div className="alert-details">
                <table>
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Age Group</th>
                      <th>Gender</th>
                      <th>Hospital</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((alert) => (
                      <tr key={alert._id}>
                        <td>{alert.patientName}</td>
                        <td>{alert.ageGroup}</td>
                        <td>{alert.gender}</td>
                        <td>{alert.hospital}</td>
                        <td>
                          {completedAlerts[alert._id] ? (
                            <span className="completed">Completed</span>
                          ) : (
                            <button
                              className="complete-btn"
                              onClick={() => handleMarkCompleted(alert._id)}
                            >
                              Mark as Completed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="view-details">
                  <button onClick={() => navigate(`/alerts/${firstAlert._id}`)}>
                    View Full Details
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AlertList;
