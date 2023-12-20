export const modes = new Map([
  ["PRACTICETOOL", "Summoner's Rift (Custom)"],
  ["ARAM", "Howling Abyss (ARAM)"],
  ["CLASSIC", "Summoner's Rift"],
  ["TUTORIAL", "Summoner's Rift (Tutorial)"],
  ["URF", "Summoner's Rift (URF)"],
  ["NEXUSBLITZ", "Nexux Blitz"],
  ["TFT", "Teamfight Tactics"],
]);

export const champions = new Map([
  ["Aurelion Sol", "AurelionSol"],
  ["Cho'Gath", "Chogath"],
  ["Renata Glasc", "Renata"],
  ["Dr. Mundo", "DrMundo"],
  ["Miss Fortune", "MissFortune"],
  ["Kai'Sa", "KaiSa"],
  ["Kog'Maw", "KogMaw"],
  ["Rek'Sai", "RekSai"],
  ["K'Sante", "KSante"],
  ["Kha'Zix", "KhaZix"],
  ["Nunu & Willump", "Nunu"],
  ["Twisted Fate", "TwistedFate"],
  ["Tahm Kench", "TahmKench"],
  ["Vel'Koz", "Velkoz"],
  ["Xin Zhao", "XinZhao"],
  ["Master Yi", "MasterYi"],
]);

class game {
  async fetch() {
    const game = await fetch(
      "https://127.0.0.1:2999/liveclientdata/allgamedata"
    ).catch(() => {});
    const json = await game?.json().catch(() => {});

    if (json && !json.errorCode) {
      if (this.start_time === 0) this.start_time = Date.now();
      this.data = json;
      this.my_summoner_name = this.data.activePlayer.summonerName;
      this.data.allPlayers.forEach((player) => {
        if (player.summonerName === this.my_summoner_name.split("#")[0])
          this.my_champion_name = player.championName;
      });
      this.data.allPlayers.forEach((player) => {
        if (player.summonerName === this.my_summoner_name.split("#")[0])
          this.my_champion_skin_id = player.skinID;
      });

      return true;
    } else return false;
  }
  champion_art_cover(champion_name, skin_id) {
    if (skin_id !== 0)
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion_name}_${skin_id}.jpg`;
    else
      return `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${
        champions.get(champion_name) || champion_name
      }.png`;
  }

  start_time;
  data = {};
  my_summoner_name;
  my_champion_name;
  my_champion_skin_id;
}

export default new game();
