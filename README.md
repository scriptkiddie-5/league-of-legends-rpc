# League of Legends RPC
This repo is intended for the linux platform, which does not have native league of legends support.

## Install/Use
To start, make sure you are on the most recent LTS version of node/npm, have git installed and have a brain!

Next, clone the repo
```bash
git clone https://github.com/scriptkiddie-5/league-of-legends-rpc
```

Install the required packages with the package manager of your choice (I use pnpm)
```bash
pnpm install
```
And if done correctly, run the script.
```bash
node index.mjs
```

## How does it work?
It checks the process list for the league client and waits for game data to be available from [riot's local api](https://developer.riotgames.com/docs/lol#game-client-api), it spins up when a game is started.

## What does it look like
Your presence will correspond to what you are doing, for example, having the client open will show this

![image](https://github.com/scriptkiddie-5/league-of-legends-rpc/assets/87771170/3bfdb2ec-183b-40db-802e-9ac16639c433)

and being in-game will show this

![image](https://github.com/scriptkiddie-5/league-of-legends-rpc/assets/87771170/2c32903b-f0da-41b1-8c2a-5f20c8c52520)

This script supports TFT (Teamfight Tactics) presence as well, though there is not much data available from riot's api.
