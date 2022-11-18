const routes = {
  top: (): string => "/",
  about: (): string => "/about",
  signIn: (): string => "/sign_in",
  signUp: (): string => "/sign_up",
  ranking: (): string => "/rankings/:id",
  rankings: (): string => "/rankings",
  information: (): string => "/information",
};

export default routes;
