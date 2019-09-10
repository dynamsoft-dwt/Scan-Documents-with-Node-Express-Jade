var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Dynamic Web TWAIN with Express and Jade' });
});

module.exports = router;
