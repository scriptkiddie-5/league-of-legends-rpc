// index.ts
import dotenv from "dotenv";
dotenv.config();

import utils from "./utils.mjs";
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
await utils.rpc.login({ clientId: utils.clientId }).catch(console.error);
console.log("Authenticated");

const clientListener = new psListener("LeagueClient.ex");
clientListener.started(() => eventHandler.emit("started"));
clientListener.exited(() => eventHandler.emit("stopped"));
