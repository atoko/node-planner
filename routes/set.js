var express = require('express');
var router = express.Router();

router.post('/category/new/:planId', function(req, res, next) {
  var testData = global.testData;
  var categoryName = req.body.name;
  if (req.params.planId == 1 && categoryName != null)
  {
    var count = Object.keys(testData.categories).length;
    testData.categories[count + 1] = {categoryId: count + 1, name: categoryName, tasks:{}};
    res.json(true);
  }
  else
  {
    res.json(false);
  }
  res.end();
});


router.post('/task/new/:categoryId', function(req, res, next) {
  var  testData = global.testData;
  var categoryName = "category_name";
  if (req.params.id == 1 && categoryName != null)
  {
    var count = Object.keys(testData.categories).length;
    testData.categories[count + 1] = {categoryId: count + 1, name: categoryName, tasks:{}};
    res.json(true);
  }
  else
  {
    res.json(false);
  }
  res.end();
});


module.exports = router;
