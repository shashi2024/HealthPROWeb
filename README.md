<<<<<<< HEAD
# HealthPRO 🏥
A Comprehensive Healthcare Management System

## Overview
HealthPRO is an innovative healthcare management platform designed to bridge the gap between patients, doctors, and medical institutions. By leveraging modern technology, HealthNet ensures seamless access to healthcare services, efficient appointment scheduling, and better patient-doctor communication. The system is tailored to meet the needs of both urban and rural areas, promoting equitable access to quality healthcare. Main Specilaization is it has a pandemic tracking system that can use for iddentify infelction deceases around the contry.

## Features
1. Patient Management
- User-friendly patient registration and profile management.
- Secure storage of medical history and health records.
- Easy access to test results and prescriptions.
  
2. Appointment Scheduling
- Effortless appointment booking with preferred doctors.
- Real-time availability of doctors and specialists.
- Notifications and reminders for upcoming appointments.
  
3. Doctor Portal
- Manage patient appointments and medical records.
- View patient history to provide accurate diagnoses.
- Generate and share prescriptions digitally.
  
4. Hospital Administration
- Manage doctor schedules and availability.
- Monitor patient inflow and optimize resource allocation.
- Generate reports for operational insights.
  
5. Emergency Services
- Quick access to ambulance services through a dedicated module.
- Real-time GPS tracking for ambulances.
- Prioritize critical patients for immediate care.

6. Pandemic Tracking System
- In same area is there more than 3 people with same symptoms (3 symptoms) the map is detect is as a pandemic situation.
- Its showing using a Heat Map.
- Users also can come to the web and idetify about that situation.
- Its sends warning alerts and emails to admins to the system.

### Technologies Used
- Frontend: React.js for a responsive and intuitive interface.
- Backend: Node.js with Express for a robust server.
- Database: MongoDB for secure and scalable data storage.
- Authentication: JWT for secure user authentication.
- Microsoft Azure Maps - track the pandemic areas 
- Other Tools: REST APIs for seamless communication between components.

## Env Variables
Rename the `.env.example` file to `.env` and add the following:

```env
NODE_ENV=development
PORT=5000
MONGOURL="mongodb+srv://sashinisithara20:Y0G0H35277d7Gzw9@cluster0.xs386.mongodb.net/healthprodb?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET=abc123
```

# Run the application

## User Side - Frontend
```
npm run dev
```

## Server Side - Backend
```
npm start
```

## Concurrently run User side
```
npm run dev
```
=======
# HealthPROWeb
>>>>>>> 1081e3ec3d7fd7f2bdc58e6e74e8b8e896b85953
