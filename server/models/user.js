const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define user model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  name: String,
  phone: String,
  campaigns: {
    DM: [{
    campaignName: String,
    owner: Boolean,
    players: [{
      name: String,
      email: String,
      phone: String,
      characterName: String,
      playerId: String,
      image: String,
      description: String,
      notes: [{
        note: String
      }]
    }],
    NPCs: [{
      name: String,
      image: String,
      bio: String,
      description: String,
      notes: [{
        note: String
      }]
    }],
    locations: [{
      name: String,
      image: String,
      history: String,
      description: String,
      notes: [{
        note: String
      }]
    }],
    lore: [{
      title: String,
      backstory: String,
      image: String,
      notes: [{
        note: String
      }]
    }]
  }],
    PC: [{
      owner: Boolean,
      campaignName: String,
      players: [{
        name: String,
        email: String,
        phone: String,
        characterName: String,
        playerId: String,
        image: String,
        description: String,
        notes:[{
          note:String
        }]
      }],
      NPCs: [{
        name: String,
        image: String,
        bio: String,
        description: String,
        notes:[{
          note:String
        }]
      }],
      locations: [{
        name: String,
        image: String,
        history: String,
        description: String,
        notes:[{
          note:String
        }]
      }],
      lore: [{
        title: String,
        backstory: String,
        image: String,
        notes:[{
          note:String
        }]
      }]
    }]
  }
});



// Encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    
    callback(null, isMatch);
  });
}

// Create the model
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;