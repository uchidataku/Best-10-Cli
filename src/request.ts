export const request = {
  signIn: {
    path: "/sign_in",
    buildPath: () => "/sign_in",
  },
  signUp: {
    path: "/sign_up",
    buildPath: () => "/sign_up",
  },
  fetchRankings: {
    path: "/rankings",
    buildPath: () => "/rankings",
  },
  fetchRanking: {
    path: "/rankings/:id",
    buildPath: (id: string) => "/rankings/" + id,
  },
  createRanking: {
    path: "/rankings",
    buildPath: () => "/rankings",
  },
  createRankingItem: {
    path: "/rankings/:rankingId/items",
    buildPath: (rankingId: string) => "/rankings/" + rankingId + "/items",
  },
  createLike: {
    path: "/items/:itemId/likes",
    buildPath: (itemId: string) => "/items/" + itemId + "/likes",
  },
};
