const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: { type: String, unique:true, required: true },
  password: { type: String  }
});

// Automatically handles hashing and salting of passwords
// and adds the following properties to the user object:
//   - password
//   - salt
//   - hash
UserModel.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserModel);

