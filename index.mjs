// index.ts
import dotenv from "dotenv";
dotenv.config();

import constants from "./constants.mjs";
import psListener from "process-listener";
import eventHandler from "./eventHandler.mjs";

console.log(`#                                                              #                                                 
#       ######   ##    ####  #    # ######     ####  ######    #       ######  ####  ###### #    # #####   ####  
#       #       #  #  #    # #    # #         #    # #         #       #      #    # #      ##   # #    # #      
#       #####  #    # #      #    # #####     #    # #####     #       #####  #      #####  # #  # #    #  ####  
#       #      ###### #  ### #    # #         #    # #         #       #      #  ### #      #  # # #    #      # 
#       #      #    # #    # #    # #         #    # #         #       #      #    # #      #   ## #    # #    # 
####### ###### #    #  ####   ####  ######     ####  #         ####### ######  ####  ###### #    # #####   ####  
    `);

console.log("Authenticating with discord");
await constants.rpc
  .login({ clientId: constants.clientId })
  .catch(console.error);
console.log("Authenticated");

const clientListener = new psListener("LeagueClient.ex");
clientListener.started(() => eventHandler.emit("started"));
clientListener.exited(() => eventHandler.emit("stopped"));
