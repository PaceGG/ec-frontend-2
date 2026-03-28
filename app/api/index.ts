const ec = {
  async postGame(gameName: string) {
    console.log(`Post game: ${gameName}`);
  },

  async postGames(gameSeriesName: string, games: string[]) {
    console.log(`Post game series: ${gameSeriesName} with games:`);
    console.log(games);
  },
};

export default ec;
