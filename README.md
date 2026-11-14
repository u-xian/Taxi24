# Taxi24

Taxi24 is an application that holds a set of APIs that other companies can use to manage their fleet of drivers and allocate drivers to passengers.

## Features

- **Drivers**
  - Get a list of all drivers
  - Get a list of all available drivers
  - Get a list of all available drivers within 3 km of a specific location
  - Get a specific driver by ID

- **Trips**
  - Create a new trip by assigning a driver to a rider
  - Complete a trip
  - Get a list of all active trips

- **Riders**
  - Get a list of all riders
  - Get a specific rider by ID
  - For a specific rider, get a list of the 3 closest drivers

## Tech stack

- Node.js
- Express
- Sequelize and sequelize-cli
- PostgreSQL
- dotenv, for environment variables
- Joi, for request validation
- Jest and Supertest, for tests

## Installation

- Ensure you have the Nodejs and Postgresql DB installed then you can clone this repository in your local machine.

### 1. Install all depedencies

```
npm install
```

### 2. Copy .env.example .env to get environment variables required and edit .env with actual database username and password

```
cp .env.example .env
```

### 3. Run the command below to create database, run migrations and seeds

```
npm run db:setup
```

### 4. Run the App

```
npm start
```

## API EndPoints

<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Functionality</th>
  </tr>
  <tr>
    <td colspan="3">Drivers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers</td>
      <td>Get all drivers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers/available</td>
      <td>Get available drivers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers/bylocation?latitude=&longitude=&radius=</td>
      <td>Get available drivers within <code>radius</code> km of a location (default 3 km, max 50), nearest first</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers/:driverId</td>
      <td>Get a driver by ID </td>
  </tr>
  <tr>
    <td colspan="3">Trips</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/trips</td>
      <td>Get all trips</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/trips</td>
      <td>Create a new Trip</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/trips/:tripId</td>
      <td>Complete Trip</td>
  </tr>
  <tr>
    <td colspan="3">Riders</td>
  </tr>
  <tr>
      <td>Get</td>
      <td>/api/v1/riders</td>
      <td>Get all Riders</td>
  </tr>
  <tr>
      <td>Get</td>
      <td>/api/v1/riders/:riderId</td>
      <td>Get a rider by ID</td>
  </tr>
  <tr>
      <td>Get</td>
      <td>/api/v1/riders/closedriver/:riderId</td>
      <td>Get the 3 available drivers closest to the rider</td>
  </tr>
</table>
<br/>
