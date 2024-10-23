const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const queues = {};

const getQueue = (queueName) => {
  if (!queues[queueName]) {
    queues[queueName] = [];
  }
  return queues[queueName];
};

// Add message to queue
app.post("/api/queue/:queue_name", (req, res) => {
  try {
    const queueName = req.params.queue_name;
    const message = req.body;

    if (!message) {
      return res.status(400).send("Message body is required");
    }

    if (typeof message !== "object" || Array.isArray(message)) {
      return res.status(400).send("Message must be a valid JSON object");
    }

    const queue = getQueue(queueName);
    queue.push(message);
    res.status(200).send("Message added to queue");
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Get message from queue
app.get("/api/queue/:queue_name", async (req, res) => {
  try {
    const queueName = req.params.queue_name;
    const timeout = parseInt(req.query.timeout) || 10000;
    const queue = getQueue(queueName);

    if (queue.length > 0) {
      return res.status(200).json(queue.shift());
    }

    // If no message is available, wait for the timeout
    await new Promise((resolve) => setTimeout(resolve, timeout));

    if (queue.length > 0) {
      return res.status(200).json(queue.shift());
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

//  Get list of all queue names with their sizes
app.get("/api/allQueues", (req, res) => {
  try {
    const queueInfo = Object.keys(queues).map((queueName) => ({
      name: queueName,
      size: queues[queueName].length,
    }));
    res.status(200).json(queueInfo);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
