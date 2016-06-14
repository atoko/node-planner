var express = require('express');
var router = express.Router();


 /*testDay = {
  tasks: [
        {taskId: 4, name:'alice tea shop', coordinates:"86,44", visited:null},
        {taskId: 2, name:'3d printing', image:"bar.jpg", visited:null}
  ]
}*/

router.get('/plan/:id', function(req, res, next) {
  var  testData = global.testData;
  if (req.params.id == 1)
  {
    res.json(testData);
  }
  else
  {
    res.json({});
  }
  res.end();
});

router.get('/category/:id', function(req, res, next) {
  var testData = global.testData;
  if (testData.categories[req.params.id] != null)
  {
    res.json(testData.categories[req.params.id]);
  }
  else
  {
    res.json({});
  }
  res.end();
});

router.get('/task/:id', function(req, res, next) {
  var testData = global.testData;
  var output = {};
  for (var category in testData.categories) {
    if (testData.categories.hasOwnProperty(category)) {
      var element = testData.categories[category];
      for (var task in element.tasks) {
          if (task == req.params.id) {
            output = element.tasks[task];
          }
      }
    }
  }

  res.json(output);
  res.end();
});

module.exports = router;
