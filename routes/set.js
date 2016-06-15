var express = require('express');
var router = express.Router();

router.post('/category/new/:agenda_id', function(req, res, next) {
  global.db.api.category.AddToAgenda(req.params.agenda_id, 'meatgrinder',
    function(err, category)
    {
      if (err == null && category[0] != null)
      {
        res.json(category[0]["category"]);
      }
      else
      {
        res.json({});      
      }

    res.end();
    });
});


router.post('/task/new/:category_id', function(req, res, next) {
  global.db.api.task.AddToCategory(req.params.category_id, 'meatgrinder',
    function(err, task)
    {
      if (err == null && task[0] != null)
      {
        res.json(task[0]["category"]);
      }
      else
      {
        res.json({});      
      }

    res.end();
    });
});


module.exports = router;
