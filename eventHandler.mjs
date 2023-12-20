import { EventEmitter } from "events";
import utils from "./utils.mjs";
import game, { modes } from "./game.mjs";

const eventHandler = new EventEmitter();
eventHandler.on("started", async () => {
  utils.client_start_timestamp = new Date();
  utils.script_state = "working";

  console.log("League client has started, script working");

  const interval = setInterval(async () => {
    if (await game.fetch()) {
      utils.ingame = true;
      if (game.data.gameData.gameMode === "TFT") {
        await utils.rpc.setActivity({
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
        await utils.rpc.setActivity({
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
      await utils.rpc.setActivity({
        details: "In Client",
        startTimestamp: utils.client_start_timestamp,
        largeImageKey:
          "https://universe.leagueoflegends.com/icons/android-chrome-192x192.png",
        largeImageText: "I use linux btw",
        instance: false,
      });
    }
    if (utils.script_state === "idle") clearInterval(interval);
  }, 2000);
});

eventHandler.on("stopped", async () => {
  utils.script_state = "idle";
  utils.client_start_timestamp = null;
  await utils.rpc.clearActivity();

  console.log("League client has stopped, script idle");
});

export default eventHandler;
