# Queue Management Project

[![React](https://img.shields.io/badge/React-17.0.2-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14.17.0-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Axios](https://img.shields.io/badge/Axios-0.21.x-blue.svg)](https://github.com/axios/axios)

## Description

This project consists of two parts:

- A **backend server** located in the `server` folder.
- A **frontend client** located in the `frontend` folder.

The frontend provides an interface to interact with queues managed by the backend server.
You can view available queues, see the number of messages in each queue, and retrieve the next message by clicking on the "Go" button.
The backend server will manage the queues and their messages, and the frontend will update accordingly to show the current state.

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- **Node.js** (v14 or higher)
- **npm**

### How to run the project:

```
cd server
```

Install the necessary dependencies:

```
npm install
```

Start the server:

```
nodemon server.js
```

The server will run on `http://localhost:3000`.

Navigate to the frontend folder:

```
cd frontend
```

Install the necessary dependencies:

```
npm install
```

Start the frontend application:

```
npm start
```

The frontend will be available on `http://localhost:3001`.

## How create a message:

To create a message in a queue, you can use Postman or any similar tool to make a POST request to the backend server.

#### Steps to Create a Message Using Postman:

Open Postman (or a similar tool).

Create a new POST request to the following URL:

```
http://localhost:3000/api/queue/{queueName}
```

Replace `{queueName}` with the desired name of your queue.

In the request body, select raw and choose JSON as the format.

Provide the message in JSON format, for example:

```
{
  "message": "Your message here"
}
```

Click Send to create the message.

You should receive a response indicating that the message was successfully added to the queue.

#### Alternative Ways to Create a Message

cURL Command: You can use the following cURL command in your terminal to create a message:

```
curl -X POST -H "Content-Type: application/json" -d '{"message": "Your message here"}' http://localhost:3000/api/queue/{queueName}
```

Replace `{queueName}` with the name of the queue.
