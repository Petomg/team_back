var express = require('express');
var router = express.Router();

let PublicationModel = require('../models/Publication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Index");
  PublicationModel.find(function(err, publications){
    if(err) {
        return console.error("Error in get db operation");
    } else {
        res.json(publications);
    } 
  });
});

/* ADD new publication */
router.post('/add', function(req, res, next){
  let title = req.body.title;
  let description = req.body.description;

  let newPublication = new PublicationModel({title, description});

  newPublication.save(function(err, pub){
      if (err) {
        return console.error("Error while adding project");
      }
      res.send(`${title} saved successfuly`);
  });

});

module.exports = router;
