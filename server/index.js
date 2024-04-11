// ENV
require("dotenv").config();

// BUILT-IN DEPENDENCIES
const { createServer } = require("http");

// NPM DEPENDENCIES
const WebSocket = require("ws");
const express = require("express");
const helmet = require("helmet");

// OWN DEPENDENCIES
const validateKey = require("./middleware/validateKey");
const handleWs = require("./ws/handleWs");
const measurementsData = require("./data/measurementsData");

// DATA
let currentProfile = Object.keys(measurementsData)[0];
const liveData = JSON.parse(JSON.stringify(measurementsData[currentProfile]));
for (let parameter in liveData) {
  liveData[parameter].values.length = 10;
}

// SETTING-UP APP
const app = express();
app.use(express.json());
app.use(helmet());
const server = createServer(app);
const wss = new WebSocket.Server({ server: server });

// WS
handleWs(wss);

// API
app.get("/data", validateKey, async (req, res) => {
  // GET INITIAL DATA
  try {
    const data = liveData;
    res.json({ message: "OK", data: { profile: currentProfile, data } });
  } catch (e) {
    res.status(500).json({ message: "Internal error." });
  }
});

app.get("/profiles", validateKey, async (req, res) => {
  // GET PROFILE NAMES
  try {
    const data = Object.keys(measurementsData);
    res.json({ message: "OK", data: { data } });
  } catch (e) {
    res.status(500).json({ message: "Internal error." });
  }
});

app.post("/profile", validateKey, async (req, res) => {
  // CHANGE CURRENT PROFILE
  try {
    const profile = req.body.profile;
    if (profile in measurementsData) {
      currentProfile = profile;
      res.json({ message: "OK", data: { profile: currentProfile } });
    } else {
      res.status(400).json({ message: "Unknown profile." });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal error." });
  }
});

app.use("*", (req, res) => res.status(404).send("Not found."));

server.listen(process.env.P0RT, () => {
  console.log(`Server listening on port: ${process.env.P0RT}`);
});

//-------------------------------------------------------------------------------------------------

// SIMULATE LIVE DATA
let currentIndex = 10;

setInterval(() => {
  if (currentIndex > 59) {
    currentIndex = 0;
  }

  for (let parameter in liveData) {
    liveData[parameter].values.shift();
    liveData[parameter].values.push(
      measurementsData[currentProfile][parameter].values[currentIndex]
    );
  }

  currentIndex++;

  try {
    const data = JSON.stringify({ profile: currentProfile, data: liveData });
    for (let socket of wss.clients) {
      try {
        socket.send(data);
      } catch (e) {}
    }
  } catch (e) {}
}, 1000);
