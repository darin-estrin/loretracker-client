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
        campaignId: campaignId,
        players: roster,
        owner: false
      }
      
      // Before saving DM model
      // Add campaign roster to players data
      ids.forEach(function(id) {
        User.findById({ '_id': id }).exec((err, player) => {
          if (err) { return next(err); }
          
          const userCampaigns = player.campaigns.PC;
          const campaignsUserIsIn = _.map(userCampaigns, 'campaignId');
          // check if user is already in the campaign
          // if not push data into user database
          if (campaignsUserIsIn.indexOf(campaignInfo.campaignId) < 0) {
            userCampaigns.push(campaignInfo);
            player.save(function(err) {
              if (err) { return next(err); }
            });
          // if user is already in campaign
          // find old campaign record an replace it
          } else {
            const index = campaignsUserIsIn.indexOf(campaignInfo.campaignId);
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

exports.deletePlayer = function(req, res, next) {
  const { campaign, player } = req.body;
  
  // remove player from dm campaign roster
  User.findById({'_id': req.user.id}).exec((err, user) => {
    // find campaign to remove player
    const campaignToEdit = _.find(user.campaigns.DM, function(userCampaign) {
      return userCampaign._id == campaign._id;
    });
    
    for (var i = 0; i < campaignToEdit.players.length; i++) {
      
      if(campaignToEdit.players[i].playerId == player.playerId) {
        campaignToEdit.players.splice(i, 1);
      }
    }

    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaignToEdit);
    });

    // remove delete player from the rest of the players campaign roster
    campaignToEdit.players.forEach(function(playerCharacter) {
      User.findOne({ 'email': playerCharacter.email}).exec((err, user) => {

        const campaignToEdit = _.find(user.campaigns.PC, function(userCampaign) {
          return userCampaign.campaignId == campaign._id;
        });
        
        for (var i = 0; i < campaignToEdit.players.length; i++) {
          
          if(campaignToEdit.players[i].playerId == player.playerId) {
            campaignToEdit.players.splice(i, 1);
          }
        }
        
        user.save(function(err) {
          if (err) { return next(err); }
        });

      });
    })

    // remove campaign from deleted players campaign list
    User.findById({ '_id': player.playerId}).exec((err, user) => {
      campaigns = user.campaigns.PC;
      for (var i = 0; i < campaigns.length; i++) {
       
        if (campaigns[i].campaignId == campaign._id) {
          campaigns.splice(i, 1);
        }
      }

      user.save(function(err) {
        if (err) {return next(err); }
      });
    });
  });
}

exports.deleteCampaign = function(req, res, next) {
  User.findById({ '_id': req.user.id }).exec((err, user) => {
    
    const campaigns = user.campaigns.DM;
    
    for (var i = 0; i < campaigns.length; i++) {
      if (campaigns[i]._id == req.body._id) {
        campaigns.splice(i, 1);
      }
    }

    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaigns);
    });
  });
}

exports.leaveCampaign = function(req, res, next) {
  
  User.findById({ '_id': req.user.id}).exec((err, user) => {
    
    const campaigns = user.campaigns.PC;
    
    for (var i = 0; i < campaigns.length; i++) {
      if (campaigns[i].campaignId && campaigns[i].campaignId == req.body.campaignId) {
        campaigns.splice(i, 1);
      } else if (!campaigns[i].campaignName && campaigns[i].campaignName == req.body.campaignName) {
        campaigns.splice(i, 1);
      }
    }

    user.save(function(err) {
      if (err) { return next(err); }
      res.json(campaigns);
    });

  });
}