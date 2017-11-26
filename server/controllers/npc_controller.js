const _ = require ('lodash');
const User = require('../models/user');

exports.addNpc = function(req, res, next) {
  // declare req variables
  const { id, name, image, description, bio } = req.body


  User.findById({ '_id': req.user.id }).exec((err, user) => {
    // find campaign to add npc to
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == id;
    });

    // define npc model
    const npcToAdd = {
      name,
      image,
      description,
      bio
    }

    // add npc to campaign model
    campaign.NPCs.push(npcToAdd);
    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaign);
    })
  });
}

exports.updateNpc = function(req, res, next) {
  const { values, id, campaignId } = req.body;
  User.findById({'_id': req.user.id}).exec((err, user) => {

    // find campaign npc is in
    const campaign = _.find(user.campaigns.DM, function(campaign) {
      return campaign._id == campaignId;
    });
    // find the npc to update
    const npc = _.find(campaign.NPCs, function(npc){
      return npc._id == id;
    });

    // redefine npc model values
    if (values.description) { npc.description = values.description; }
    if (values.image) {npc.image = values.image; }
    if (values.bio) {npc.bio = values.bio ;}

    user.save(function(err) {
      if (err) { return next(err); } 
      res.json(campaign);
    });
  });
}

exports.addNpcNote = function(req, res, next) {
  const { note, id, type, campaignId } = req.body;
  if (type === 'dm') {
    User.findById({'_id': req.user.id}).exec((err, user) => {

      const campaign = _.find(user.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      const npc =_.find(campaign.NPCs, function(npc){
        return npc._id == id;
      });

      let noteToAdd = { note }
      npc.notes.push(noteToAdd);

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

      const npc =_.find(campaign.NPCs, function(npc){
        return npc._id == id;
      });

      let noteToAdd = { note }
      npc.notes.push(noteToAdd);

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  }
}

exports.shareNpc = function(req, res, next) {
  const { playerId, campaignId, npcToShare } = req.body;
  User.findById({'_id': playerId}).exec((err, user) => {
      // find campaign npc is in
      const playerCampaign = _.find(user.campaigns.PC, function(campaignToFind) {
        return campaignToFind.campaignId = campaignId;
      });

      if (!playerCampaign) {
        return res.status(422).send({ 'error': user.name + ' is no longer part of the campaign' });
      }

      // define npc model
      const npcDataToShare = {
        name: npcToShare.name,
        description: npcToShare.description,
        bio: npcToShare.bio,
        image: npcToShare.image
      }

      // // if npc exist in player campaign model, find it
      const npcs = _.map(playerCampaign.NPCs, 'name');

      //if npc does not exist push npc into player campaign model
      if (npcs.indexOf(npcToShare.name) < 0) {
        playerCampaign.NPCs.push(npcDataToShare);
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${npcToShare.name} has been shared with ${user.name}`});
        });
      } else {
        // if npc does exist update npc
        const index = npcs.indexOf(npcToShare.name);
        var oldNpc = playerCampaign.NPCs[index];
        oldNpc.name = npcToShare.name;
        oldNpc.description = npcToShare.description;
        oldNpc.image = npcToShare.image;
        oldNpc.bio = npcToShare.bio;
        user.save(function(err) {
          if (err) { return next(err); }
          res.json({'success': `${npcToShare.name} has been update for ${user.name}`});
        });
      }
  });
}

exports.fetchNpc = function(req, res, next) {
  User.findById({'_id': req.user.id}).exec((err, user) => {
    const campaign = _.find(user.campaigns.DM, function(campaignToFind) {
      return campaignToFind.campaignId = req.headers.id;
    })
    const npc = _.find(campaign.NPCs, function(npc){
      return npc.name == req.headers.npc;
    });
    res.json(npc);
  })
}