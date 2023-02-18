const routes = {
  top: (): string => "/",
  about: (): string => "/about",
  signIn: (): string => "/sign_in",
  signUp: (): string => "/sign_up",
  search: (): string => "/search",
  genre: (id: string): string => `/genres/${id}`,
  ranking: (id: string): string => `/rankings/${id}`,
  editRanking: (id: string) => `/rankings/${id}/edit`,
  rankings: (): string => "/rankings",
  information: (): string => "/information",
};

export default routes;
