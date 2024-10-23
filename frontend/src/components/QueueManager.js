import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { getQueues, getNextMessage } from "../api";

const QueueManager = () => {
  const classes = useStyles();
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const data = await getQueues();
        setQueues(data);
      } catch (error) {
        console.error("Error fetching queues:", error);
      }
    };

    fetchQueues();
  }, []);

  const handleSelectQueue = async (queueName) => {
    setSelectedQueue(queueName);
    try {
      const messageData = await getNextMessage(queueName);
      setMessage(messageData);
      // Fetch queues again to update the number of messages
      const data = await getQueues();
      setQueues(data);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const queueSize = (size) => {
    return size === 1 ? " 1 message" : " " + size + " messages";
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Queue Manager</h1>
      <h3>Available Queues:</h3>
      {queues.length === 0 ? (
        <p>List is empty</p>
      ) : (
        <ul className={classes.queueList}>
          {queues.map((queue) => (
            <li key={queue.name} className={classes.queueItem}>
              {queue.name} ({queueSize(queue.size)} )
              <button
                className={classes.queueButton}
                onClick={() => handleSelectQueue(queue.name)}
              >
                Go
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedQueue && (
        <div className={classes.messageContainer}>
          <h3>Selected Queue: {selectedQueue}</h3>
          {message ? (
            <div>
              <h4>Next Message:</h4>
              <pre>{JSON.stringify(message, null, 2)}</pre>
            </div>
          ) : (
            <p>No messages in the queue.</p>
          )}
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f2f0ee",
    color: "#003246",
    fontFamily: "Mulish, sans-serif",
  },
  header: {
    color: "#003246",
    textAlign: "center",
  },
  queueList: {
    listStyle: "none",
    padding: "0",
  },
  queueItem: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  queueButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  messageContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e9ecef",
    borderRadius: "4px",
  },
});

export default QueueManager;
