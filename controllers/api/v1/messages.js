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

const getAll = (req, res) => {
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
};

const del = (req, res) => {
  const messageId = req.params.id;

  res.json({
    message: `DELETING a message with ID ${messageId}`,
  });
};

const put = (req, res) => {
  const messageId = req.params.id;

  res.json({
    message: `UPDATING a message with ID ${messageId}`,
  });
};

const post = (req, res) => {
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
};

const getById = (req, res) => {
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
};

module.exports.getAll = getAll;
module.exports.del = del;
module.exports.put = put;
module.exports.post = post;
module.exports.getById = getById;
