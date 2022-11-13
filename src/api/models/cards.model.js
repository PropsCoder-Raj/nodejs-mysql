const sql = require("./db");

// constructor
const Cards = function(cards) {
    this.CardNo = cards.CardNo;
};

Cards.create = (newCards, result) => {
    console.log("newCards: ", newCards);
    sql.query("INSERT INTO cards SET ?", newCards, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created cards: ", { Id: res.insertId, ...newCards });
      result(null, { Id: res.insertId, ...newCards });
    });
};

const initCardTable = () => {
    sql.query("CREATE TABLE `cards` (`Id` INT NOT NULL AUTO_INCREMENT , `CardNo` INT(100) NOT NULL , `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `UpdatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`Id`))", (err, res) => {
        if (err) {
          console.log("error: ", err.sqlMessage);
          return;
        }
    
        console.log("created Cards Table");
    });
}

initCardTable();

module.exports = Cards;