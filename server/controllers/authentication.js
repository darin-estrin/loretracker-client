const jwt = require('jwt-simple');
const validator = require('email-validator');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}

exports.getUser = function(req, res, next) {
  User.findById({"_id": req.user.id}, function(err, user) {
    return res.json(user);
  });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  if (!validator.validate(email)){
    return res.status(422).send({ error: 'Please enter a valid email' });
  }

  if(!email || !password || !name) {
    return res.status(422).send({ error: 'You must provide name, email and password' });
  }

  // Check for existing user
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // Return error if user exist
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If user does not exist, create new user
    const user = new User({
      name: name,
      email: email,
      password: password,
      phone: phone
    });

    user.save(function(err) {
      if (err) { return next(err); }

      res.json({ token: tokenForUser(user) });
    });

  });
}

exports.updateProfile = function(req, res, next) {
  const { name, phone, email } = req.body;

  User.findOne({'email': email}, function(err, existingUser) {
    if (existingUser) { 
      return res.status(422).send({ error: "Email is in use" });
    }
    
    User.findById({'_id': req.user.id}).exec((err, user) => {
    
    if (email) { user.email = email; }
    if (name) { user.name = name; }
    if (phone) { user.phone = phone; }
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({success: 'profile successfully updated'});
    });
  });

  })
}

exports.changePassword = function(req, res, next) {
  User.findById({'_id': req.user.id}).select('+password').exec((err, user) => {
    user.password = req.body.password;
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });
 });
}