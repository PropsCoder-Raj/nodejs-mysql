module.exports = app => {
    const items = require("../controllers/items.controller");

    var router = require("express").Router();

    // Create a new Items
    router.post("/", items.create);
    
    // Get items by CardNo
    router.get("/by-card-no/:cardNo", items.findByCardNo);

    // Get items by CardNo
    router.delete("/by-card-no/:cardNo", items.deleteByCardNo);

    app.use('/api/items', router);
};
