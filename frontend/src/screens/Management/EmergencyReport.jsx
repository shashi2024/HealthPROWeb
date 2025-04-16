import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../../styles/EmergencyReport.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmergencyReport = () => {
  const [symptomCountsByUrgency, setSymptomCountsByUrgency] = useState({
    high: {},
    medium: {},
    low: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await axios.get("/api/emergency-requests");

        const symptomCounts = {
          high: {},
          medium: {},
          low: {},
        };

        const countSymptom = (urgencyLevel, symptom) => {
          if (!symptomCounts[urgencyLevel][symptom]) {
            symptomCounts[urgencyLevel][symptom] = 0;
          }
          symptomCounts[urgencyLevel][symptom]++;
        };

        response.data.forEach((req) => {
          const urgency = req.urgencylevel.toLowerCase();
          const symptoms = Array.isArray(req.symptoms) ? req.symptoms : [req.symptoms];

          symptoms.forEach((symptom) => {
            if (symptom) {
              countSymptom(urgency, symptom);
            }
          });
        });

        setSymptomCountsByUrgency(symptomCounts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmergencyRequests();
  }, []);

  const prepareChartData = () => {
    const highSymptoms = Object.values(symptomCountsByUrgency.high).reduce((a, b) => a + b, 0);
    const mediumSymptoms = Object.values(symptomCountsByUrgency.medium).reduce((a, b) => a + b, 0);
    const lowSymptoms = Object.values(symptomCountsByUrgency.low).reduce((a, b) => a + b, 0);

    return {
      labels: ['High Urgency', 'Medium Urgency', 'Low Urgency'],
      datasets: [
        {
          label: 'Symptom Count',
          data: [highSymptoms, mediumSymptoms, lowSymptoms],
          backgroundColor: 'rgba(52, 152, 219, 0.3)',
          borderColor: 'rgba(52, 152, 219, 0.8)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 152, 219, 0.5)',
        },
      ],
    };
  };

  // Function to handle printing the page
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container fluid className="AdminDashboard">
      <div className="report-section">
        <h2>Emergency Report</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Urgency Level</th>
                  <th>Common Symptoms</th>
                  <th>Request Count (by Symptoms and Urgency Level)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(symptomCountsByUrgency.high).length > 0 &&
                  Object.entries(symptomCountsByUrgency.high).map(([symptom, count]) => (
                    <tr key={`high-${symptom}`}>
                      <td>High</td>
                      <td>{symptom}</td>
                      <td>{count}</td>
                    </tr>
                  ))}

                {Object.keys(symptomCountsByUrgency.medium).length > 0 &&
                  Object.entries(symptomCountsByUrgency.medium).map(([symptom, count]) => (
                    <tr key={`medium-${symptom}`}>
                      <td>Medium</td>
                      <td>{symptom}</td>
                      <td>{count}</td>
                    </tr>
                  ))}

                {Object.keys(symptomCountsByUrgency.low).length > 0 &&
                  Object.entries(symptomCountsByUrgency.low).map(([symptom, count]) => (
                    <tr key={`low-${symptom}`}>
                      <td>Low</td>
                      <td>{symptom}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="chart-section" style={{ width: '800px', height: '400px', margin: '0 auto' }}>
              <h3>Symptom Distribution by Urgency Level</h3>
              <Bar
                data={prepareChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Total Symptom Counts by Urgency Level',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Print Button at the bottom of the page */}
            <div className="print-button-section" style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="primary" onClick={handlePrint}>
                Print
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default EmergencyReport;
