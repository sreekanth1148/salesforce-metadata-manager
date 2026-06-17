# Salesforce Validation Rule Manager

## Overview

Salesforce Validation Rule Manager is a web-based application developed using React.js, Node.js, and Salesforce Tooling API. The application allows users to securely authenticate with Salesforce using OAuth 2.0, retrieve validation rules from their Salesforce organization, view their current status, and manage them through an intuitive dashboard.

This project demonstrates Salesforce integration, API consumption, OAuth authentication, and modern full-stack web development practices.

---

## Features

* Secure Salesforce OAuth 2.0 Login
* Retrieve Validation Rules using Salesforce Tooling API
* Display Validation Rules with Active/Inactive Status
* Enable or Disable Validation Rules through the User Interface
* Deploy Workflow Integration
* Responsive and User-Friendly Dashboard
* Backend API Integration using Express.js

---

## Technologies Used

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Axios
* JSForce

### Salesforce

* Salesforce Developer Org
* Connected App
* OAuth 2.0 Authentication
* Tooling API

---

## System Architecture

```text
React Frontend
      │
      ▼
Node.js / Express Backend
      │
      ▼
Salesforce OAuth 2.0
      │
      ▼
Salesforce Tooling API
```

---

## Project Structure

```text
salesforce-validation-rule-manager/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   └── server.js
│
├── public/
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/sreekanth1148/salesforce-validation-rule-manager.git
```

### Install Frontend Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Start Backend Server

```bash
node server.js
```

---

## Assignment Requirements Implemented

* Salesforce Developer Org Setup
* Validation Rules Creation on Account Object
* Connected App Configuration
* OAuth 2.0 Authentication
* Tooling API Integration
* Validation Rule Retrieval
* Validation Rule Status Management
* Deploy Workflow Integration
* Modern User Interface

---

## Future Enhancements

* Metadata API Integration for Real-Time Validation Rule Deployment
* Bulk Enable/Disable Validation Rules
* User Activity Logs
* Advanced Dashboard Analytics
* Cloud Deployment and CI/CD Integration

---

## Author

**Avula Sreekanth**

B.Tech (Computer Science Engineering)

 