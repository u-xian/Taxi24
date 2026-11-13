# Taxi24

Taxi24 is an application that holds a set of APIs that other companies can use to manage their fleet of drivers and allocate drivers to passengers.

## How it works

APIs provided are categorized as :

- Drivers
  _ Get a list of all drivers
  _ Get a list of all available drivers
  _ Get a list of all available drivers within 3km for a specific location
  _ Get a specific driver by ID

- Trip
  _ Create a new Trip request by assigning a driver to a rider
  _ Complete a trip \* Get a list of all active Trips

- Riders
  _ Get a list of all riders
  _ Get a specific rider by ID \* For a specific driver, get a list of the 3 closest drivers

## Technologies

1. Nodejs
2. Express
3. Sequelize & Sequelize-cli
4. PostgreSQL

## Installation

- Ensure you have the Nodejs and Postgresql DB installed then you can clone this repository in your local machine.

### 1. Install all depedencies

```
npm install
```

### 2. Copy .env.example .env to get environment variables required and edit .env with actual database password

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
      <td>/api/v1/driversavail</td>
      <td>Get available drivers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers/:driverId</td>
      <td>Get a driver by ID </td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/requests/:requestId</td>
      <td>Get a request</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/drivers/location/:distance/:location</td>
      <td>Get driver by location</td>
  </tr>
  <tr>
    <td colspan="3">Trips</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/trips</td>
      <td>Get active trips</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/trips</td>
      <td>Create a new Trip</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/trips</td>
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
      <td>/api/v1/riders/closestdriver/:riderId</td>
      <td>Get closest driver by rider ID</td>
  </tr>
</table>
<br/>
