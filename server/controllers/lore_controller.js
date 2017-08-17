const _ = require ('lodash');
const User = require('../models/user');

exports.addLore = function(req, res, next) {
 // declare req variables
  const { id, title, backstory, image } = req.body


  User.findById({ '_id': req.user.id }).exec((err, user) => {
    // find campaign to add lore item to
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == id;
    });

    // define lore model
    const loreItemToAdd = {
      title,
      backstory,
      image
    }

    // add lore item to campaign model
    campaign.lore.push(loreItemToAdd);
    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaign);
    });
  });
}

exports.updateLore = function(req, res, next) {
const { values, id, campaignId } = req.body;
  User.findById({'_id': req.user.id}).exec((err, user) => {

    // find campaign lore item is in
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == campaignId;
    });
    // find the lore item to update
    const loreItem = _.find(campaign.lore, function(lore){
      return lore._id == id;
    });

    // redefine lore model values
    if (values.backstory) { loreItem.backstory = values.backstory; }
    if (values.image) {loreItem.image = values.image; }

    user.save(function(err) {
      if (err) { return next(err); } 
      res.json(campaign);
    });
  });
}

exports.addLoreNote = function(req, res, next) {
const { note, id, type, campaignId } = req.body;
  if (type === 'dm') {
    User.findById({'_id': req.user.id}).exec((err, user) => {

      const campaign = _.find(user.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      const loreItem =_.find(campaign.lore, function(lore){
        return lore._id == id;
      });

      let noteToAdd = { note }
      loreItem.notes.push(noteToAdd);

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

      const loreItem =_.find(campaign.lore, function(lore){
        return lore._id == id;
      });

      let noteToAdd = { note }
      loreItem.notes.push(noteToAdd);

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  }
}

exports.shareLore = function(req, res, next) {
const { playerId, campaignId, loreItemToShare } = req.body;
  User.findById({'_id': playerId}).exec((err, user) => {
      // find campaign lore item is in
      const playerCampaign = _.find(user.campaigns.PC, function(campaignToFind) {
        return campaignToFind.campaignId = campaignId;
      });

      if (!playerCampaign) {
        return res.status(422).send({ 'error': user.name + ' is no longer part of the campaign'});
      }

      // define lore item model
      const loreDataToShare = {
        title: loreItemToShare.title,
        backstory: loreItemToShare.backstory,
        image: loreItemToShare.image
      }

      // if lore item exist in player campaign model, find it
      const loreItems = _.map(playerCampaign.lore, 'title');

      //if lore item does not exist push location into player campaign model
      if (loreItems.indexOf(loreItemToShare.title) < 0) {
        playerCampaign.lore.push(loreDataToShare);
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${loreItemToShare.title} has been shared with ${user.name}`});
        });
      } else {
        // if lore item does exist update location
        const index = loreItems.indexOf(loreItemToShare.title);
        var oldLoreItem = playerCampaign.lore[index];
        oldLoreItem.title = loreItemToShare.title;
        oldLoreItem.backstory = loreItemToShare.backstory;
        oldLoreItem.image = loreItemToShare.image;
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${loreItemToShare.title} has been update for ${user.name}`});
        });
      }
  });
}