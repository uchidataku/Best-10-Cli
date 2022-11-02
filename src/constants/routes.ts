const routes = {
  top: (): string => "/",
  signIn: (): string => "/sign_in",
  signUp: (): string => "/sign_up",
  ranking: (): string => "/rankings/:id",
  rankings: (): string => "/rankings",
};

export default routes;
