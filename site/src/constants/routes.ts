import {
  Dashboard,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  CreateCampaign,
  PageNotFound,
} from "../ui/pages";

const components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  dashboard: Dashboard,
  resetPassword: ResetPassword,
  createCampaign: CreateCampaign,
  pageNotFound: PageNotFound,
};

export const paths = {
  default: () => "/",
  login: () => "/login",
  register: () => "/cadastro",
  forgotPassword: () => "/esqueci-minha-senha",
  resetPassowrd: () => "/redefinir-senha",
  dashboard: () => "/dashboard",
  createCampaign: () => "/criar-campanha",
  pageNotFound: () => "*",
};

export const routes = {
  /*not found*/
  pageNotFound: {
    path: paths.pageNotFound(),
    component: PageNotFound,
  },

  /*publics here*/
  default: {
    path: paths.default(),
    component: components.login,
  },
  login: {
    path: paths.login(),
    component: components.login,
  },
  register: {
    path: paths.register(),
    component: components.register,
  },
  forgotPassword: {
    path: paths.forgotPassword(),
    component: components.forgotPassword,
  },
  resetPassword: {
    path: paths.resetPassowrd(),
    component: components.resetPassword,
  },

  /*privates here*/
  dashboard: {
    path: paths.dashboard(),
    component: components.dashboard,
  },
  createCampaign: {
    path: paths.createCampaign(),
    component: components.createCampaign,
  },
};
