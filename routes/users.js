var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');



router.post('/authenticate', (req, res) => {
  console.log(req.body.user);
  if(req.body.user === "asfo" && req.body.pass === "holamundo") {
    const payload = {
      check:  true
    };
    const token = jwt.sign(payload, config.key , {
      expiresIn: 1440
    });
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
});

module.exports = router;
