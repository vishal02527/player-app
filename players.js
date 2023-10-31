const express = require("express");
const router = express.Router();
const Player = require("./db");

router.get("/", async (req, res) => {
  const firstPlayer = await Player.findOne().sort({ _id: 1 });

  if (!firstPlayer) {
    return res.send("No players found.");
  }
  res.send(`
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <a href="/players/${firstPlayer._id}">Go to Players</a>
      </div>
    </body>
  </html>`);
});

router.get("/players/:id", async (req, res) => {
  const playerId = req.params.id;
  const player = await Player.findById(playerId);

  if (!player) {
    return res.send("Player not found");
  }

  const nextPlayer = await Player.findOne({ _id: { $gt: playerId } }).sort({
    _id: 1,
  });

  const previousPlayer = await Player.findOne({ _id: { $lt: playerId } }).sort({
    _id: -1,
  });

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>${player.name}</h1>
          <p>Age: <span>${player.age}</span></p>
          <p>Price: <span>${player.price}</span></p>
          <p>Playing Status: <span>${player.playingStatus}</span></p>
          <img src="${player.imageUrl}" alt="${player.name}" class="playerImg" />
          <div class="btnDiv">
            ${
              previousPlayer
                ? `<a href="/players/${previousPlayer._id}"><button class="previous-button">Previous</button></a>`
                : ""
            }
            ${
              nextPlayer
                ? `<a href="/players/${nextPlayer._id}"><button class="next-button">Next</button></a>`
                : ""
            }
          </div>
        </div>
      </body>
    </html>
  `);
});

module.exports = router;
