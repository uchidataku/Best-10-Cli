const routes = {
  top: (): string => "/",
  signIn: (): string => "/sign_in",
  signUp: (): string => "/sign_up",
  ranking: (): string => "/rankings/:id",
  rankings: (): string => "/rankings",
  information: (): string => "/information",
};

export default routes;
