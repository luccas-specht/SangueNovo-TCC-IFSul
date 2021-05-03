import {
  ListFilterCampaings,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  CreateCampaign,
  PageNotFound,
  EditProfile,
} from "../ui/pages";

type Paths = {
  [key: string]: () => string;
};

type Components = {
  [key: string]: () => JSX.Element;
};

type Routes = {
  [key: string]: {
    path: string;
    component: () => JSX.Element;
  };
};

const components: Components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  listFilterCampaings: ListFilterCampaings,
  resetPassword: ResetPassword,
  createCampaign: CreateCampaign,
  pageNotFound: PageNotFound,
  editProfile: EditProfile,
};

export const paths: Paths = {
  default: () => "/",
  login: () => "/login",
  register: () => "/cadastro",
  forgotPassword: () => "/esqueci-minha-senha",
  resetPassowrd: () => "/redefinir-senha",
  listFilterCampaings: () => "/listar-campanhas",
  createCampaign: () => "/criar-campanha",
  pageNotFound: () => "*",
  editProfile: () => "/editar-perfil",
};

export const routes: Routes = {
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
  listFilterCampaings: {
    path: paths.listFilterCampaings(),
    component: components.listFilterCampaings,
  },
  createCampaign: {
    path: paths.createCampaign(),
    component: components.createCampaign,
  },
  editProfile: {
    path: paths.editProfile(),
    component: components.editProfile,
  },
};
