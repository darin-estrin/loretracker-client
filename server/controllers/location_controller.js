const _ = require ('lodash');
const User = require('../models/user');

exports.addLocation = function(req, res, next) {
  // declare req variables
  const { id, name, image, description, history } = req.body


  User.findById({ '_id': req.user.id }).exec((err, user) => {
    // find campaign to add location to
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == id;
    });

    // define location model
    const locationToAdd = {
      name,
      image,
      description,
      history
    }

    // add location to campaign model
    campaign.locations.push(locationToAdd);
    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaign);
    });
  });
}

exports.updateLocation = function(req, res, next) {
  const { values, id, campaignId } = req.body;
  User.findById({'_id': req.user.id}).exec((err, user) => {

    // find campaign location is in
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == campaignId;
    });
    // find the location to update
    const location = _.find(campaign.locations, function(location){
      return location._id == id;
    });

    // redefine location model values
    if (values.description) { location.description = values.description; }
    if (values.image) {location.image = values.image; }
    if (values.history) {location.history = values.history;}

    user.save(function(err) {
      if (err) { return next(err); } 
      res.json(campaign);
    });
  });
}

exports.addLocationNote = function(req, res, next) {
  const { note, id, type, campaignId } = req.body;
  if (type === 'dm') {
    User.findById({'_id': req.user.id}).exec((err, user) => {

      const campaign = _.find(user.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      const location =_.find(campaign.locations, function(location){
        return location._id == id;
      });

      let noteToAdd = { note }
      location.notes.push(noteToAdd);

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  } else {
    User.findById({'_id': req.user.id}).exec((err, user) => {
      const campaign = _.find(user.campaigns.PC, function(campaign) {
        return campaign._id == campaignId;
      });

      const location =_.find(campaign.locations, function(location){
        return location._id == id;
      });

      let noteToAdd = { note }
      location.notes.push(noteToAdd);

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  }
}

exports.shareLocation = function(req, res, next) {
  const { playerId, campaignId, locationToShare } = req.body;
  User.findById({'_id': playerId}).exec((err, user) => {
      // find campaign location is in
      const playerCampaign = _.find(user.campaigns.PC, function(campaignToFind) {
        return campaignToFind.campaignId = campaignId;
      });

      if (!playerCampaign) {
        return res.status(422).send({ 'error': user.name + ' is no longer part of the campaign'});
      }

      // define location model
      const locationDataToShare = {
        name: locationToShare.name,
        description: locationToShare.description,
        history: locationToShare.history,
        image: locationToShare.image
      }

      // if location exist in player campaign model, find it
      const locations = _.map(playerCampaign.locations, 'name');

      //if location does not exist push location into player campaign model
      if (locations.indexOf(locationToShare.name) < 0) {
        playerCampaign.locations.push(locationDataToShare);
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${locationToShare.name} has been shared with ${user.name}`});
        });
      } else {
        // if location does exist update location
        const index = locations.indexOf(locationToShare.name);
        var oldLocation = playerCampaign.locations[index];
        oldLocation.name = locationToShare.name;
        oldLocation.description = locationToShare.description;
        oldLocation.history = locationToShare.history;
        oldLocation.image = locationToShare.image;
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${locationToShare.name} has been update for ${user.name}`});
        });
      }
  });
}