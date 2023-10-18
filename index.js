const express = require("express");
const app = express();
const port = 3000;
const messagesController = require("./controllers/api/v1/messages.js");

// Body-parser middleware om JSON-berichten te verwerken
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/api/v1/messages/:id", messagesController.getById);

app.post("/api/v1/messages", messagesController.post);

app.put("/api/v1/messages/:id", messagesController.put);

app.delete("/api/v1/messages/:id", messagesController.del);

app.get("/api/v1/messages", messagesController.getAll);
