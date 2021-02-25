import {
  Dashboard,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../ui/pages";

const components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  dashboard: Dashboard,
  resetPassword: ResetPassword,
};

export const paths = {
  default: () => "/",
  login: () => "/login",
  register: () => "/cadastro",
  forgotPassword: () => "/esqueci-minha-senha",
  resetPassowrd: () => "/redefinir-senha",
  dashboard: () => "/dashboard",
};

export const routes = {
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
};
