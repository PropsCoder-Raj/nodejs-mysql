module.exports = app => {
    const items = require("../controllers/items.controller");

    var router = require("express").Router();

    // Create a new Items
    router.post("/item", items.create);
    
    // Get items by CardNo
    router.get("/card/:card_number", items.findByCardNo);
    
    // Get items by Date
    router.get("/day/:date", items.findByDate);

    // Get items by Date
    router.get("/month/:month_number/:year_number", items.findByMonthYear);
    
    // Get items by CardNo
    router.delete("/card/:card_number", items.deleteByCardNo);

    app.use('/', router);
};
