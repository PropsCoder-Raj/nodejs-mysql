const sql = require("./db");


// constructor
const Items = function(item) {
    this.Name = item.Name;
    this.Description = item.Description;
    this.Category = item.Category;
    this.Price = item.Price;
    this.CardNo = item.CardNo;
};

Items.create = (newItems, result) => {
    console.log("newItems: ", newItems);
    sql.query("INSERT INTO items SET ?", newItems, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created cards: ", { Id: res.insertId, ...newItems });
      result(null, { Id: res.insertId, ...newItems });
    });
};

Items.findByCardNo = (cardNo, result) => {
  sql.query(`SELECT items.CardNo, items.Name, items.Description, items.Category, items.Price, cards.CardNo FROM items, cards WHERE cards.CardNo = ${cardNo} AND items.CardNo = cards.Id`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found items: ", res);
      result(null, res);
      return;
    }

    // not found Items with the cardNo
    result({ kind: "not_found" }, null);
  });
};


Items.removeByCardNo = (cardNo, result) => {
  sql.query(`DELETE FROM items WHERE EXISTS (SELECT * FROM cards AS T1 WHERE T1.CardNo = ${cardNo} AND T1.Id = Items.CardNo);`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows > 0) {
      console.log("deleted tutorial with id: ", cardNo);
      result(null, res);
      return;
    }
    
    // not found Items with the cardNo
    result({ kind: "not_found" }, null);
  });
};

const initItemTable = () => {
    sql.query("CREATE TABLE `items` (`Id` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(200) NOT NULL , `Description` VARCHAR(400) NOT NULL , `Category` VARCHAR(200) NOT NULL , `Price` INT(100) NOT NULL, CardNo INT(100) NOT NULL,  `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`),  FOREIGN KEY (CardNo) REFERENCES Cards(Id))", (err, res) => {
        if (err) {
          console.log("error: ", err.sqlMessage);
          return;
        }
    
        console.log("created Items Table");
    });
}

initItemTable();

module.exports = Items;