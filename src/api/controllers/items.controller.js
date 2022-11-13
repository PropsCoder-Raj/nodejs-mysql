const Items = require("../models/items.model");

// Create and Save a new Items
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Items
  const items = new Items({
    Name: req.body.Name,
    Description: req.body.Description,
    Category: req.body.Category,
    Price: req.body.Price,
    CardNo: req.body.CardNo,
  });

  // Save Items in the database
  Items.create(items, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    else res.send(data);
  });
};

// Find all items by CardNo
exports.findByCardNo = (req, res) => {
  Items.findByCardNo(req.params.cardNo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Items with CardNo ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Items with CardNo " + req.params.id
        });
      }
    } else res.send(data);
  });
};