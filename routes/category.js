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
  const name = req.body.category;
  
  if (name == null || req.params.agenda_id == null)
  {
    res.json({error: "Name or agenda id null"});
    return;
  }
  const category = {
      agenda_id: req.params.agenda_id,
      category: name
  };

  global.db.core.AgendaCategories.save(category, function(err, category){
      if (err == null && category != null)
      {
        category.category_id = category.id;
        category.tasks = [];
        delete category.id;
        res.json(category);
      }
      else
      {
        res.json({});      
      }

    res.end();
  });
});

module.exports = router;
