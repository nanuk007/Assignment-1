const config = require("../config/auth.config");
const User = require("../models/User");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  
  
 
  const user = new User({
    username: req.query.username,
    email: req.query.email,
    password: bcrypt.hashSync(req.query.password, 8)
  });

  user.save( async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  
    return res.send({ message: "User was registered successfully!",user: await user });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: JSON.parse(req.query[0]).username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        JSON.parse(req.query[0]).password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.redirect('/dashboard');
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};