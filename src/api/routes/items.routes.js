module.exports = app => {
    const items = require("../controllers/items.controller");

    var router = require("express").Router();

    // Create a new Items
    router.post("/", items.create);
    
    // Get items by CardNo
    router.get("/:cardNo", items.findByCardNo);

    app.use('/api/items', router);
};