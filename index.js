const express = require("express");
const app = express();
const port = 3000;

// Body-parser middleware om JSON-berichten te verwerken
app.use(express.json());

// CORS toestaan
const cors = require("cors");
app.use(cors());

// Lijst met bestaande berichten
const messages = [
  {
    id: "911",
    user: "Joris Hens",
    message: "Hallo daar!",
  },
  {
    id: "912",
    user: "Evi Vermeêren",
    message: "Goedemorgeeeen...",
  },
  {
    id: "913",
    user: "pikachu",
    message: "Dit is een bericht van pikachu :D",
  },
];

// GET-eindpunt voor alle berichten
app.get("/api/v1/messages", (req, res) => {
  res.json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages,
    },
  });
});

// GET-eindpunt voor een enkel bericht op basis van ID
app.get("/api/v1/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    res.status(404).json({
      status: "error",
      message: "Message not found",
    });
  } else {
    res.json({
      status: "success",
      message: `GETTING message with ID ${messageId}`,
      data: {
        message,
      },
    });
  }
});

app.post("/api/v1/messages", (req, res) => {
  const { user, text } = req.body.message;
  const newMessage = {
    id: String(Math.floor(Math.random() * 1000)),
    user,
    message: text,
  };

  messages.push(newMessage);

  res.json({
    message: `POSTING a new message for user ${user}`,
  });
});

app.put("/api/v1/messages/:id", (req, res) => {
  const messageId = req.params.id;

  res.json({
    message: `UPDATING a message with ID ${messageId}`,
  });
});

app.delete("/api/v1/messages/:id", (req, res) => {
  const messageId = req.params.id;

  res.json({
    message: `DELETING a message with ID ${messageId}`,
  });
});

// GET-eindpunt voor alle berichten met bepaalde username
app.get(" /api/v1/messages", (req, res) => {
  const username = req.query.user;

  if (username) {
    res.json({
      status: "success",
      message: `GET messages with username ${username}`,
    });
  } else {
    res.json({
      status: "success",
      message: "GET all messages",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
