const _ = require ('lodash');
const User = require('../models/user');

exports.addPlayer = function(req, res, next) {
  // declare variables
  const { email, campaignId, name } = req.body;
  const DM = req.user;

  // Is DM trying to add himself?
  if (email === DM.email) {
    return res.status(422).send({ error: 'Can not add yourself as a player' });
  };

  // Add player to campaign
  User.findOne({ 'email': email }).exec((err, playerToFind) => {
    if (err) { return next(err); };
    if (!playerToFind) { return res.status(404).send({ 'error': 'Player not found' }); }

    const playerInfoToAdd = {
      name: playerToFind.name,
      email: playerToFind.email,
      playerId: playerToFind._id
    }
    if (name) { playerInfoToAdd.characterName = name; }
    if (playerToFind.phone) { playerInfoToAdd.phone = playerToFind.phone; }

    // Find DM model, find the campaign, add found player to campaign 
    User.findById({ '_id': req.user.id }).select('-email').exec((err, DM) => {
      if (err) { return next(err); }

      // find campaign
      const campaign = _.find(DM.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      // check it player is already in campaign
      for (var i = 0; i < campaign.players.length; i++) {
        if (campaign.players[i].email == email) {
          return res.status(422).send({ 'error': 'User is already in the Campaign'});
        }
      }

      // Add player to campaign roster
      campaign.players.push(playerInfoToAdd);
      // build roster to later add to recently added player
      const roster = campaign.players
      // build list of playerIds to search through
      const ids = _.map(campaign.players, 'playerId');

      // build campaign data to share with roster of players
      const campaignInfo = {
        campaignName: campaign.campaignName,
        players: roster,
        owner: false
      }
      
      // Before saving DM model
      // Add campaign roster to players data
      ids.forEach(function(id) {
        User.findById({ '_id': id }).exec((err, player) => {
          if (err) { return next(err); }
          
          const userCampaigns = player.campaigns.PC;
          const campaignsUserIsIn = _.map(userCampaigns, 'campaignName');
          // check if user is already in the campaign
          // if not push data into user database
          if (campaignsUserIsIn.indexOf(campaign.campaignName) < 0) {
            userCampaigns.push(campaignInfo);
            player.save(function(err) {
              if (err) { return next(err); }
            });
          // if user is already in campaign
          // find old campaign record an replace it
          } else {
            const index = campaignsUserIsIn.indexOf(campaign.campaignName);
            userCampaigns[index].players = roster;
            player.save(function (err) {
              if (err) { return next(err); }
            });
          }
        });
      });

      // Save DM Model
      DM.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  });
}

exports.updatePlayer = function(req, res, next) {
  const { values, id, type, campaignId } = req.body;

  if (type === 'dm') {
    User.findById({_id: req.user.id}).exec((err, user) => {
      const campaign = _.find(user.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      const player =_.find(campaign.players, function(player){
        return player._id == id;
      });

      if (values.phone) { player.phone = values.phone; }
      if (values.description) { player.description = values.description; }
      if (values.image) {player.image = values.image; }
      
      user.save(function(err) {
        if (err) { return next(err);}
        res.json(campaign);
      });
    });
  } else {
    User.findById({'_id': req.user.id}).exec((err, user) => {
      const campaign = _.find(user.campaigns.PC, function(campaign) {
        return campaign._id == campaignId;
      });

      const player =_.find(campaign.players, function(player){
        return player._id == id;
      });

      if (values.phone) { player.phone = values.phone; }
      if (values.description) { player.description = values.description; }
      if (values.image) {player.image = values.image; }

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    })
  }
}

exports.addPlayerNote = function(req, res, next) {
  const { note, id, type, campaignId } = req.body;
  if (type === 'dm') {
    User.findById({'_id': req.user.id}).exec((err, user) => {
      const campaign = _.find(user.campaigns.DM, function(campaign) {
        return campaign._id == campaignId;
      });

      const player =_.find(campaign.players, function(player){
        return player._id == id;
      });

      let noteToAdd = { note }
      player.notes.push(noteToAdd);

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

      const player =_.find(campaign.players, function(player){
        return player._id == id;
      });

      let noteToAdd = { note }
      player.notes.push(noteToAdd);

      user.save(function(err) {
        if (err) { return next(err); }
        res.json(campaign);
      });
    });
  }
}