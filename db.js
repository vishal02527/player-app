const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vishal:AA3gY1ymj0IZiLBd@cluster0.mcm7hby.mongodb.net/player_app_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});

const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  price: String,
  playingStatus: String,
  imageUrl: String,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
