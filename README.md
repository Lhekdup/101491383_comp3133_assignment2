# COMP 3133: Full Stack Development - Assignment 2
**Employee Management System**

**Author:** Lhekdup  
**Student ID:** 101491383  

## Project Overview
This project is a full-stack Employee Management Application built using an Angular frontend and a Node.js/GraphQL backend. It allows users to create accounts, securely log in, and manage a database of employees through comprehensive CRUD operations.

## Tech Stack
### Frontend
**Framework:** Angular (Standalone Components)
**Styling:** Bootstrap 5 & Custom CSS
**HTTP Client:** Axios
**Routing:** Angular Router
**Hosting:** Vercel *(Link below)*

### Backend (Assignment 1)
**Runtime:** Node.js & Express.js
**API:** GraphQL (express-graphql)
**Database:** MongoDB Atlas
**Hosting:** Render/Other *(Link below)*

## Features Implemented
This application satisfies all requirements outlined in the COMP 3133 Evaluation Criteria:
**User Authentication:** * Full Signup and Login flows with form validation.
  Session management utilizing Local Storage for JWT tokens.
**Employee Management (CRUD):**
  **Create:** Add new employees, including converting uploaded profile pictures to Base64 strings for database storage.
  **Read:** View a formatted table of all employees, or click to view detailed individual profile cards.
  **Update:** Modify existing employee records with pre-filled forms.
  **Delete:** Remove employees from the database with a confirmation prompt.
**Search Functionality:** Dynamic filtering to search the employee list by department or designation.
**Responsive UI/UX:** Clean, professional interface built strictly with standard Bootstrap components and responsive grids.

## Local Setup Instructions

To run this application locally, you must run both the backend and the frontend servers concurrently.

### 1. Backend Setup
1. Navigate into the Assignment 1 backend directory.
2. Ensure your `.env` file contains your `PORT` and MongoDB connection string.
3. Install dependencies:
   ```bash
   npm install