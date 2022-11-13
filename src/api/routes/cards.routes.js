module.exports = app => {
    const cards = require("../controllers/cards.controller");

    var router = require("express").Router();

    // Create a new Cards
    router.post("/card", cards.create);

    app.use('/', router);
};