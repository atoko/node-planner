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


var HandleUpsert = function(res)
{
  return (err, row) => 
  {
    if (err == null && row != null)
    {
      row.task_id = row.id;
      delete row.id;
      res.json(row);
    }
    else
    {
      res.json({error: err});      
    }
    res.end();      
  }
}
router.post('/new/:category_id', function(req, res, next) {
  const name = req.body.task;
  
  if (name == null || req.params.category_id == null)
  {
    res.json({error: "Name or category id null"});
    return;
  }
  const task = {
      category_id: req.params.category_id,
      task: name
  };

  global.db.core.AgendaCategoryTasks.save(task, HandleUpsert(res));
});

router.post('/:id', function(req, res, next) {
  const task = req.body.task;
  const id = parseInt(req.params.id);
  if (task == null || isNaN(id))
  {
    res.json({error:"task is null or id is invalid"});
    return;
  }

  //Replace existence check with validation check
  global.db.core.AgendaCategoryTasks.findOne(id, function(error, response) {
	  if (error == null && response != undefined)
	  {
		  task.id = id;
      delete task.task_id;
		  global.db.core.AgendaCategoryTasks.save(task, HandleUpsert(res));
	  }
	  else
	  {
		  res.json({error});
	  }
  });
});

module.exports = router;
