const dbMongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const mongoose = dbMongoose.mongoose;


const UserSchema = new mongoose.Schema({
    user_id:{ //email
        type: String,
        required: true,
        unique: true,
    },
    user_secret_key: {//password
        type: String,
        required: true,
        select: false
    },
    user_role: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
})

UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.user_secret_key, 10);
    this.user_secret_key = hash;
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User