const db = require("./db");

// constructor
const Cards = function (cards) {
  this.CardNo = cards.CardNo;
};

Cards.create = async (newCards, result) => {
  const sql = `INSERT INTO cards (CardNo) VALUES (?)`;
  db.run(sql, newCards.CardNo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    getCards();
    result(null, { status: true, message: "A new card has been craeted." });
  });
};

const initCardTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS cards (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    CardNo INTEGER,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP )`;

  db.run(sql, (err, res) => {
    if (err) {
      console.log("error: ", err.message);
      return;
    }

    getCards();
    console.log("created Cards Table");
  });
}

const getCards = () => {
  const sql = `SELECT * FROM cards`;
  db.all(sql, [], (err, cards) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Cards: ", cards);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE cards`;
  db.all(sql, [], (err, cards) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Cards: ", cards);
  });
}

initCardTable();

module.exports = Cards;