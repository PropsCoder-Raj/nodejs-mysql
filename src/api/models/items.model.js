const db = require("./db");


// constructor
const Items = function(item) {
    this.Name = item.Name;
    this.Description = item.Description;
    this.Category = item.Category;
    this.Price = item.Price;
    this.CardNo = item.CardNo;
};

Items.create = (newItems, result) => {
    const sql = "INSERT INTO items (Name, Description, Category, Price, CardNo) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [newItems.Name, newItems.Description, newItems.Category, newItems.Price, newItems.CardNo], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      getItems();
      result(null, { status: true, message: "A new item has been craeted." });
    });
};

Items.findByCardNo = (cardNo, result) => {
  const sql = `SELECT items.CardNo, items.Name, items.Description, items.Category, items.Price, items.CreatedAt, items.UpdatedAt, cards.CardNo FROM items, cards WHERE cards.CardNo = ${cardNo} AND items.CardNo = cards.Id`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (items.length > 0) {
      console.log("found items: ", items);
      result(null, { status: true, message: "Get items with card no "+cardNo, data: items, count: items.length });
      return;
    }

    // not found Items with the cardNo
    result({ kind: "not_found" }, null);
  });
};

Items.findByDate = (params, date1, date2, result) => {
  const sql = `SELECT items.CardNo, items.Name, items.Description, items.Category, items.Price, items.CreatedAt, items.UpdatedAt, cards.CardNo FROM items, cards WHERE (items.CreatedAt > '${date1}' AND items.CreatedAt < '${date2}') AND items.CardNo = cards.Id`;
  console.log("sql: ", sql);
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("items: ", items);

    if (items.length > 0) {
      console.log("found items: ", items);
      result(null, { status: true, message: "Get items with "+params, data: items, count: items.length });
      return;
    }

    // not found Items with the cardNo
    result({ kind: "not_found" }, null);
  });
};

Items.removeByCardNo = (cardNo, result) => {
  const sql = `DELETE FROM items WHERE EXISTS (SELECT * FROM cards AS T1 WHERE T1.CardNo = (?) AND T1.Id = Items.CardNo);`;
  db.run(sql, cardNo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: err, message: err });
      return;
    }
    
    // not found Items with the cardNo
    result(null, { status: true, message: `Card No - ${cardNo}. Items was deleted successfully!` });
  });
};

const initItemTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS items (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Description TEXT,
    Category TEXT,
    Price INTEGER,
    CardNo INTEGER,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(CardNo) REFERENCES cards(Id) )`;

    db.run(sql, (err, res) => {
        if (err) {
          console.log("error: ", err.message);
          return;
        }
    
        getItems();
        console.log("created Items Table");
    });
}

const getItems = () => {
  const sql = `SELECT * FROM items`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Items: ", items);
  });
}

const dropTable = () => {
  const sql = `DROP TABLE items`;
  db.all(sql, [], (err, items) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    console.log("Items: ", items);
  });
}

initItemTable();

module.exports = Items;