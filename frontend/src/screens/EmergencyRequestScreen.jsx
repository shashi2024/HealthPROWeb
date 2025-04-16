import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import "../styles/EmergencyRequestScreen.css";

const EmergencyRequestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the passed location
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contactnumber: "",
    symptoms: "",
    urgencylevel: "",
    location: "",
    hospital: "",
    additional: "",
  });

  const [error, setError] = useState(null);

  // Effect to update the location if passed from the MapScreen
  useEffect(() => {
    if (location.state && location.state.selectedLocation) {
      setFormData((prevData) => ({
        ...prevData,
        location: location.state.selectedLocation,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("/api/emergency-requests", formData);
      toast.success("Emergency request submitted successfully!");
      setFormData({
        name: "",
        age: "",
        contactnumber: "",
        symptoms: "",
        urgencylevel: "",
        location: "",
        hospital: "",
        additional: "",
      });
    } catch (err) {
      setError("Error submitting the request. Please try again.");
      toast.error("Failed to submit the emergency request.");
    }
  };

  const handleLocationClick = () => {
    navigate("/map"); // Navigate to the map page
  };

  return (
    <div className="container">
      <h2>Emergency Request Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="number"
            className="form-control"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Symptoms</label>
          <input
            type="text"
            className="form-control"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <select
            className="form-control"
            name="urgencylevel"
            value={formData.urgencylevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Urgency Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Hospital</label>
          <select
            className="form-control"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            <option value="Asiri">Asiri</option>
            <option value="Nawaloka">Nawaloka</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Information</label>
          <textarea
            className="form-control"
            name="additional"
            value={formData.additional}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Button to choose location via map */}
        <div className="form-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLocationClick}
          >
            Choose Location
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ToastContainer />
    </div>
  );
};

export default EmergencyRequestScreen;
