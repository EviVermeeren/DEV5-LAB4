const express = require("express");
const app = express();
const port = 3000;

//cors toestaan
const cors = require("cors");
app.use(cors());

app.get("/api/v1/messages", (req, res) => {
  res.json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages: [
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
      ],
    },
  });
});

app.get("/api/v1/messages/911", (req, res) => {
  res.json({
    status: "success",
    message: "GETTING message with ID 911",
    data: {
      message: [
        {
          user: "Joris Hens",
          message: "Hallo daar!",
        },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
