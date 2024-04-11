# MiSM

MiSM - Monitoring and Controlling the Microgrid (pl. Monitorowanie i Sterowanie Mikrosiecią)

This project is a miniSCADA type app that enables monitoring and controlling of the virtual microgrid.

## React Native App built with Expo. Repository includes express API and WebSocket to simulate live data.

API and WS have api keys authentication.

User can:

- change current operating mode of microgrid,
- see microgrid's structure and detailed parameters,
- see direction of energy flow between elements.

## <a href="https://youtube.com/shorts/ECPBaDRQC8w" target="_blank">Watch a demo on YouTube</a>

## How to install?

1. Clone this project
2. Change directory to server - `cd server`
3. Install dependencies - `npm install`
4. Setup .env variables
   ```
   P0RT = 8080
   S*S* = MISM
   S_E = WS$
   USERNAME1 = MISM_APP1
   API_KEY1 = 05ed40a39d53bc7ed65206ac1f304a1b11c301238a9d4236b93de51be7d02592
   ```
5. Run a server - `node index.js`

6. Open second terminal.
7. Change directory to app - `cd app`
8. Install dependencies - `npm install`
9. Setup .env variables. Remember to insert your IP address for ExpoGo usage.
   ```
   EXPO_PUBLIC_IP =
   EXPO_PUBLIC_P0RT = 8080
   EXPO_PUBLIC_MISM_API_KEY = gi2hd32a5eyi0z2kigqrbz4xywk5yq
   ```
10. Run an app - `npm start`
11. Scan QR Code using ExpoGo App.
