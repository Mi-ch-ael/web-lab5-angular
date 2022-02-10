const express = require("express");

const path = require("path");
const fs = require("fs");
const router = express.Router();
const bodyParser = require("body-parser");
const assert = require("assert");

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// router.use(express.static(path.join(__dirname, "../public")));

const settings = require("./data/default/settings.json");
const brokers = require("./data/default/brokers.json");
const stocks = require("./data/default/stocks.json");
settings.timestamp = Date.now();
for(let broker of brokers) {
  if(broker.included === undefined) broker.included = true;
}
for(let stock of stocks) {
  if(stock.included === undefined) stock.included = true;
}

router.get("/test/",
  (req, res) => {
    res.end("Hello World!");
  });

router.get("/brokers/",
  (req, res) => {
    res.send(brokers);
    // res.end();
  });

router.post("/toggle-brokers/",
  (req, res) => {
    if(req.body.id < brokers.length) {
      brokers[req.body.id].included = !brokers[req.body.id].included;
      res.end("Accepted")
      return;
    }
    res.error();
  });

router.post("/edit-brokers/",
  (req, res) => {
    console.debug(req.body);
    if(req.body.id === null || req.body.id >= brokers.length) {
      brokers.push({
        firstName: req.body.firstName ? req.body.firstName : "[unknown]",
        lastName: req.body.lastName ? req.body.lastName : "[unknown]",
        country: req.body.country ? req.body.country : "--",
        money: isNaN(req.body.money) ? 0 : req.body.money,
        included: true
      });
      console.debug(brokers);
      res.end("Added");
      return;
    }
    const broker = brokers[req.body.id];
    broker.firstName = req.body.firstName ? req.body.firstName : "[unknown]";
    broker.lastName = req.body.lastName ? req.body.lastName : "[unknown]";
    if(req.body.country) broker.country = req.body.country;
    if(!isNaN(req.body.money)) broker.money = req.body.money;
    console.debug(brokers);
    res.end("Edited");
  });

router.post("/brokers/delete",
  (req, res) => {
    const id = req.body.id;
    if(id >= brokers.length) {
      res.error();
      return;
    }
    brokers.splice(id, 1);
    res.end("ok");
  });

router.get("/save/",
  (req, res) => {
    writeOut();
    res.end("saved");
  });

router.get("/stocks/",
  (req, res) => {
    res.send(stocks);
  });

router.post("/stocks/toggle/",
  (req, res) => {
    const stockCode = req.body.code;
    const stock = getStockByCode(stockCode);
    if(stock === null) {
      res.error();
      return;
    }
    stock.included = !(stock.included);
    res.end("ok");
  });

router.post("/stocks/edit",
  (req, res) => {
    const newStock = req.body;
    console.debug(newStock);
    const stock = getStockByCode(newStock.code);
    if(stock === null) {
      res.error();
      return;
    }
    const price = newStock.price;
    const distribution = newStock.distribution;
    stock.price = isNaN(price) ? stock.minPrice :
      (price > stock.maxPrice ? stock.maxPrice : (price < stock.minPrice ? stock.minPrice : price));
    stock.distribution = (distribution === "--") ? stock.distribution : distribution;
    res.end("Edited stock");
  });

router.get("/settings",
  (req, res) => {
    res.send(settings);
  });

router.post("/settings/edit",
  (req, res) => {
    const newSettings = req.body;
    console.debug(newSettings);
    settings.timestamp = Date.now() + newSettings.hours*(60*60*1000) + newSettings.minutes*(60*1000);
    if(newSettings.bargainTime) settings.bargainTimeMs = 1000*newSettings.bargainTime;
    if(newSettings.priceChangeTimeout) settings.changePriceTimeout = 1000*newSettings.priceChangeTimeout;
    res.end("ok");
  });

function writeOut() {
  const filenames = ["settings", "brokers", "stocks"];
  const data = [settings, brokers, stocks];
  assert(filenames.length === data.length, "Number of files does not match amount of instances");

  for(let i = 0; i < filenames.length; ++i) {
    fs.writeFile(path.join(__dirname, `data/${filenames[i]}.json`), JSON.stringify(data[i]),
      (err) => {
        if(err) console.error(err);
      });
  }
}

function getStockByCode(code) {
  for(let stock of stocks) {
    if(stock.code === code) return stock;
  }
  return null;
}

module.exports = router;
