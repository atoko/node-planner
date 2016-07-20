var express = require('express');
var router = express.Router();
/*testDay = {
  tasks: [
        {taskId: 4, name:'alice tea shop', coordinates:"86,44", visited:null},
        {taskId: 2, name:'3d printing', image:"bar.jpg", visited:null}
  ]
}*/

const GetIp = function(req)
{
  return req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
}

router.get('/:lat/:long', function(req, res, next) {
  const radius = 5;
  const ip = GetIp(req);

  global.db.core.geolocate(req.params.lat / 100000, req.params.long / 100000, radius, ip,
   function(err, rows)
  {
    if (err == null && rows[0] != null)
    {
      res.json(rows.slice(0, 200));
    }
    else
    {
      res.json({});
    }

    res.end();
  });
});

router.post('/vote/:portal_id/:type_id', function(req, res, next) {
  var ip = GetIp(req);
  var session = req.session.id;
  var user_id = req.session.user_id || null;

  const id = (req.body.portal.vote) ? req.body.portal.vote.id : null;
  var vote = {
      id: id,
      portal_id: req.params.portal_id,
      type_id: req.params.type_id,
      ip: ip,
      session: session,
      user_id: user_id
  };

  if (vote.id == null)
  {
    delete vote.id;
  }

  global.db.core.portal_votes.save(vote, HandleUpsert(res));
});

var HandleUpsert = function(res)
{
  return (err, row) => 
  {
    if (err == null && row != null)
    {
      res.json(row);
    }
    else
    {
      res.json({error: err});      
    }
    res.end();      
  }
}
module.exports = router;