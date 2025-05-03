import PropTypes from "prop-types";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Payments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Payments.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Payments = ({ setTotalPayments, setTotalAmount }) => {
  const [payments, setPayments] = useState([]);

  // Fetch payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payments/getallpayments"
        );
        setPayments(response.data);

        // Calculate total payments and total amount
        const totalPayments = response.data.length;
        const totalAmount = response.data.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );

        // Pass the totals to parent component via props
        setTotalPayments(totalPayments);
        setTotalAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [setTotalPayments, setTotalAmount]);

  const navigate = useNavigate();

  const handleUpdate = (paymentId) => {
    navigate(`/managementdashboard/payments/updatepayments/${paymentId}`);
  };

  const handleDelete = async (paymentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/payments/deletepayment/${paymentId}`
      );
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== paymentId)
      );
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const generateReport = () => {
    try {
      console.log('Starting PDF generation...');
      console.log('Payments data:', payments);

      // Create a new PDF document
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("Payments Report", 14, 15);

      // Prepare data for the table
      const tableData = payments.map(payment => {
        console.log('Processing payment:', payment);
        return [
          payment.user || 'N/A',
          payment.amount || 'N/A',
          payment.method || 'N/A',
          payment.status || 'N/A'
        ];
      });

      console.log('Table data prepared:', tableData);

      // Add the table using autoTable function
      autoTable(doc, {
        head: [['ID', 'Amount', 'Method', 'Status']],
        body: tableData,
        startY: 25,
        theme: 'grid',
        headStyles: {
          fillColor: [34, 191, 194],
          textColor: 255,
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        didDrawPage: function(data) {
          // Add page number
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(10);
          doc.text('Page ' + data.pageNumber + ' of ' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
      });

      console.log('Table added to PDF');

      // Save the PDF
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'payments_report.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      }, 100);

      console.log('PDF download initiated');
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error stack:', error.stack);
      alert(`Error generating PDF report: ${error.message}\nPlease check the console for more details.`);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>All Payments</h2>
              <Button 
                variant="success" 
                onClick={generateReport}
                className="generate-report-btn"
              >
                Generate Report
              </Button>
            </div>
            <Table striped bordered hover responsive="sm" className="mt-4 form">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.user}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.method}</td>
                    <td>{payment.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(payment._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(payment._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Add PropTypes validation for the props
Payments.propTypes = {
  setTotalPayments: PropTypes.func.isRequired,
  setTotalAmount: PropTypes.func.isRequired,
};

export default Payments;
