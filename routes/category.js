var express = require('express');
var router = express.Router();
/*testDay = {
  tasks: [
        {taskId: 4, name:'alice tea shop', coordinates:"86,44", visited:null},
        {taskId: 2, name:'3d printing', image:"bar.jpg", visited:null}
  ]
}*/

router.get('/:id', function(req, res, next) {
  global.db.api.category.GetById(req.params.id, function(err, agenda)
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

router.post('/new/:agenda_id', function(req, res, next) {
  const name = req.body.name;

  if (name == null)
  {
    res.json({});
    return;
  }

  global.db.api.category.AddToAgenda(req.params.agenda_id, name,
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


module.exports = router;
