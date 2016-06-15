var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  global.db.api.task.GetById(req.params.id, function(err, agenda)
  {
    if (err == null && task[0] != null)
    {
      res.json(task[0]["task"]);
    }
    else
    {
      res.json({});
    }

    res.end();
  });
});

router.post('/new/:category_id', function(req, res, next) {
  const name = req.body.name;

  if (name == null || req.params.category_id == null)
  {
    res.json({error: "Name or category id null"});
    return;
  }
  
  //replace with .save function
  global.db.api.task.AddToCategory(req.params.category_id, name,
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

router.post('/:id', function(req, res, next) {
  const name = req.body.name;
  const id = parseInt(req.params.id);
  if (name == null || isNaN(id))
  {
    res.json({error:"name is null or id is invalid"});
    return;
  }

  //Replace existence check with validation check
  global.db.core.AgendaCategoryTasks.findOne(id, function(error, response) {
	  if (error == null && response != undefined)
	  {
		  //Update logic
		  global.db.core.AgendaCategoryTasks.save({id: id, task: name}, function(err, task){
			  if (error == null)
			  res.json(task);
		  });
	  }
	  else
	  {
		  res.json({});
	  }
  });
});

module.exports = router;
