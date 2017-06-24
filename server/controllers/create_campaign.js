const User = require('../models/user');
const validator = require('email-validator');
const _ = require('lodash');

exports.user = function(req, res, next) {
  User.findById({
    '_id': req.user.id
  }).select('-email').exec((err, user) => {
    if (err) { return next(err) }

    res.json(user);
  });
}

exports.startCampaign = function(req, res, next) {
  // Set campaign Variables
  const { name } = req.body;

  User.findById({'_id': req.user.id}).exec((err, user) => {
    if (err) {return next(err); }

    if (!user) {
      res.status(404).send('user not found');
    }

    const campaign = {
      campaignName: name,
      owner: true
    };

    user.campaigns.DM.push(campaign);

    user.save(function(err){
      if (err) { return next(err); }
      res.json(user);
    });

  });  
};



exports.getCampaignData = function(req, res, next) {
  if (req.headers.type === 'dm') {
    User.findById({ '_id': req.user.id }).exec((err, user) => {
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == req.headers.id;
    });

    if (!campaign) { return res.status(404).send(); }
    return res.json(campaign);
    });

  } else {
    User.findById({ '_id': req.user.id }).exec((err, user) => {
    const campaign = _.find(user.campaigns.PC, function(campaign) {
      return campaign._id == req.headers.id;
    });

    if (!campaign) { return res.status(404).send(); }
    return res.json(campaign);
    });
  }
  
}