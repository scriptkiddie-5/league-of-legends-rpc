import { EventEmitter } from "events";
import constants from "./constants.mjs";
import game, { modes } from "./game.mjs";

const eventHandler = new EventEmitter();
eventHandler.on("started", async () => {
  constants.client_start_timestamp = new Date();
  constants.script_state = "working";

  console.log("League client has started, script working");

  const interval = setInterval(async () => {
    if (await game.fetch()) {
      constants.ingame = true;
      if (game.data.gameData.gameMode === "TFT") {
        await constants.rpc.setActivity({
          details: "Teamfight Tactics",
          state: "In Game",
          startTimestamp:
            Date.now() - game.data.gameData.gameTime * 1000 || game.start_time,
          largeImageKey:
            "https://play-lh.googleusercontent.com/X_QUs14bmj6gTofDhV0SACzXxD88AOWIAMLTexXiOIEcL3DT1Bk_Wb_q2qnlrCfbmXBO=s48",
          largeImageText: "Teamfight Tactics",
          smallImageKey:
            "https://universe.leagueoflegends.com/icons/android-chrome-192x192.png",
          smallImageText: "I use linux btw",
          instance: false,
        });
      } else {
        await constants.rpc.setActivity({
          details: modes.get(game.data.gameData.gameMode) || "Unknown Mode",
          state: "In Game",
          startTimestamp:
            Date.now() - game.data.gameData.gameTime * 1000 || game.start_time,
          largeImageKey: game.champion_art_cover(
            game.my_champion_name,
            game.my_champion_skin_id
          ),
          largeImageText: game.my_champion_name,
          smallImageKey:
            "https://universe.leagueoflegends.com/icons/android-chrome-192x192.png",
          smallImageText: "I use linux btw",
          instance: false,
        });
      }
    } else {
      await constants.rpc.setActivity({
        details: "In Client",
        startTimestamp: constants.client_start_timestamp,
        largeImageKey:
          "https://universe.leagueoflegends.com/icons/android-chrome-192x192.png",
        largeImageText: "I use linux btw",
        instance: false,
      });
    }
    if (constants.script_state === "idle") clearInterval(interval);
  }, 2000);
});

eventHandler.on("stopped", async () => {
  constants.script_state = "idle";
  constants.client_start_timestamp = null;
  await constants.rpc.clearActivity();

  console.log("League client has stopped, script idle");
});

export default eventHandler;
