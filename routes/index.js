const express = require('express')
const router = express.Router()

const db = require('./../helpers/Database')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.createTables()
  res.render('index', { title: 'Express' })
});

module.exports = router;
