const Authentication = require('./controllers/authentication');
const CampaignCreate = require('./controllers/create_campaign');
const Player = require('./controllers/player_controller');
const Lore = require('./controllers/lore_controller');
const Location = require('./controllers/location_controller');
const NPC = require('./controllers/npc_controller');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/api', requireAuth, Authentication.getUser);
  app.get('/api/campaigndata', requireAuth, CampaignCreate.getCampaignData);
  app.get('/api/user', requireAuth, CampaignCreate.user);
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.put('/api/startCampaign', requireAuth, CampaignCreate.startCampaign);
  app.put('/api/addPlayer', requireAuth, Player.addPlayer);
  app.put('/api/updateplayer', requireAuth, Player.updatePlayer);
  app.put('/api/addplayernote', requireAuth, Player.addPlayerNote);
  app.put('/api/deleteplayer', requireAuth, Player.deletePlayer);
  app.put(`/api/deletecampaign`, requireAuth, Player.deleteCampaign);
  app.put(`/api/leavecampaign`, requireAuth, Player.leaveCampaign);
  app.put('/api/addnpc', requireAuth, NPC.addNpc);
  app.put('/api/updatenpc', requireAuth, NPC.updateNpc);
  app.put('/api/addnpcnote', requireAuth, NPC.addNpcNote);
  app.put('/api/sharenpc', requireAuth, NPC.shareNpc);
  app.put('/api/addlocation', requireAuth, Location.addLocation);
  app.put('/api/updatelocation', requireAuth, Location.updateLocation);
  app.put('/api/addlocationnote', requireAuth, Location.addLocationNote);
  app.put('/api/sharelocation', requireAuth, Location.shareLocation);
  app.put('/api/addlore', requireAuth, Lore.addLore);
  app.put('/api/updatelore', requireAuth, Lore.updateLore);
  app.put('/api/addlorenote', requireAuth, Lore.addLoreNote);
  app.put('/api/sharelore', requireAuth, Lore.shareLore);
  app.put('/api/updateprofile', requireAuth, Authentication.updateProfile);
  app.put('/api/changepassword', requireAuth, Authentication.changePassword);
}