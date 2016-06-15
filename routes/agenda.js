var express = require('express');
var router = express.Router();
/*testDay = {
  tasks: [
        {taskId: 4, name:'alice tea shop', coordinates:"86,44", visited:null},
        {taskId: 2, name:'3d printing', image:"bar.jpg", visited:null}
  ]
}*/

router.get('/:id', function(req, res, next) {
  global.db.api.agenda.GetById(req.params.id, function(err, agenda)
  {
    if (err == null && agenda[0] != null)
    {
      res.json(agenda[0]["agenda"]);
    }
    else
    {
      res.json({});
    }

    res.end();
  });
});

module.exports = router;