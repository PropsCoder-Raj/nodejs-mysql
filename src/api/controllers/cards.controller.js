const Cards = require("../models/cards.model");

// Create and Save a new Card
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!"
    });
  }

  // Create a Cards
  const cards = new Cards({
    CardNo: req.body.CardNo,
  });

  // Save Cards in the database
  Cards.create(cards, (err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the Cards."
      });
    else res.send(data);
  });
};