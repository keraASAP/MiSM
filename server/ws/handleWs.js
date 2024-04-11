const users = require("../users/users");
const { generateHashedKey } = require("../utils/keys");

async function handleWs(wss) {
  wss.on("connection", (socket) => {
    let pongReceived = true;
    let isAuthenticated = false;
    let username = ``;

    socket.on("message", async (message) => {
      let apiKey;

      try {
        const stringifyMessage = message.toString();
        apiKey = generateHashedKey(stringifyMessage.replace("login ", ""));
      } catch (error) {
        apiKey = message;
      }

      if (!socket.isAuthenticated) {
        console.log(`Recieved HashedKey: ${apiKey}`);

        username = users.get(apiKey);
        isAuthenticated = !!username;
        if (!isAuthenticated) {
          socket.close();
          console.log(
            `Invalid API key. First message was: ${message.toString()}`
          );
        } else {
          console.log(`Client authenticated: ${username}`);
        }
        return;
      }
    });

    socket.on("pong", () => {
      pongReceived = true;
    });

    socket.on("close", () => {
      try {
        clearInterval(pingInterval);
        clearInterval(checkPongInterval);
        console.log(`Client disconnected: ${username}`);
      } catch (e) {}
    });

    // PING EVERY 5s
    const pingInterval = setInterval(() => {
      try {
        socket.ping();
      } catch (e) {}
    }, 5000);

    // CHECK FOR PONGS EVERY 8s
    const checkPongInterval = setInterval(() => {
      try {
        if (pongReceived) {
          pongReceived = false;
        } else {
          console.log(`No pong received. Closing connection for: ${username}`);
          socket.close();
        }
      } catch (e) {
        console.log(
          `No pong received. Closing connection for: ${username}\n${e}`
        );
        socket.close();
      }
    }, 8000);
  });

  console.log(`WebSocket started on port ${process.env.P0RT}`);
}

module.exports = handleWs;
