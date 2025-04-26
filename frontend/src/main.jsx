import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ManagementPrivateRoute from "./components/ManagementPrivateRoute.jsx";
import AdminDashboard from "./screens/Management/AdminDashboard.jsx";
import Patients from "./screens/Management/Patients.jsx";
import Reports from "./screens/Management/Reports.jsx";
import Overview from "./screens/Management/Overview.jsx";

import Payments from "./screens/Management/Payments.jsx";
import Emergency from "./screens/Management/Emergency.jsx";
import AddDoctor from "./screens/Management/AddDoctor.jsx";
import Doctor from "./screens/Management/Doctor.jsx";
import EditDoctor from "./screens/Management/EditDoctor.jsx";
import Appointment from "./screens/Patient/Appointment.jsx";
import AllAppointments from "./screens/Patient/AllAppointments.jsx";
import AdminAppointments from "./screens/Management/AdminAppointment/AdminAppointments.jsx";
import EditAppointment from "./screens/Management/AdminAppointment/EditAppointment.jsx";
import RecommendationDoctors from "./screens/Patient/RecommendationDoctors.jsx";
import CompletedAppointmentAdmin from "./screens/Management/AdminAppointment/CompletedAppointmentAdmin.jsx";
import CompleteAppointmentPatient from "./screens/Patient/CompleteAppointmentPatient.jsx";

import MedicalRecordScreen from "./screens/Patient/MedicalRecordScreen.jsx";
import EmergencyRequestScreen from "./screens/EmergencyRequestScreen.jsx";
import MapScreen from "./screens/MapScreen.jsx";
import Ambulances from "./screens/Management/Ambulances.jsx";
import AddAmbulanceForm from "./screens/Management/AddAmbulanceForm";
import UpdateAmbulanceForm from "./screens/Management/UpdateAmbulanceForm.jsx";
import Assign from "./screens/Management/Assign.jsx";
import EmergencyReport from "./screens/Management/EmergencyReport.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PaymentReceiptScreen from "./screens/PaymentReceiptScreen.jsx";
import PendingApprovalScreen from "./screens/PendingApprovalScreen.jsx";
import MyPaymentsScreen from "./screens/Patient/MyPaymentsScreen.jsx";
import ReceiptScreen from "./screens/Patient/ReceiptScreen.jsx";
import Scan from "./screens/Management/Medical_Record/Scan.jsx";
import RecordForm from "./screens/Management/Medical_Record/Recordform.jsx";
import Recordshow from "./screens/Management/Medical_Record/Recordshow.jsx";
import Editrecord from "./screens/Management/Medical_Record/Editrecord.jsx";
import UpdatePatient from "./screens/Management/Patients/updatePatient.jsx";
import UpdatePayment from "./screens/Management/payment/UpdatePayment.jsx";
import Pandemic from "./screens/Pandemicmap.jsx";
import AlertList from "./screens/Management/Alerts/AlertList.jsx";
import AlertDetails from "./screens/Management/Alerts/AlertDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/pandemic" element={<Pandemic />} />

      {/* Patient Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/createAppointment" element={<Appointment />} />
        <Route path="/getAllAppointments" element={<AllAppointments />} />
        <Route path="/recommendDoctors" element={<RecommendationDoctors />} />
        <Route
          path="/getDeletedAppointmentsPatient"
          element={<CompleteAppointmentPatient />}
        />
        <Route path="/medicalrecord" element={<MedicalRecordScreen />} />
        <Route path="/emergencyrequest" element={<EmergencyRequestScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/paymentreceipt" element={<PaymentReceiptScreen />} />
        <Route path="/pendingapproval" element={<PendingApprovalScreen />} />
        <Route path="/mypayments" element={<MyPaymentsScreen />} />
        <Route path="/receipt/:paymentId" element={<ReceiptScreen />} />
      </Route>

      {/* Doctor Private Routes */}

      {/* Management Private Routes */}
      <Route path="" element={<ManagementPrivateRoute />}>
        <Route path="/managementdashboard" element={<AdminDashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/patients" element={<Patients />} />

        <Route path="/doctors" element={<Doctor />} />
        <Route path="/adddoctors" element={<AddDoctor />} />
        <Route path="/editdoctors/:id" element={<EditDoctor />} />

        <Route
          path="/getAllAppointmentsAdmin"
          element={<AdminAppointments />}
        />
        <Route path="/editappointment/:id" element={<EditAppointment />} />
        <Route
          path="/getDeletedAppointments"
          element={<CompletedAppointmentAdmin />}
        />

        <Route path="/payments" element={<Payments />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/managementdashboard/overview" element={<Overview />} />
        <Route path="/managementdashboard/patients" element={<Patients />} />
        <Route
          path="/managementdashboard/patients/updatepatients/:id"
          element={<UpdatePatient />}
        />

        <Route path="/managementdashboard/payments" element={<Payments />} />
        <Route
          path="/managementdashboard/payments/updatepayments/:id"
          element={<UpdatePayment />}
        />
        <Route path="/managementdashboard/emergency" element={<Emergency />} />
        <Route path="/managementdashboard/reports" element={<Reports />} />
        {/* <Route path="/managementdashboard/alerts" element={<Alerts />} /> */}
        {/* <Route path="/managementdashboard/alerts" element={<Alerts />} /> */}
        <Route path="/managementdashboard/pandemicAlerts" element={<AlertList />} />
        <Route path="/managementdashboard/alertsDetails/:id" element={<AlertDetails />} />
        <Route path="/admin/reports/scan" element={<Scan />} />
        <Route
          path="/admin/reports/scan/record-form"
          element={<RecordForm />}
        />
        <Route path="/recordshow" element={<Recordshow />} />
        <Route path="/updaterecord/:id" element={<Editrecord />} />

        <Route
          path="/managementdashboard/ambulances"
          element={<Ambulances />}
        />
        <Route path="/admin/add-ambulance" element={<AddAmbulanceForm />} />
        <Route
          path="/admin/update-ambulance/:id"
          element={<UpdateAmbulanceForm />}
        />
        <Route path="/admin/assign-ambulance/:requestId" element={<Assign />} />
        <Route path="/admin/emergency-report" element={<EmergencyReport />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
