import { Client } from "discord-rpc";

class constants {
  clientId = "1185309523456557056"; // League of Legends
  rpc = new Client({ transport: "ipc" });
  rpc_ready = false; // login finished
  script_state = "idle";
  ingame = false;
  client_start_timestamp = null;
  game_start_timestamp = null;
}

export default new constants();
