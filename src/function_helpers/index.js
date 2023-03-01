export const helpers = {
  getBestTenScore: (usersArray) =>
    usersArray.sort((a, b) => b.score - a.score).slice(0, 10),

  getScore(tries) {
    switch (tries) {
      case 1:
        return 10;
      case 2:
        return 8;
      case 3:
        return 6;
      case 4:
        return 4;
      case 5:
        return 2;
      default:
        return 1;
    }
  },
};
