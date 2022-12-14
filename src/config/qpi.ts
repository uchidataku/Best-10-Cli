const Api = {
  signIn: {
    path: "/sign_in",
    buildPath: () => "/sign_in",
  },
  signUp: {
    path: "/sign_up",
    buildPath: () => "/sign_up",
  },
  fetchCurrentAccount: {
    path: "/current_user",
    buildPath: () => "/current_user",
  },
  fetchRankings: {
    path: "/rankings",
    buildPath: () => "/rankings",
  },
  fetchGenreCategories: {
    path: "/genre_categories",
    buildPath: () => "/genre_categories",
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
  deleteLike: {
    path: "/items/:itemId/likes",
    buildPath: (itemId: string) => "/items/" + itemId + "/likes",
  },
};

export default Api;
