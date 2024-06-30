# JanataWiFi Task - Stock Data CRUD Web App

This project implements a CRUD (Create, Read, Update, Delete) web application using ReactJS for the frontend and NodeJS Server for the backend. It includes features such as displaying stock data in a table, editing table rows, and visualizing data with line and bar charts using Recharts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Deployment](#deployment)
- [Installation](#installation)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [Live Links](#live-links)
- [Server repo Link](#server-repository-link)
- [Login Credentials](#login-credentials)

## Features

- Table Visualization: Displays stock data fetched from SQL Server in a tabular format. Allows editing of table rows for CRUD operations.

- Line Chart: Visualizes the 'close' column over time ('sorted date') with the ability to switch between different 'trade_code' options via a dropdown.

- Bar Chart: Accompanies the line chart by visualizing the 'volume' column over time.
- Pie Chart: For whole market share details

## Tech Stack

#### Frontend:

- ReactJS
- React Router DOM for routing
- Redux Toolkit for state management
- React Query for data fetching
- Recharts for data visualization
- Tailwind CSS for styling

#### Backend:

 - Node (Express-TS)
 - MongoDB
 - Mongoose 
 - Bcrypt
 - JWT


## Deployment:

Deployed on Netlify and Render

## Installation

To run this project locally:

#### Clone the repository:

```
git clone <repository-url>
cd <project-folder>
```

#### Install dependencies:

```
npm install

```

#### Start the development server:

```
npm run dev
```

#### Navigate to http://localhost:3000 in your browser.

## Challenges Faced

#### Integration of React with Server:

Setting up the backend to fetch data from MongoDB atlas Server and integrating it with the React frontend posed initial challenges in configuring the API endpoints and ensuring seamless data flow.

#### Data Visualization with Recharts:

Implementing a multi-axis chart (line and bar charts together) and syncing it with the dropdown selection for 'trade_code' required careful handling of state and props in React.

#### Deployment:

Deploying the application to a cloud hosting service and ensuring all components functioned correctly in a production environment involved troubleshooting environment-specific issues.

## Future Improvements

#### Enhanced CRUD Functionality:

Implementing better error handling for CRUD operations.

#### User Authorization:

Adding user authorization for role based data access.

#### Performance Optimization:

Optimizing data fetching and rendering for large datasets and improving overall application performance.

## Live link

- jsonModel : https://simple-stocks-crud.netlify.app/
- CRUDModel : https://simple-stocks-json.netlify.app/

## Server Repository link

- Server: https://github.com/Samiislam851/basic-stocks-server

## Login credentials

#### userEmail : samisiam852@gmail.com

#### password : 123456

or you can create your own ID with register
