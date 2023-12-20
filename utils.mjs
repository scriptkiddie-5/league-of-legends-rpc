import { Client } from "discord-rpc";
import psList from "ps-list";

class Utils {
  async discord_running() {
    const processes = await psList();
    if (processes.find((process) => process.name === "Discord")) return true;
    else return false;
  }
  async game_running() {
    return false;
  }
  async client_running() {
    const processes = await psList();
    if (processes.find((process) => process.name === "LeagueClient.ex"))
      return true;
    else return false;
  }

  clientId = "1185309523456557056"; // League of Legends
  rpc = new Client({ transport: "ipc" });
  rpc_ready = false; // login finished
  script_state = "idle";
  ingame = false;
  client_start_timestamp = null;
  game_start_timestamp = null;
}

export default new Utils();
