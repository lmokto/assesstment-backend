var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* GET home page. */
router.get('/:name', function(req, res, next) {
  res.send(req.params)
});

router.get('/:number(\d+)', function(req, res, next) {
  res.send(req.params)
});


module.exports = router;
