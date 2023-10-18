const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://evivermeeren:wachtwoord@cluster0.ep81pko.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "messages",
  }
);

const messageSchema = new mongoose.Schema(
  {
    user: String,
    text: String,
  },
  {
    collection: "messages",
  }
);

const Message = mongoose.model("Message", messageSchema);

// Body-parser middleware om JSON-berichten te verwerken
app.use(express.json());

// CORS toestaan
const cors = require("cors");
app.use(cors());

// GET-eindpunt for a message based on ID sent as a query parameter
app.get("/api/v1/messages", async (req, res) => {
  const messageId = req.query.id;

  if (messageId) {
    try {
      const message = await Message.findById(messageId);

      if (!message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      return res.json({
        status: "success",
        message: `GETTING message with ID ${messageId}`,
        data: {
          message,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  } else {
    // If no ID is provided, return all messages
    try {
      const messages = await Message.find({});
      return res.json({
        status: "success",
        message: "GETTING all messages",
        data: {
          messages,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
});

app.post("/api/v1/messages", async (req, res) => {
  const { user, text } = req.body.message;

  const newMessage = new Message({
    user,
    text,
  });

  try {
    const message = await newMessage.save();
    res.json({
      status: "success",
      message: `POSTING a new message for user ${user}`,
      data: {
        message,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to save message",
    });
  }
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
app.get("/api/v1/messages", (req, res) => {
  const username = req.query.user;

  if (username) {
    // Filter messages for the specified username
    const filteredMessages = messages.filter((msg) => msg.user === username);

    res.json({
      status: "success",
      message: `GET messages with username ${username}`,
      data: {
        messages: filteredMessages,
      },
    });
  } else {
    res.json({
      status: "success",
      message: "GETTING messages",
      data: {
        messages,
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
