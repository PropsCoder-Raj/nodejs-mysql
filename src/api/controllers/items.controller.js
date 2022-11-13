const Items = require("../models/items.model");

const getAllDaysInMonth = (year, month) => {
  const date = new Date(`${year}-${Number(month)}-01`);
  const dates = [];
  while ((date.getMonth() + 1) === Number(month)) {
    dates.push(new Date(date));
    console.log("dates: ", dates);
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

// Create and Save a new Items
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: false,
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
        status: false,
        message:
          err.message || "Some error occurred while creating the Items."
      });
    else res.send(data);
  });
};

// Find all items by CardNo
exports.findByCardNo = (req, res) => {
  Items.findByCardNo(req.params.card_number, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Items with CardNo ${req.params.card_number}.`
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving Items with CardNo " + req.params.card_number
        });
      }
    } else res.send(data);
  });
};

// Find all items by Date
exports.findByDate = (req, res) => {
  var date1 = req.params.date.split(".").reverse().join("-");
  var tomorrow = new Date(date1);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  var date2 = [tomorrow.getFullYear(), tomorrow.getMonth()+1, tomorrow.getDate()].join('-');

  Items.findByDate(req.params.date + " date", date1, date2, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Items with Date ${req.params.date}.`
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving Items with Date " + req.params.date
        });
      }
    } else res.send(data);
  });
};


// Find all items by month, year
exports.findByMonthYear = async(req, res) => {
  var array = await getAllDaysInMonth(req.params.year_number, req.params.month_number);
  var params = req.params.month_number + " month and " + req.params.year_number + " year";
  var date1 = [array[0].getFullYear(), array[0].getMonth()+1, array[0].getDate()].join('-');
  var date2 = [array[array.length - 1].getFullYear(), array[array.length - 1].getMonth()+1, array[array.length - 1].getDate()].join('-');
  Items.findByDate(params, date1, date2, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Items with ${params}.`
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving Items with " + params
        });
      }
    } else res.send(data);
  });
};

// Delete a items with the cardNo in the request
exports.deleteByCardNo = (req, res) => {
  Items.removeByCardNo(req.params.card_number, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Items with Card No ${req.params.card_number}.`
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Could not delete Items with Card No " + req.params.card_number
        });
      }
    } else res.send(data);
  });
};