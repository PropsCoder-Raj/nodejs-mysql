const sqlite3 = require('sqlite3');

const connection = new sqlite3.Database(process.cwd()+"./database/test.db", sqlite3.OPEN_READWRITE, (err, res) => {
  if(err){
    return console.error(err.message);
  }
})

module.exports = connection;