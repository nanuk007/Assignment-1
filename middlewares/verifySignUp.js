const User = require("../models/User");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  console.log(req.query);
  User.findOne({
    username: req.query.username
  }).exec( async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      const id = await user;
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.query.email
    }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        const id = await user;
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};



const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;