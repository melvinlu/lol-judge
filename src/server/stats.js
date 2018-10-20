let api_key = process.env.API_KEY;
let superagent = require("superagent");

let getOverallInfo = summonerName => {
  let url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${api_key}`;

  return superagent
    .get(url)
    .then(data => {
      let name = data.body.name;
      let accountId = data.body.accountId;
      let url = `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${
        data.body.id
      }?api_key=${api_key}`;

      return superagent
        .get(url)
        .then(data => {
          let rankedStats = data.body.find(
            stats => stats.queueType === "RANKED_SOLO_5x5"
          );
          return {
            name: name,
            accountId: accountId,
            rankedStats: rankedStats
          };
        })
        .catch(err => {
          return;
        });
    })
    .catch(err => {
      return;
    });
};

let getRecentInfo = accountId => {
  let url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=420&api_key=${api_key}`;

  return superagent
    .get(url)
    .then(data => {
      let recentMatches = data.body.matches.slice(0, 10);
      // TODO(melvinlu): implement...
    })
    .catch(err => {
      return;
    });
};

module.exports = {
  getOverallInfo: getOverallInfo,
  getRecentInfo: getRecentInfo
};