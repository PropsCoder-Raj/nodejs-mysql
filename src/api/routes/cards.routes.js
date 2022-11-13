module.exports = app => {
    const cards = require("../controllers/cards.controller");

    var router = require("express").Router();

    // Create a new Cards
    router.post("/", cards.create);

    app.use('/api/cards', router);
};